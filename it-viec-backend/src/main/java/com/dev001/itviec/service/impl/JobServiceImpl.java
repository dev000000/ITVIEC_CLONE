package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.request.JobUpdateRequest;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.JobMapper;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.dev001.itviec.enums.JobStatus.ACTIVE;
import static com.dev001.itviec.exception.ErrorCode.COMPANY_NOT_FOUND;
import static com.dev001.itviec.exception.ErrorCode.JOB_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobMapper jobMapper;
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final EmployerRepository employerRepository;

    //    @Override
    //    public List<JobResponse> getAllJobsActive() {
    //        return jobMapper.toJobResponse(jobRepository.findByStatus(ACTIVE));
    //    }

    @Override
    public JobDetailResponse getJobBySlug(String slug) {
        Job job = jobRepository.findBySlug(slug).orElseThrow(() -> new AppException(JOB_NOT_FOUND));
        return jobMapper.toJobDetailResponse(job);
    }

    @Override
    public JobDetailResponse createJob(JobCreateRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String companyId = authentication.getName();
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new AppException(COMPANY_NOT_FOUND));
        // 1. build job
        Job job = Job.builder()
                .company(company)
                .title(request.getTitle())
                .jobReason(request.getJobReason())
                .jobDescription(request.getJobDescription())
                .jobRequirements(request.getJobRequirements())
                .whyJoinUs(request.getWhyJoinUs())
                .location(request.getLocation())
                .city(request.getCity())
                .salary(request.getSalary())
                .jobType(request.getJobType())
                .experienceLevel(request.getExperienceLevel())
                .postedAt(LocalDateTime.now())
                .expiresAt(request.getExpiresAt())
                .status(ACTIVE)
                .skills(request.getSkills() == null ? new HashSet<>() : new HashSet<>(request.getSkills()))
                .build();

        // 2. save lan 1
        job = jobRepository.save(job);

        // 3. Generate slug = slug va id
        String slug = generateSlug(job.getTitle(), company.getCompanyName(), job.getId());
        job.setSlug(slug);

        // 4. save lan 2 => update slug
        job = jobRepository.save(job);

        return jobMapper.toJobDetailResponse(job);
    }

    @Override
    public List<JobDetailResponse> getJobsByCurrentEmployer() {
        // 1. lấy email từ SecurityContext
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String email = authentication.getName();
        // 2. lấy user từ email
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // 3. lấy employer từ user
        Employer employer =
                employerRepository.findByUser(user).orElseThrow(() -> new AppException(ErrorCode.EMPLOYER_NOT_FOUND));

        // 4. lấy company từ employer
        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        // 5. lấy toàn bộ job từ company
        return jobMapper.toJobDetailResponse(jobRepository.findByCompany(company));
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponse<JobCardResponse> getJobCards(int page, int size) {

        // 1. Tạo Pageable
        Pageable pageable = PageRequest.of(page, size);
        // 2. query db
        Page<Job> jobPage = jobRepository.findByStatus(ACTIVE, pageable);

        // 3. map dto job -> jobCard
        List<JobCardResponse> jobCardResponseList = jobMapper.toJobCardResponse(jobPage.getContent());

        return PageResponse.<JobCardResponse>builder()
                .data(jobCardResponseList)
                .size(jobCardResponseList.size())
                .page(jobPage.getNumber())
                .totalElements(jobPage.getTotalElements())
                .totalPages(jobPage.getTotalPages())
                .isFirst(jobPage.isFirst())
                .isLast(jobPage.isLast())
                .build();
    }

    @Override
    public JobDetailResponse updateJob(Long id, JobUpdateRequest request) {
        // 1. lấy email từ SecurityContext
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String email = authentication.getName();
        // 2. lấy user từ email
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // 3. lấy employer từ user
        Employer employer =
                employerRepository.findByUser(user).orElseThrow(() -> new AppException(ErrorCode.EMPLOYER_NOT_FOUND));

        // 4. lấy company từ employer
        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        // 5. lấy job chi tiết đó bằng id và job đó phải thuộc công ty
        Job job = jobRepository.findByIdAndCompany(id, company).orElseThrow(() -> new AppException(JOB_NOT_FOUND));

        // 6. Cập nhật thông tin của job đó
        job.setTitle(request.getTitle());
        job.setJobReason(request.getJobReason());
        job.setJobDescription(request.getJobDescription());
        job.setJobRequirements(request.getJobRequirements());
        job.setWhyJoinUs(request.getWhyJoinUs());
        job.setLocation(request.getLocation());
        job.setCity(request.getCity());
        job.setSalary(request.getSalary());
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setPostedAt(request.getPostedAt());
        job.setExpiresAt(request.getExpiresAt());
        job.setStatus(request.getStatus());
        job.setSkills(request.getSkills());

        // 7. Tạo slug
        String slug = generateSlug(job.getTitle(), company.getCompanyName(), job.getId());
        job.setSlug(slug);

        // 8. Lưu vào db
        return jobMapper.toJobDetailResponse(jobRepository.save(job));
    }

    public String generateSlug(String jobTitle, String companyName, Long jobId) {
        if (jobId == null) {
            return "";
        }

        String titleSlug = normalizeToSlug(jobTitle);
        String companySlug = normalizeToSlug(companyName);

        return Stream.of(titleSlug, companySlug, String.valueOf(jobId))
                .filter(part -> part != null && !part.isBlank())
                .collect(Collectors.joining("-"));
    }

    public String normalizeToSlug(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "";
        }

        String slug = input.trim().toLowerCase(Locale.ROOT);

        slug = Normalizer.normalize(slug, Normalizer.Form.NFD).replaceAll("\\p{InCombiningDiacriticalMarks}+", "");

        slug = slug.replace("đ", "d").replace("Đ", "d");

        slug = slug.replaceAll("[^a-z0-9]+", "-").replaceAll("^-+|-+$", "");

        return slug;
    }
}
