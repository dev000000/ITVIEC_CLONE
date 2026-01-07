package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    public ApiResponse<List<ApplicationResponse>> getApplications() {
        return ApiResponse.<List<ApplicationResponse>>builder()
                .code(1000)
                .result(applicationService.getAllApplications())
                .build();
    }
//    @GetMapping
//    public String getApplications(){
//        return "ok";
//    }
}
