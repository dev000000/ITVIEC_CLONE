package com.dev001.itviec.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dev001.itviec.dto.request.SeekerBasicInfoUpdateRequest;
import com.dev001.itviec.dto.request.SeekerCoverLetterUpdateRequest;
import com.dev001.itviec.dto.request.SeekerPersonalInfoUpdateRequest;
import com.dev001.itviec.dto.request.SeekerUpdateRequest;
import com.dev001.itviec.dto.response.SeekerAvatarContent;
import com.dev001.itviec.dto.response.SeekerCvContent;
import com.dev001.itviec.dto.response.SeekerCvMetadataResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.cvfile.CvFile;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.seeker.SeekerAvatar;
import com.dev001.itviec.entity.seeker.SeekerCv;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.SeekerMapper;
import com.dev001.itviec.repository.ApplicationRepository;
import com.dev001.itviec.repository.CvFileRepository;
import com.dev001.itviec.repository.SeekerAvatarRepository;
import com.dev001.itviec.repository.SeekerCvRepository;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.SeekerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SeekerServiceImpl implements SeekerService {

    private static final int MAX_CV_COUNT = 3;
    private static final long MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;
    private static final Set<String> ALLOWED_AVATAR_TYPES =
            Set.of(MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, "image/webp");
    private static final long MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;
    private static final Set<String> ALLOWED_CV_TYPES = Set.of(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

    private final SeekerMapper seekerMapper;
    private final SeekerRepository seekerRepository;
    private final SeekerAvatarRepository seekerAvatarRepository;
    private final SeekerCvRepository seekerCvRepository;
    private final CvFileRepository cvFileRepository;
    private final ApplicationRepository applicationRepository;
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

    @Transactional
    @Override
    public SeekerResponse updateMyCoverLetter(SeekerCoverLetterUpdateRequest request) {
        Seeker seeker = getSeekerByCookie();
        seeker.setCoverLetter(request.getCoverLetter());
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional
    @Override
    public SeekerResponse updateMyBasicInfo(SeekerBasicInfoUpdateRequest request) {
        Seeker seeker = getSeekerByCookie();
        seeker.setFullName(request.getFullName());
        seeker.setPhoneNumber(request.getPhoneNumber());
        seeker.setDesiredLocations(request.getDesiredLocations());
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional
    @Override
    public SeekerResponse updateMyPersonalInfo(SeekerPersonalInfoUpdateRequest request) {
        Seeker seeker = getSeekerByCookie();
        seeker.setFullName(request.getFullName());
        seeker.setGender(request.getGender());
        seeker.setJobTitle(request.getJobTitle());
        seeker.setPersonalLink(request.getPersonalLink());
        seeker.setPhoneNumber(request.getPhoneNumber());
        seeker.setDateOfBirth(request.getDateOfBirth());
        seeker.setCity(request.getCity());
        seeker.setAddress(request.getAddress());
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional
    @Override
    public SeekerResponse uploadMyAvatar(MultipartFile file) {
        validateAvatarFile(file);

        Seeker seeker = getSeekerByCookie();
        SeekerAvatar seekerAvatar = seekerAvatarRepository
                .findBySeekerId(seeker.getId())
                .orElse(SeekerAvatar.builder().seeker(seeker).build());

        try {
            seekerAvatar.setFileName(resolveAvatarFileName(file));
            seekerAvatar.setContentType(file.getContentType());
            seekerAvatar.setSize(file.getSize());
            seekerAvatar.setData(file.getBytes());
        } catch (IOException exception) {
            log.error("Failed to read avatar file for seekerId={}", seeker.getId(), exception);
            throw new AppException(ErrorCode.SEEKER_AVATAR_UPLOAD_FAILED);
        }

        seekerAvatarRepository.save(seekerAvatar);
        seeker.setAvatarUrl(buildAvatarUrl(seeker.getId()));
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerAvatarContent getSeekerAvatar(String seekerId) {
        SeekerAvatar seekerAvatar = seekerAvatarRepository
                .findBySeekerId(seekerId)
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_AVATAR_NOT_FOUND));
        return new SeekerAvatarContent(
                seekerAvatar.getFileName(), seekerAvatar.getContentType(), seekerAvatar.getData());
    }

    @Transactional
    @Override
    public SeekerResponse deleteMyAvatar() {
        Seeker seeker = getSeekerByCookie();
        if (seekerAvatarRepository.existsBySeekerId(seeker.getId())) {
            seekerAvatarRepository.deleteBySeekerId(seeker.getId());
        }
        seeker.setAvatarUrl(null);
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional
    @Override
    public SeekerResponse uploadMyCv(MultipartFile file) {
        validateCvFile(file);

        Seeker seeker = getSeekerByCookie();
        long currentCount = seekerCvRepository.countBySeekerId(seeker.getId());
        if (currentCount >= MAX_CV_COUNT) {
            throw new AppException(ErrorCode.SEEKER_CV_LIMIT_REACHED);
        }

        CvFile cvFile = createCvFileFromMultipart(file);
        cvFileRepository.save(cvFile);

        boolean isPrimary = currentCount == 0;
        SeekerCv seekerCv = SeekerCv.builder()
                .seeker(seeker)
                .cvFile(cvFile)
                .isPrimary(isPrimary)
                .build();
        seekerCvRepository.save(seekerCv);

        if (isPrimary) {
            seeker.setPrimaryCv(seekerCv);
            syncSeekerCvUrl(seeker);
        }

        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional(readOnly = true)
    @Override
    public List<SeekerCvMetadataResponse> getMyCvsMetadata() {
        Seeker seeker = getSeekerByCookie();
        return seekerCvRepository.findBySeekerIdOrderByUpdatedAtDesc(seeker.getId()).stream()
                .map(this::toCvMetadataResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerCvMetadataResponse getMyCvMetadata() {
        Seeker seeker = getSeekerByCookie();
        SeekerCv cv = seekerCvRepository
                .findBySeekerIdAndIsPrimaryTrue(seeker.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_FOUND));
        return toCvMetadataResponse(cv);
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerCvContent getMyCv() {
        Seeker seeker = getSeekerByCookie();
        return getPrimaryCvContentBySeekerId(seeker.getId());
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerCvContent getCvBySeekerId(String seekerId) {
        return getPrimaryCvContentBySeekerId(seekerId);
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerCvContent getCvBySeekerCvId(String cvId) {
        Seeker seeker = getSeekerByCookie();
        SeekerCv seekerCv = seekerCvRepository
                .findByIdAndSeekerId(cvId, seeker.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_OWNED));
        return toCvContent(seekerCv.getCvFile());
    }

    @Transactional(readOnly = true)
    @Override
    public SeekerCvContent getCvFileContent(String cvFileId) {
        CvFile cvFile =
                cvFileRepository.findById(cvFileId).orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_FOUND));
        return toCvContent(cvFile);
    }

    @Transactional
    @Override
    public SeekerResponse deleteMyCv(String cvId) {
        Seeker seeker = getSeekerByCookie();
        SeekerCv seekerCv = seekerCvRepository
                .findByIdAndSeekerId(cvId, seeker.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_OWNED));

        String cvFileId = seekerCv.getCvFile().getId();
        boolean wasPrimary = seekerCv.isPrimary();
        seekerCvRepository.delete(seekerCv);

        if (wasPrimary) {
            promoteNewPrimary(seeker);
        }

        cleanupOrphanCvFile(cvFileId);
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional
    @Override
    public SeekerResponse deleteMyCv() {
        Seeker seeker = getSeekerByCookie();
        SeekerCv primaryCv = seekerCvRepository
                .findBySeekerIdAndIsPrimaryTrue(seeker.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_FOUND));
        return deleteMyCv(primaryCv.getId());
    }

    @Transactional
    @Override
    public SeekerResponse setPrimaryCv(String cvId) {
        Seeker seeker = getSeekerByCookie();
        SeekerCv targetCv = seekerCvRepository
                .findByIdAndSeekerId(cvId, seeker.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_OWNED));

        List<SeekerCv> seekerCvs = seekerCvRepository.findBySeekerIdOrderByUpdatedAtDesc(seeker.getId());
        for (SeekerCv cv : seekerCvs) {
            cv.setPrimary(cv.getId().equals(targetCv.getId()));
            seekerCvRepository.save(cv);
        }

        seeker.setPrimaryCv(targetCv);
        syncSeekerCvUrl(seeker);
        return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
    }

    @Transactional
    @Override
    public CvFile uploadCvFileForApplication(MultipartFile file) {
        validateCvFile(file);

        Seeker seeker = getSeekerByCookie();
        CvFile cvFile = createCvFileFromMultipart(file);
        cvFileRepository.save(cvFile);

        long currentCount = seekerCvRepository.countBySeekerId(seeker.getId());
        if (currentCount < MAX_CV_COUNT) {
            boolean isPrimary = currentCount == 0;
            SeekerCv seekerCv = SeekerCv.builder()
                    .seeker(seeker)
                    .cvFile(cvFile)
                    .isPrimary(isPrimary)
                    .build();
            seekerCvRepository.save(seekerCv);

            if (isPrimary) {
                seeker.setPrimaryCv(seekerCv);
                syncSeekerCvUrl(seeker);
                seekerRepository.save(seeker);
            }
        }

        return cvFile;
    }

    @Override
    public String buildCvUrl(String cvFileId) {
        String relativePath = "/api/v1/cv-files/" + cvFileId;
        try {
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(relativePath)
                    .toUriString();
        } catch (IllegalStateException exception) {
            return relativePath;
        }
    }

    @Override
    public String buildCvPreviewUrl(String cvFileId) {
        String relativePath = "/api/v1/cv-files/" + cvFileId + "/preview";
        try {
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(relativePath)
                    .toUriString();
        } catch (IllegalStateException exception) {
            return relativePath;
        }
    }

    private SeekerCvContent getPrimaryCvContentBySeekerId(String seekerId) {
        SeekerCv cv = seekerCvRepository
                .findBySeekerIdAndIsPrimaryTrue(seekerId)
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_FOUND));
        return toCvContent(cv.getCvFile());
    }

    private SeekerCvMetadataResponse toCvMetadataResponse(SeekerCv cv) {
        CvFile cvFile = cv.getCvFile();
        return SeekerCvMetadataResponse.builder()
                .id(cv.getId())
                .cvFileId(cvFile.getId())
                .fileName(cvFile.getFileName())
                .contentType(cvFile.getContentType())
                .size(cvFile.getSize())
                .isPrimary(cv.isPrimary())
                .updatedAt(cv.getUpdatedAt())
                .build();
    }

    private SeekerCvContent toCvContent(CvFile cvFile) {
        return new SeekerCvContent(cvFile.getFileName(), cvFile.getContentType(), cvFile.getData());
    }

    private CvFile createCvFileFromMultipart(MultipartFile file) {
        try {
            return CvFile.builder()
                    .fileName(file.getOriginalFilename() != null ? file.getOriginalFilename() : "cv")
                    .contentType(file.getContentType())
                    .size(file.getSize())
                    .data(file.getBytes())
                    .build();
        } catch (IOException exception) {
            log.error("Failed to read CV file", exception);
            throw new AppException(ErrorCode.SEEKER_CV_UPLOAD_FAILED);
        }
    }

    private void promoteNewPrimary(Seeker seeker) {
        List<SeekerCv> remaining = seekerCvRepository.findBySeekerIdOrderByUpdatedAtDesc(seeker.getId());
        if (remaining.isEmpty()) {
            seeker.setPrimaryCv(null);
            seeker.setCvUrl(null);
            return;
        }

        SeekerCv newPrimary = remaining.get(0);
        newPrimary.setPrimary(true);
        seekerCvRepository.save(newPrimary);
        seeker.setPrimaryCv(newPrimary);
        syncSeekerCvUrl(seeker);
    }

    private void syncSeekerCvUrl(Seeker seeker) {
        if (seeker.getPrimaryCv() != null && seeker.getPrimaryCv().getCvFile() != null) {
            seeker.setCvUrl(buildCvUrl(seeker.getPrimaryCv().getCvFile().getId()));
        } else {
            seeker.setCvUrl(null);
        }
    }

    private void cleanupOrphanCvFile(String cvFileId) {
        if (!seekerCvRepository.existsByCvFileId(cvFileId) && !applicationRepository.existsByCvFileId(cvFileId)) {
            cvFileRepository.deleteById(cvFileId);
        }
    }

    private void validateAvatarFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new AppException(ErrorCode.SEEKER_AVATAR_REQUIRED);
        }
        if (file.getSize() > MAX_AVATAR_SIZE_BYTES) {
            throw new AppException(ErrorCode.SEEKER_AVATAR_TOO_LARGE);
        }
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_AVATAR_TYPES.contains(contentType.toLowerCase())) {
            throw new AppException(ErrorCode.SEEKER_AVATAR_INVALID_TYPE);
        }
    }

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

    private String resolveAvatarFileName(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            return "seeker-avatar";
        }
        return originalFilename;
    }

    private String buildAvatarUrl(String seekerId) {
        String relativePath = "/api/v1/seekers/" + seekerId + "/avatar";
        try {
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(relativePath)
                    .toUriString();
        } catch (IllegalStateException exception) {
            return relativePath;
        }
    }
}
