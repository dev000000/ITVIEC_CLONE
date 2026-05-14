package com.dev001.itviec.controller;

import com.dev001.itviec.dto.request.SeekerUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.service.SeekerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/seekers")
public class SeekerController {

    private final SeekerService seekerService;

    // 1.API riêng cho admin, trả về toàn bộ seeker có trong hệ thống, để admin quản lý seeker
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<SeekerResponse>> getAllSeekers() {
        return ApiResponse.<List<SeekerResponse>>builder()
                .code(1000)
                .result(seekerService.getAllSeekers())
                .build();
    }

    // 2.API riêng cho seeker, trả về thông tin của seeker hiện tại dựa vào cookie, để hiển thị ở trang profile của
    // seeker
    @GetMapping("/me")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<SeekerResponse> getMyProfile() {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.getMyProfile())
                .build();
    }

    // 3.API cho phép seeker cập nhật profile của họ
    @PutMapping("/me")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<SeekerResponse> updateMyProfile(@RequestBody @Valid SeekerUpdateRequest request) {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.updateMyProfile(request))
                .build();
    }

    // 4.API cho phép admin xem profile của 1 seeker
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<SeekerResponse> getSeekerById(@PathVariable String id) {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.getSeekerById(id))
                .build();
    }
}
