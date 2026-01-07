package com.dev001.itviec.controller;

import java.util.List;

import com.dev001.itviec.entity.job.Job;
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

    @GetMapping
    public ApiResponse<List<Job>> getJobs() {
        return ApiResponse.<List<Job>>builder()
                .code(1000)
                .result(jobService.getAllJobs())
                .build();
    }

//    @GetMapping("/{slug}")
//    public ApiResponse<JobResponse> getJobDetail(@PathVariable String slug) {
//        return ApiResponse.<JobResponse>builder()
//                .code(1000)
//                .result(jobService.getJobBySlug(slug))
//                .build();
//    }
    @GetMapping("/{companyId}")
    public ApiResponse<List<Job>> getJobsByCompanyId(@PathVariable String companyId) {
        return ApiResponse.<List<Job>>builder()
                .code(1000)
                .result(jobService.getJobsByCompanyId(companyId))
                .build();
    }

    // create job is only for employer
    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<JobResponse> createJob(@RequestBody JobCreateRequest request) {
        return ApiResponse.<JobResponse>builder()
                .code(1000)
                .result(jobService.createJob(request))
                .build();
    }
}
