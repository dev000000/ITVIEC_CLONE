package com.dev001.itviec.service.impl;

import java.io.IOException;
import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dev001.itviec.dto.request.CompanyUpdateRequest;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.dto.response.CompanyLogoContent;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.company.CompanyLogo;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.CompanyMapper;
import com.dev001.itviec.repository.CompanyLogoRepository;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.service.CompanyService;
import com.dev001.itviec.service.EmployerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private static final long MAX_COMPANY_LOGO_SIZE_BYTES = 2 * 1024 * 1024;
    private static final Set<String> ALLOWED_COMPANY_LOGO_TYPES = Set.of(MediaType.IMAGE_JPEG_VALUE,
            MediaType.IMAGE_PNG_VALUE, "image/webp");

    private final CompanyMapper companyMapper;
    private final CompanyLogoRepository companyLogoRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final EmployerService employerService;

    @Override
    @Transactional(readOnly = true)
    public List<CompanyCardResponse> getAllCompaniesWithJobCountActive() {
        List<Object[]> rows = companyRepository.findAllCompaniesWithJobCountActive(JobStatus.ACTIVE);

        return rows.stream()
                .map(row -> {
                    Company company = (Company) row[0];
                    int activeJobCount = ((Long) row[1]).intValue();

                    CompanyCardResponse response = companyMapper.toCompanyCardResponse(company);
                    response.setNumberOfJobsActive(activeJobCount);
                    return response;
                })
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyDetailResponse getCompanyWithJobsActive(String slug) {

        // 1. Tìm company theo slug
        Company company = companyRepository
                .findBySlug(slug)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND_BY_SLUG));

        // 2. Tìm job active của company đó
        List<Job> jobList = jobRepository.findByCompanyAndStatus(company, JobStatus.ACTIVE);

        // 3. Set job vào company
        company.setJobs(jobList);

        return companyMapper.toCompanyDetailResponse(company);
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyDetailResponse getMyCompany() {
        return companyMapper.toCompanyDetailResponse(getCurrentEmployerCompany());
    }

    @Override
    @Transactional
    public CompanyDetailResponse updateMyCompany(CompanyUpdateRequest request) {
        Company company = getCurrentEmployerCompany();

        // Cập nhật thông tin company với dữ liệu từ request
        company.setCompanyName(request.getCompanyName());
        company.setDescription(request.getDescription());
        company.setWebsite(request.getWebsite());
        if (companyLogoRepository.existsByCompanyId(company.getId())) {
            company.setLogoUrl(buildCompanyLogoUrl(company.getId()));
        } else {
            company.setLogoUrl(request.getLogoUrl());
        }
        company.setAddress(request.getAddress());
        company.setCompanyModel(request.getCompanyModel());
        company.setIndustry(request.getIndustry());
        company.setCompanySize(request.getCompanySize());
        company.setCountry(request.getCountry());
        company.setWorkingHours(request.getWorkingHours());
        company.setOvertimePolicy(request.getOvertimePolicy());
        company.setCompanyIntroduction(request.getCompanyIntroduction());
        company.setOurExpertise(request.getOurExpertise());
        company.setWhyWorkHere(request.getWhyWorkHere());
        company.setCompanySkills(request.getCompanySkills());
        company.setSlug(generateCompanySlug(request.getCompanyName()));

        return companyMapper.toCompanyDetailResponse(companyRepository.save(company));
    }

    @Override
    @Transactional
    public CompanyDetailResponse uploadMyCompanyLogo(MultipartFile file) {
        validateCompanyLogo(file);

        Company company = getCurrentEmployerCompany();
        CompanyLogo companyLogo = companyLogoRepository.findByCompanyId(company.getId()).orElse(CompanyLogo.builder()
                .company(company)
                .build());

        try {
            companyLogo.setFileName(resolveCompanyLogoFileName(file));
            companyLogo.setContentType(file.getContentType());
            companyLogo.setSize(file.getSize());
            companyLogo.setData(file.getBytes());
        } catch (IOException exception) {
            log.error("Failed to read company logo file for companyId={}", company.getId(), exception);
            throw new AppException(ErrorCode.COMPANY_LOGO_UPLOAD_FAILED);
        }

        companyLogoRepository.save(companyLogo);
        company.setLogoUrl(buildCompanyLogoUrl(company.getId()));

        return companyMapper.toCompanyDetailResponse(companyRepository.save(company));
    }

    @Override
    @Transactional
    public CompanyDetailResponse deleteMyCompanyLogo() {
        Company company = getCurrentEmployerCompany();

        if (companyLogoRepository.existsByCompanyId(company.getId())) {
            companyLogoRepository.deleteByCompanyId(company.getId());
        }

        company.setLogoUrl(null);
        return companyMapper.toCompanyDetailResponse(companyRepository.save(company));
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyLogoContent getCompanyLogo(String companyId) {
        CompanyLogo companyLogo = companyLogoRepository
                .findByCompanyId(companyId)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_LOGO_NOT_FOUND));

        return new CompanyLogoContent(companyLogo.getFileName(), companyLogo.getContentType(), companyLogo.getData());
    }

    @Override
    public String generateCompanySlug(String companyName) {
        if (companyName == null || companyName.trim().isEmpty()) {
            return "";
        }

        String slug = companyName.trim().toLowerCase(Locale.ROOT);

        // Chuẩn hóa unicode và bỏ dấu
        slug = Normalizer.normalize(slug, Normalizer.Form.NFD).replaceAll("\\p{InCombiningDiacriticalMarks}+", "");

        // Xử lý riêng ký tự đ/Đ tiếng Việt
        slug = slug.replace("\u0111", "d").replace("\u0110", "d");

        // Thay mọi ký tự không phải chữ hoặc số thành dấu -
        slug = slug.replaceAll("[^a-z0-9]+", "-");

        // Xóa dấu - ở đầu/cuối
        slug = slug.replaceAll("^-+|-+$", "");

        return slug;
    }

    private Company getCurrentEmployerCompany() {
        Employer employer = employerService.getEmployerByCookie();

        return companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND_BY_EMPLOYER));
    }

    private void validateCompanyLogo(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new AppException(ErrorCode.COMPANY_LOGO_REQUIRED);
        }

        if (file.getSize() > MAX_COMPANY_LOGO_SIZE_BYTES) {
            throw new AppException(ErrorCode.COMPANY_LOGO_TOO_LARGE);
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_COMPANY_LOGO_TYPES.contains(contentType.toLowerCase(Locale.ROOT))) {
            throw new AppException(ErrorCode.COMPANY_LOGO_INVALID_TYPE);
        }
    }

    private String resolveCompanyLogoFileName(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            return "company-logo";
        }

        return originalFilename;
    }

    private String buildCompanyLogoUrl(String companyId) {
        String relativePath = "/api/v1/companies/" + companyId + "/logo";

        try {
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(relativePath)
                    .toUriString();
        } catch (IllegalStateException exception) {
            return relativePath;
        }
    }
}
