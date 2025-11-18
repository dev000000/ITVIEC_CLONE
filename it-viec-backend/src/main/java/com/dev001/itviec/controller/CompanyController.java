package com.dev001.itviec.controller;


import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CompanyResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.service.CompanyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/companies")
public class CompanyController {
    private final CompanyService companyService;
    @GetMapping
    public ApiResponse<List<CompanyResponse>> getCompanies() {
        return ApiResponse.<List<CompanyResponse>>builder()
                .code(1000)
                .result(companyService.getAllCompanies())
                .build();
    }


}
