package com.dev001.itviec.service.impl;

import java.util.List;
import java.util.Optional;

import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.service.JobService;
import org.springframework.stereotype.Service;

import com.dev001.itviec.mapper.CompanyMapper;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.service.CompanyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyMapper companyMapper;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;

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
        Company company = companyRepository.findBySlug(slug).orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND_BY_SLUG));

        // 2. Tìm job active của company đó
        List<Job> jobList = jobRepository.findByCompanyAndStatus(company, JobStatus.ACTIVE);

        // 3. Set job vào company
        company.setJobs(jobList);

        return companyMapper.toCompanyDetailResponse(company);
    }
}
