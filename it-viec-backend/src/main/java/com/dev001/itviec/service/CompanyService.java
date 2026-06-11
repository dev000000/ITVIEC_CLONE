package com.dev001.itviec.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dev001.itviec.dto.request.CompanyUpdateRequest;
import com.dev001.itviec.dto.response.CompanyBriefResponse;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.dto.response.CompanyLogoContent;
import com.dev001.itviec.dto.response.CompanyOptionResponse;
import com.dev001.itviec.dto.response.CompanyProfileStatusResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;

public interface CompanyService {

    PageResponse<CompanyBriefResponse> getAdminCompanies(
            int page, int size, String companyName, CompanyModel companyModel, Long countryId, CompanySize companySize);

    List<CompanyOptionResponse> getAdminCompanyOptions();

    PageResponse<CompanyCardResponse> getAllCompaniesWithJobCountActive(int page, int size);

    CompanyDetailResponse getCompanyWithJobsActive(String slug);

    CompanyDetailResponse getMyCompany();

    CompanyDetailResponse updateMyCompany(CompanyUpdateRequest request);

    CompanyDetailResponse uploadMyCompanyLogo(MultipartFile file);

    CompanyDetailResponse deleteMyCompanyLogo();

    CompanyLogoContent getCompanyLogo(String companyId);

    String generateCompanySlug(String companyName);

    CompanyProfileStatusResponse getCompanyProfileStatus();
}
