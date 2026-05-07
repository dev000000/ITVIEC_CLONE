package com.dev001.itviec.service.impl;

import static com.dev001.itviec.enums.JobStatus.ACTIVE;
import static com.dev001.itviec.exception.ErrorCode.COMPANY_NOT_FOUND;
import static com.dev001.itviec.exception.ErrorCode.JOB_NOT_FOUND;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.mapper.JobMapper;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.service.JobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

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
    public JobResponse getJobBySlug(String slug) {
        Job job = jobRepository.findBySlug(slug).orElseThrow(() -> new AppException(JOB_NOT_FOUND));
        return jobMapper.toJobResponse(job);
    }

    @Override
    public JobResponse createJob(JobCreateRequest request) {
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
        String slugBase = slugify(request.getTitle()) + "-" + slugify(company.getCompanyName());
        String slug = slugBase + "-" + job.getId();
        job.setSlug(slug);

        // 4. save lan 2 => update slug
        job = jobRepository.save(job);

        return jobMapper.toJobResponse(job);
    }

    @Override
    public JobResponse updateJob(String slug, JobResponse job) {
        return null;
    }

    @Override
    public List<JobResponse> getJobsByCompanyId(String companyId) {
        return List.of();
    }

    @Override
    public void deleteJob(String slug) {}

    @Override
    public List<JobResponse> getJobsByCurrentEmployer() {
        // 1. lấy email từ SecurityContext
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String email = authentication.getName();
        // 2. lấy user từ email
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // 3. lấy employer từ user
        Employer employer = employerRepository.findByUser(user).orElseThrow(() -> new AppException(ErrorCode.EMPLOYER_NOT_FOUND));

        // 4. lấy company từ employer
        Company company = companyRepository.findByEmployer(employer).orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        // 5. lấy toàn bộ job từ company
        return jobMapper.toJobResponse(jobRepository.findByCompany(company));
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

    private String slugify(String text) {
        return text.trim()
                .toLowerCase()
                .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "") // xu li dau tieng viet
                .replaceAll("[^a-z0-9\\s-]", "") // loai bo ki tu dac biet
                .replaceAll("\\s+", "-"); // space -> -
    }
}
