package com.dev001.itviec.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.request.EmployerUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CompanyProfileStatusResponse;
import com.dev001.itviec.dto.response.EmployerResponse;
import com.dev001.itviec.service.CompanyService;
import com.dev001.itviec.service.EmployerService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/employers")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmployerController {
    EmployerService employerService;
    CompanyService companyService;

    // 1.API này trả về cho employer profile của bản thân (PRIVATE)
    @GetMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<EmployerResponse> getMyProfile() {
        return ApiResponse.<EmployerResponse>builder()
                .code(1000)
                .result(employerService.getMyProfile())
                .build();
    }

    // 2.API này cho phép employer cập nhật profile của bản thân (PRIVATE)
    @PutMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<EmployerResponse> updateMyProfile(@RequestBody @Valid EmployerUpdateRequest request) {
        return ApiResponse.<EmployerResponse>builder()
                .code(1000)
                .result(employerService.updateMyProfile(request))
                .build();
    }

    // 3.API trả về trạng thái hoàn thiện hồ sơ công ty (PRIVATE)
    @GetMapping("/me/company-profile-status")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<CompanyProfileStatusResponse> getCompanyProfileStatus() {
        return ApiResponse.<CompanyProfileStatusResponse>builder()
                .code(1000)
                .result(companyService.getCompanyProfileStatus())
                .build();
    }

    // 4.API này cho phép admin xem danh sách employer (PRIVATE)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<EmployerResponse>> getAllEmployers() {
        return ApiResponse.<List<EmployerResponse>>builder()
                .code(1000)
                .result(employerService.getAllEmployers())
                .build();
    }

    // 4.API này cho phép admin xem chi tiết của employer (PRIVATE)
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<EmployerResponse> getEmployerById(@PathVariable String id) {
        return ApiResponse.<EmployerResponse>builder()
                .code(1000)
                .result(employerService.getEmployerById(id))
                .build();
    }
}
