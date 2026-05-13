package com.dev001.itviec.service;

import com.dev001.itviec.dto.request.CompanyUpdateRequest;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;

import java.util.List;

public interface CompanyService {

    List<CompanyCardResponse> getAllCompaniesWithJobCountActive();

    CompanyDetailResponse getCompanyWithJobsActive(String slug);

    CompanyDetailResponse getMyCompany();

    CompanyDetailResponse updateMyCompany(CompanyUpdateRequest request);

    String generateCompanySlug(String companyName);
}
