package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/employers")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmployerController {


    // 1.API này trả về cho employer profile của bản thân
    @GetMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> getMyProfile() {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }

    // 2.API này cho phép employer cập nhật profile của bản thân
    @PutMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> updateMyProfile() {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }


    // 3.API này cho phép admin xem danh sách employer
    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> getAllEmployers() {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }


    // 4.API này cho phép admin xem chi tiết của employer
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> getEmployerDetail(@PathVariable String id) {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }



}
