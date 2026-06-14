package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.JobDomainResponse;
import com.dev001.itviec.service.JobDomainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/job-domains")
public class JobDomainController {

    private final JobDomainService jobDomainService;

    @GetMapping
    public ApiResponse<List<JobDomainResponse>> getAllJobDomains() {
        return ApiResponse.<List<JobDomainResponse>>builder()
                .code(1000)
                .result(jobDomainService.getAllJobDomains())
                .build();
    }

    @GetMapping("/top")
    public ApiResponse<List<JobDomainResponse>> getTopJobDomains(@RequestParam(defaultValue = "6") int limit) {
        return ApiResponse.<List<JobDomainResponse>>builder()
                .code(1000)
                .result(jobDomainService.getTopJobDomains(limit))
                .build();
    }
}
