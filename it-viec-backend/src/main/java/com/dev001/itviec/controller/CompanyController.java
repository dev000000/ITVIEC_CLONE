package com.dev001.itviec.controller;

import java.util.List;

import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.service.CompanyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/companies")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyController {
    CompanyService companyService;

    // API trả về toàn bộ company có kèm số lượng job đang active, để hiển thị ở trang chủ
    @GetMapping
    public ApiResponse<List<CompanyCardResponse>> getCompanies() {
        return ApiResponse.<List<CompanyCardResponse>>builder()
                .code(1000)
                .result(companyService.getAllCompaniesWithJobCountActive())
                .build();
    }
    // API trả về company theo slug kèm theo toàn bộ job đang active của company đó, để hiển thị ở trang chi tiết company
    @GetMapping("/{slug}")
    public ApiResponse<CompanyDetailResponse> getCompanyBySlug(@PathVariable String slug) {
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.getCompanyWithJobsActive(slug))
                .build();
    }

}
