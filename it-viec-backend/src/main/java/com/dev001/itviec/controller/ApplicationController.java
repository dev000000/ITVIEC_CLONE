package com.dev001.itviec.controller;

import com.dev001.itviec.dto.request.ApplicationRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApplicationController {

    private final ApplicationService applicationService;

    // 1.API cho phép nộp đơn ứng tuyển (seeker nộp) theo job cụ thể
    @PostMapping("/jobs/{jobId}/applications")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<ApplicationCreateResponse> applyToJob(
            @PathVariable Long jobId, @RequestBody @Valid ApplicationRequest request) {
        ApplicationCreateResponse response = applicationService.applyToJob(jobId, request);
        return ApiResponse.<ApplicationCreateResponse>builder()
                .code(1000)
                .result(response)
                .build();
    }

    // 2.API cho phép người xin việc (seeker) xem danh sách đơn ứng tuyển của mình
    @GetMapping("/seekers/me/applications")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<List<ApplicationResponse>> getMyApplications() {
        return ApiResponse.<List<ApplicationResponse>>builder()
                .code(1000)
                .result(applicationService.getMyApplications())
                .build();
    }

    // 3.API cho phép công ty (company) xem tất cả đơn ứng tuyển của họ
    @GetMapping("/companies/me/applications")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<List<ApplicationResponse>> getMyCompanyApplications() {
        return ApiResponse.<List<ApplicationResponse>>builder()
                .code(1000)
                .result(applicationService.getMyCompanyApplications())
                .build();
    }

    // 4.API cho phép công ty cập nhật trạng thái đơn ứng tuyển của họ
    @PatchMapping("/companies/me/applications/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> updateApplicationStatus(@PathVariable String id) {
        return ApiResponse.<Void>builder().code(1000).build();
    }

    // 5.API cho phép công ty xem chi tiết 1 đơn ứng tuyển
    @GetMapping("/companies/me/applications/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<ApplicationResponse> getApplicationById(@PathVariable String id) {
        return ApiResponse.<ApplicationResponse>builder().code(1000).result(applicationService.getApplicationById(id)).build();
    }

    // 6.API cho phép admin xem toàn bộ đơn ứng tuyển
    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<ApplicationResponse>> getAllApplications() {
        return ApiResponse.<List<ApplicationResponse>>builder().code(1000).result(applicationService.getAllApplications()).build();
    }

    // 7.API cho phép người xin việc xem chi tiết 1 đơn ứng tuyển của họ
    @GetMapping("/seekers/me/applications/{id}")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<ApplicationResponse> getMyApplicationById(@PathVariable String id) {
        return ApiResponse.<ApplicationResponse>builder().code(1000).result(applicationService.getMyApplicationById(id)).build();
    }

    // 8.API cho phép công ty hiện tại xem tất cả đơn ứng tuyển của 1 job cụ thể
    @GetMapping("/companies/me/jobs/{id}/applications")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> getApplicationsByJobId(@PathVariable String id) {
        return ApiResponse.<Void>builder().code(1000).build();
    }
}
