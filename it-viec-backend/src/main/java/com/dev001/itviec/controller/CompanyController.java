package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CompanyResponse;
import com.dev001.itviec.service.CompanyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/companies")
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping(value = "/all")
    public ApiResponse<List<CompanyResponse>> getCompanies() {
        return ApiResponse.<List<CompanyResponse>>builder()
                .code(1000)
                .result(companyService.getAllCompanies())
                .build();
    }
    @GetMapping(value = "/all-with-job")
    public ApiResponse<List<CompanyResponse>> getCompaniesWithJob() {
        return ApiResponse.<List<CompanyResponse>>builder()
                .code(1000)
                .result(companyService.getAllCompaniesWithJobs())
                .build();
    }
}
