package com.dev001.itviec.controller;

import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.request.JobDomainCreateRequest;
import com.dev001.itviec.dto.request.JobDomainUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.JobDomainAdminResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.service.JobDomainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/job-domains")
@PreAuthorize("hasRole('ADMIN')")
public class AdminJobDomainController {

    private final JobDomainService jobDomainService;

    @GetMapping
    public ApiResponse<PageResponse<JobDomainAdminResponse>> getAdminJobDomains(
            @RequestParam(required = false) SkillStatus status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<JobDomainAdminResponse>>builder()
                .code(1000)
                .result(jobDomainService.getAdminJobDomains(status, search, page, size))
                .build();
    }

    @PostMapping
    public ApiResponse<JobDomainAdminResponse> createJobDomain(@RequestBody @Valid JobDomainCreateRequest request) {
        return ApiResponse.<JobDomainAdminResponse>builder()
                .code(1000)
                .result(jobDomainService.createJobDomainAdmin(request.getDomainName()))
                .build();
    }

    @PatchMapping("/{id}")
    public ApiResponse<JobDomainAdminResponse> updateJobDomain(
            @PathVariable Long id, @RequestBody @Valid JobDomainUpdateRequest request) {
        return ApiResponse.<JobDomainAdminResponse>builder()
                .code(1000)
                .result(jobDomainService.updateJobDomain(id, request.getDomainName()))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<JobDomainAdminResponse> deprecateJobDomain(@PathVariable Long id) {
        return ApiResponse.<JobDomainAdminResponse>builder()
                .code(1000)
                .result(jobDomainService.deprecateJobDomain(id))
                .build();
    }

    @PatchMapping("/{id}/restore")
    public ApiResponse<JobDomainAdminResponse> restoreJobDomain(@PathVariable Long id) {
        return ApiResponse.<JobDomainAdminResponse>builder()
                .code(1000)
                .result(jobDomainService.restoreJobDomain(id))
                .build();
    }
}
