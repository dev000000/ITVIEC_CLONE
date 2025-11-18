package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.service.JobService;
import com.dev001.itviec.service.SeekerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/jobs")
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ApiResponse<List<JobResponse>> getJobs() {
        return ApiResponse.<List<JobResponse>>builder()
                .code(1000)
                .result(jobService.getAllJobs())
                .build();
    }
}
