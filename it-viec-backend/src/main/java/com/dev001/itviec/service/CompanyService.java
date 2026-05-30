package com.dev001.itviec.service;

import com.dev001.itviec.dto.request.CompanyUpdateRequest;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.dto.response.CompanyLogoContent;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
