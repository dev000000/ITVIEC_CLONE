package com.dev001.itviec.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dev001.itviec.dto.request.CompanyUpdateRequest;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.dto.response.CompanyLogoContent;

public interface CompanyService {

    List<CompanyCardResponse> getAllCompaniesWithJobCountActive();

    CompanyDetailResponse getCompanyWithJobsActive(String slug);

    CompanyDetailResponse getMyCompany();

    CompanyDetailResponse updateMyCompany(CompanyUpdateRequest request);

    CompanyDetailResponse uploadMyCompanyLogo(MultipartFile file);

    CompanyDetailResponse deleteMyCompanyLogo();

    CompanyLogoContent getCompanyLogo(String companyId);

    String generateCompanySlug(String companyName);
}
