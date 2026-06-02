package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.request.SeekerUpdateRequest;
import com.dev001.itviec.dto.response.SeekerCvContent;
import com.dev001.itviec.dto.response.SeekerCvMetadataResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.seeker.SeekerCv;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.SeekerMapper;
import com.dev001.itviec.repository.SeekerCvRepository;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.SeekerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class SeekerServiceImpl implements SeekerService {

    private static final long MAX_CV_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
    private static final Set<String> ALLOWED_CV_TYPES = Set.of(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

    private final SeekerMapper seekerMapper;
    private final SeekerRepository seekerRepository;
    private final SeekerCvRepository seekerCvRepository;
    private final UserRepository userRepository;

    @Override
    public List<SeekerResponse> getAllSeekers() {
        return seekerMapper.toSeekerResponse(seekerRepository.findAll());
    }

    @Override
    @Transactional
    public SeekerResponse getMyProfile() {
        return seekerMapper.toSeekerResponse(getSeekerByCookie());
    }

    @Override
    public Seeker getSeekerByCookie() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return seekerRepository.findByUser(user).orElseThrow(() -> new AppException(ErrorCode.SEEKER_NOT_FOUND));
    }

    @Override
    public SeekerResponse getSeekerById(String id) {
        return seekerMapper.toSeekerResponse(
                seekerRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SEEKER_NOT_FOUND)));
    }

    @Transactional
    @Override
    public SeekerResponse updateMyProfile(SeekerUpdateRequest request) {
        Seeker seeker = getSeekerByCookie();
        seeker.setFullName(request.getFullName());
        seeker.setJobTitle(request.getJobTitle());
        seeker.setPhoneNumber(request.getPhoneNumber());
        seeker.setDateOfBirth(request.getDateOfBirth());
        seeker.setGender(request.getGender());
        seeker.setCity(request.getCity());
        seeker.setAddress(request.getAddress());
        seeker.setPersonalLink(request.getPersonalLink());
        seeker.setCoverLetter(request.getCoverLetter());
        seeker.setSkills(request.getSkills());
        seeker.setDesiredLocations(request.getDesiredLocations());
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    // ===================== CV =====================

    @Transactional
    @Override
    public SeekerResponse uploadMyCv(MultipartFile file) {
        validateCvFile(file);

        Seeker seeker = getSeekerByCookie();

        // Upsert: tìm CV cũ hoặc tạo mới
        SeekerCv seekerCv = seekerCvRepository.findBySeekerId(seeker.getId())
                .orElse(SeekerCv.builder().seeker(seeker).build());

        try {
            seekerCv.setFileName(file.getOriginalFilename() != null ? file.getOriginalFilename() : "cv");
            seekerCv.setContentType(file.getContentType());
            seekerCv.setSize(file.getSize());
            seekerCv.setData(file.getBytes());
        } catch (IOException e) {
            log.error("Failed to read CV file for seekerId={}", seeker.getId(), e);
            throw new AppException(ErrorCode.SEEKER_CV_UPLOAD_FAILED);
        }

        seekerCvRepository.save(seekerCv);

        // Cập nhật cvUrl trỏ tới endpoint download
        seeker.setCvUrl(buildCvUrl(seeker.getId()));
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerCvContent getMyCv() {
        Seeker seeker = getSeekerByCookie();
        return getCvBySeekerId(seeker.getId());
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerCvContent getCvBySeekerId(String seekerId) {
        SeekerCv cv = seekerCvRepository.findBySeekerId(seekerId)
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_FOUND));
        return new SeekerCvContent(cv.getFileName(), cv.getContentType(), cv.getData());
    }

    @Transactional
    @Override
    public SeekerResponse deleteMyCv() {
        Seeker seeker = getSeekerByCookie();
        if (seekerCvRepository.existsBySeekerId(seeker.getId())) {
            seekerCvRepository.deleteBySeekerId(seeker.getId());
        }
        seeker.setCvUrl(null);
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerCvMetadataResponse getMyCvMetadata() {
        Seeker seeker = getSeekerByCookie();
        SeekerCv cv = seekerCvRepository.findBySeekerId(seeker.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_FOUND));
        return SeekerCvMetadataResponse.builder()
                .fileName(cv.getFileName())
                .contentType(cv.getContentType())
                .size(cv.getSize())
                .updatedAt(cv.getUpdatedAt())
                .build();
    }

    // ===================== Helpers =====================

    private void validateCvFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new AppException(ErrorCode.SEEKER_CV_REQUIRED);
        }
        if (file.getSize() > MAX_CV_SIZE_BYTES) {
            throw new AppException(ErrorCode.SEEKER_CV_TOO_LARGE);
        }
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CV_TYPES.contains(contentType.toLowerCase())) {
            throw new AppException(ErrorCode.SEEKER_CV_INVALID_TYPE);
        }
    }

    public String buildCvUrl(String seekerId) {
        // Trả về URL download (dùng cho seeker.cvUrl và application.resumeUrl)
        String relativePath = "/api/v1/seekers/" + seekerId + "/cv";
        try {
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(relativePath)
                    .toUriString();
        } catch (IllegalStateException e) {
            return relativePath;
        }
    }

    public String buildCvPreviewUrl(String seekerId) {
        // Trả về URL preview inline (FE dùng để embed trong <iframe> hoặc <embed>)
        String relativePath = "/api/v1/seekers/" + seekerId + "/cv/preview";
        try {
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(relativePath)
                    .toUriString();
        } catch (IllegalStateException e) {
            return relativePath;
        }
    }
}
