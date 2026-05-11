package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApplicationController {

    private final ApplicationService applicationService;

    // 1.API cho phép nộp đơn ứng tuyển (seeker nộp) theo job cụ thể
    @PostMapping("/jobs/{jobId}/applications")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<Void> applyToJob(@PathVariable String jobId) {
        return ApiResponse.<Void>builder().code(1000).build();
    }

    // 2.API cho phép người xin việc (seeker) xem danh sách đơn ứng tuyển của mình
    @GetMapping("/seekers/me/applications")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<Void> getMyApplications() {
        return ApiResponse.<Void>builder().code(1000).build();
    }

    // 3.API cho phép công ty (company) xem tất cả đơn ứng tuyển của họ
    @GetMapping("/companies/me/applications")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> getMyCompanyApplications() {
        return ApiResponse.<Void>builder().code(1000).build();
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
    public ApiResponse<Void> getApplicationById(@PathVariable String id) {
        return ApiResponse.<Void>builder().code(1000).build();
    }

    // 6.API cho phép admin xem toàn bộ đơn ứng tuyển
    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> getAllApplications() {
        return ApiResponse.<Void>builder().code(1000).build();
    }

    // 7.API cho phép người xin việc xem chi tiết 1 đơn ứng tuyển của họ
    @GetMapping("/seekers/me/applications/{id}")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<Void> getMyApplicationById(@PathVariable String id) {
        return ApiResponse.<Void>builder().code(1000).build();
    }

    // 8.API cho phép công ty hiện tại xem tất cả đơn ứng tuyển của 1 job cụ thể
    @GetMapping("/companies/me/jobs/{id}/applications")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> getApplicationsByJobId(@PathVariable String id) {
        return ApiResponse.<Void>builder().code(1000).build();
    }
}
