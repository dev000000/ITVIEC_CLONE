package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.service.SeekerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/seekers")
public class SeekerController {

    private final SeekerService seekerService;

    // API riêng cho admin, trả về toàn bộ seeker có trong hệ thống, để admin quản lý seeker
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<SeekerResponse>> getSeekers() {
        return ApiResponse.<List<SeekerResponse>>builder()
                .code(1000)
                .result(seekerService.getAllSeekers())
                .build();
    }

    // API riêng cho seeker, trả về thông tin của seeker hiện tại dựa vào cookie, để hiển thị ở trang profile của seeker
    @GetMapping("/me")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<SeekerResponse> getCurrentSeeker() {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.getSeekerByCookie())
                .build();
    }
}
