package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;

public interface CompanyService {
    List<CompanyDetailResponse> getAllCompanies();
    List<CompanyDetailResponse> getAllCompaniesWithJobs();
    List<CompanyCardResponse> getAllCompaniesWithJobCountActive();
}
