package com.dev001.itviec.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CompanyBriefResponse;
import com.dev001.itviec.dto.response.CompanyOptionResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;
import com.dev001.itviec.service.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/companies")
public class AdminCompanyController {

    private final CompanyService companyService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PageResponse<CompanyBriefResponse>> getAdminCompanies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) CompanyModel companyModel,
            @RequestParam(required = false) Long countryId,
            @RequestParam(required = false) CompanySize companySize) {
        return ApiResponse.<PageResponse<CompanyBriefResponse>>builder()
                .code(1000)
                .result(companyService.getAdminCompanies(page, size, companyName, companyModel, countryId, companySize))
                .build();
    }

    @GetMapping("/options")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<java.util.List<CompanyOptionResponse>> getAdminCompanyOptions() {
        return ApiResponse.<java.util.List<CompanyOptionResponse>>builder()
                .code(1000)
                .result(companyService.getAdminCompanyOptions())
                .build();
    }
}
