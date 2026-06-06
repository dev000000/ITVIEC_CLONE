package com.dev001.itviec.controller;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.request.AdminJobStatusUpdateRequest;
import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.request.JobUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.ExperienceLevel;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;
import com.dev001.itviec.service.JobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class JobController {

    private final JobService jobService;

    @GetMapping("/jobs")
    public ApiResponse<PageResponse<JobCardResponse>> getAllJobs(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<JobCardResponse>>builder()
                .code(1000)
                .result(jobService.getJobCards(page, size))
                .build();
    }

    @GetMapping("/jobs/search")
    public ApiResponse<PageResponse<JobCardResponse>> searchJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long cityId,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) ExperienceLevel experienceLevel) {
        return ApiResponse.<PageResponse<JobCardResponse>>builder()
                .code(1000)
                .result(jobService.searchJobs(page, size, keyword, cityId, jobType, experienceLevel))
                .build();
    }

    @GetMapping("/jobs/slug/{slug}")
    public ApiResponse<JobDetailResponse> getJobBySlug(@PathVariable String slug) {
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.getJobBySlug(slug))
                .build();
    }

    @GetMapping("/admin/jobs")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PageResponse<JobDetailResponse>> getAdminJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) JobStatus status,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) Long cityId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate postedAtFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate postedAtTo) {
        return ApiResponse.<PageResponse<JobDetailResponse>>builder()
                .code(1000)
                .result(jobService.getAdminJobs(
                        page, size, title, companyName, status, jobType, cityId, postedAtFrom, postedAtTo))
                .build();
    }

    @GetMapping("/admin/jobs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<JobDetailResponse> getAdminJobById(@PathVariable Long id) {
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.getAdminJobById(id))
                .build();
    }

    @PatchMapping("/admin/jobs/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<JobDetailResponse> updateAdminJobStatus(
            @PathVariable Long id, @RequestBody @Valid AdminJobStatusUpdateRequest request) {
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.updateJobStatusByAdmin(id, request.getStatus()))
                .build();
    }

    @DeleteMapping("/admin/jobs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteAdminJob(@PathVariable Long id) {
        jobService.deleteJobByAdmin(id);
        return ApiResponse.<Void>builder().code(1000).build();
    }

    @GetMapping("/companies/me/jobs")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<List<JobDetailResponse>> getMyJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) JobStatus status,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) Long cityId) {
        return ApiResponse.<List<JobDetailResponse>>builder()
                .code(1000)
                .result(jobService.getJobsByCurrentEmployer(title, status, jobType, cityId))
                .build();
    }

    @PostMapping("/jobs")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<JobDetailResponse> createJob(@RequestBody @Valid JobCreateRequest request) {
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.createJob(request))
                .build();
    }

    @PutMapping("/companies/me/jobs/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<JobDetailResponse> updateJob(
            @RequestBody @Valid JobUpdateRequest request, @PathVariable Long id) {
        log.info("updateJob: {}", request);
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.updateJob(id, request))
                .build();
    }

    @DeleteMapping("/companies/me/jobs/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJobByCurrentEmployer(id);
        return ApiResponse.<Void>builder().code(1000).build();
    }
}
