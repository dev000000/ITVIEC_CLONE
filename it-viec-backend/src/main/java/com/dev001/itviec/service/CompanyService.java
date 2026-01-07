package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.CompanyResponse;

public interface CompanyService {
    List<CompanyResponse> getAllCompanies();
    List<CompanyResponse> getAllCompaniesWithJobs();
}
