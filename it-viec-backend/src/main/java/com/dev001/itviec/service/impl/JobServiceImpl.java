package com.dev001.itviec.service.impl;

import static com.dev001.itviec.enums.JobStatus.ACTIVE;
import static com.dev001.itviec.exception.ErrorCode.COMPANY_NOT_FOUND;
import static com.dev001.itviec.exception.ErrorCode.JOB_NOT_FOUND;

import java.time.LocalDateTime;
import java.util.List;

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

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobMapper jobMapper;
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;

//    @Override
//    public List<JobResponse> getAllJobs() {
//
//        return jobMapper.toJobResponse(jobRepository.findAll());
//    }
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }


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
                .jobStatus(ACTIVE)
                .skills(request.getSkills())
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
    public List<Job> getJobsByCompanyId(String companyId) {
        return jobRepository.findByCompanyId(companyId);
    }

    @Override
    public void deleteJob(String slug) {}

    private String slugify(String text) {
        return text.trim()
                .toLowerCase()
                .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "") // xu li dau tieng viet
                .replaceAll("[^a-z0-9\\s-]", "") // loai bo ki tu dac biet
                .replaceAll("\\s+", "-"); // space -> -
    }
}
