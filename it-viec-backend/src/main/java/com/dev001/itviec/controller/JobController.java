package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.service.JobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/jobs")
public class JobController {

    private final JobService jobService;

    // API get all jobs in system ( public = status => active )
    @GetMapping
    public ApiResponse<List<JobResponse>> getAllJobs() {
        return ApiResponse.<List<JobResponse>>builder()
                .code(1000)
                .result(jobService.getAllJobsActive())
                .build();
    }

    @GetMapping("/{slug}")
    public ApiResponse<JobResponse>getJobBySlug(@PathVariable String slug) {
        return ApiResponse.<JobResponse>builder()
                .code(1000)
                .result(jobService.getJobBySlug(slug))
                .build();
    }


    @GetMapping("/my-jobs")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<List<JobResponse>> getMyJobs() {
        return ApiResponse.<List<JobResponse>>builder()
                .code(1000)
                .result(jobService.getJobsByCurrentEmployer())
                .build();
    }


    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<JobResponse> createJob(@RequestBody JobCreateRequest request) {
        return ApiResponse.<JobResponse>builder()
                .code(1000)
                .result(jobService.createJob(request))
                .build();
    }
}
