package com.dev001.itviec.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dev001.itviec.dto.response.CompanyResponse;
import com.dev001.itviec.mapper.CompanyMapper;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.service.CompanyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyMapper companyMapper;
    private final CompanyRepository companyRepository;

    @Override
    public List<CompanyResponse> getAllCompanies() {
        return companyMapper.toCompanyResponse(companyRepository.findAll());
    }
    @Override
    public List<CompanyResponse> getAllCompaniesWithJobs() {
        return companyMapper.toCompanyResponse(companyRepository.findAllWithJobs());
    }
}
