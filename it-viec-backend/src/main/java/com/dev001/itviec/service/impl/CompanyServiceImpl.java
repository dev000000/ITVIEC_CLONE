package com.dev001.itviec.service.impl;

import java.util.List;

import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.enums.JobStatus;
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

    @Override
    public List<CompanyDetailResponse> getAllCompanies() {
        return companyMapper.toCompanyDetailResponse(companyRepository.findAll());
    }
    @Override
    public List<CompanyDetailResponse> getAllCompaniesWithJobs() {
        return companyMapper.toCompanyDetailResponse(companyRepository.findAllWithJobs());
    }
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
}
