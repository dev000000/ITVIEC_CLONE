package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.EmployerRegistrationResponse;
import com.dev001.itviec.service.AdminEmployerRegistrationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/employer-registrations")
@PreAuthorize("hasRole('ADMIN')")
public class AdminEmployerRegistrationController {

    private final AdminEmployerRegistrationService service;

    @GetMapping
    public ApiResponse<List<EmployerRegistrationResponse>> getPendingRegistrations() {
        return ApiResponse.<List<EmployerRegistrationResponse>>builder()
                .code(1000)
                .result(service.getPendingRegistrations())
                .build();
    }

    @PostMapping("/{userId}/approve")
    public ApiResponse<String> approve(@PathVariable String userId) {
        service.approveRegistration(userId);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Employer registration approved")
                .build();
    }

    @PostMapping("/{userId}/reject")
    public ApiResponse<String> reject(@PathVariable String userId, @RequestParam(required = false) String reason) {
        service.rejectRegistration(userId, reason);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Employer registration rejected")
                .build();
    }
}
