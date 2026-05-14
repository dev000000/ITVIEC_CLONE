package com.dev001.itviec.controller;

import com.dev001.itviec.dto.request.CompanyUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.service.CompanyService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/companies")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyController {
    CompanyService companyService;

    // 1.API trả về toàn bộ company có kèm số lượng job đang active, để hiển thị ở trang chủ
    @GetMapping
    public ApiResponse<List<CompanyCardResponse>> getAllCompanies() {
        return ApiResponse.<List<CompanyCardResponse>>builder()
                .code(1000)
                .result(companyService.getAllCompaniesWithJobCountActive())
                .build();
    }

    // 2.API trả về company theo slug kèm theo toàn bộ job đang active của company đó, để hiển thị ở trang chi tiết
    // company
    @GetMapping("/slug/{slug}")
    public ApiResponse<CompanyDetailResponse> getCompanyBySlug(@PathVariable String slug) {
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.getCompanyWithJobsActive(slug))
                .build();
    }

    // 3.API cho phép employer cập nhật thông tin company của mình
    @PutMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<CompanyDetailResponse> updateMyCompany(@RequestBody @Valid CompanyUpdateRequest request) {
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.updateMyCompany(request))
                .build();
    }

    // 4.API cho phép employer xem thông tin company mình
    @GetMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<CompanyDetailResponse> getMyCompany() {
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.getMyCompany())
                .build();
    }
}
