package com.dev001.itviec.controller;

import com.dev001.itviec.dto.request.ApplicationRequest;
import com.dev001.itviec.dto.request.ApplicationUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApplicationController {

    private final ApplicationService applicationService;

    // 1.API cho phép nộp đơn ứng tuyển theo job cụ thể (multipart: form data + optional CV mới) (PRIVATE)
    @PostMapping(value = "/jobs/{jobId}/applications", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<ApplicationCreateResponse> applyToJob(
            @PathVariable Long jobId,
            @RequestPart("request") @Valid ApplicationRequest request,
            @RequestPart(value = "cvFile", required = false) MultipartFile cvFile) {
        return ApiResponse.<ApplicationCreateResponse>builder()
                .code(1000)
                .result(applicationService.applyToJob(jobId, request, cvFile))
                .build();
    }

    // 2.API cho phép người xin việc (seeker) xem danh sách đơn ứng tuyển của mình (PRIVATE)
    @GetMapping("/seekers/me/applications")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<List<ApplicationResponse>> getMyApplications() {
        return ApiResponse.<List<ApplicationResponse>>builder()
                .code(1000)
                .result(applicationService.getMyApplications())
                .build();
    }

    // 3.API cho phép công ty (company) xem tất cả đơn ứng tuyển của họ (PRIVATE)
    @GetMapping("/companies/me/applications")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<List<ApplicationResponse>> getMyCompanyApplications() {
        return ApiResponse.<List<ApplicationResponse>>builder()
                .code(1000)
                .result(applicationService.getMyCompanyApplications())
                .build();
    }

    // 4.API cho phép công ty cập nhật trạng thái đơn ứng tuyển của họ (PRIVATE)
    @PatchMapping("/companies/me/applications/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<ApplicationResponse> updateApplicationStatus(
            @PathVariable String id, @RequestBody @Valid ApplicationUpdateRequest request) {
        return ApiResponse.<ApplicationResponse>builder()
                .code(1000)
                .result(applicationService.updateApplicationStatus(id, request))
                .build();
    }

    // 5.API cho phép công ty xem chi tiết 1 đơn ứng tuyển (PRIVATE)
    @GetMapping("/companies/me/applications/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<ApplicationResponse> getApplicationById(@PathVariable String id) {
        return ApiResponse.<ApplicationResponse>builder()
                .code(1000)
                .result(applicationService.getApplicationById(id))
                .build();
    }

    // 6.API cho phép admin xem toàn bộ đơn ứng tuyển (PRIVATE)
    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<ApplicationResponse>> getAllApplications() {
        return ApiResponse.<List<ApplicationResponse>>builder()
                .code(1000)
                .result(applicationService.getAllApplications())
                .build();
    }

    // 7.API cho phép người xin việc xem chi tiết 1 đơn ứng tuyển của họ (PRIVATE)
    @GetMapping("/seekers/me/applications/{id}")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<ApplicationResponse> getMyApplicationById(@PathVariable String id) {
        return ApiResponse.<ApplicationResponse>builder()
                .code(1000)
                .result(applicationService.getMyApplicationById(id))
                .build();
    }

    // 8.API cho phép công ty hiện tại xem tất cả đơn ứng tuyển của 1 job cụ thể (PRIVATE)
    @GetMapping("/companies/me/jobs/{id}/applications")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<List<ApplicationResponse>> getApplicationsByJobId(@PathVariable Long id) {
        return ApiResponse.<List<ApplicationResponse>>builder()
                .code(1000)
                .result(applicationService.getApplicationsByJobId(id))
                .build();
    }
}

