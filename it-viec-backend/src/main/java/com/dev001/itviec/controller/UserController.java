package com.dev001.itviec.controller;

import com.dev001.itviec.dto.request.UserUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.UserResponse;
import com.dev001.itviec.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    // 1.API trả về toàn bộ user có trong hệ thống, chỉ admin mới được phép truy cập
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<UserResponse>> getUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .code(1000)
                .result(userService.getAllUsers())
                .build();
    }

    // 2.API trả về thông tin chi tiết của 1 user, chỉ admin mới được phép truy cập
    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<UserResponse> getUser(@PathVariable String id) {
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(userService.getUserDetail(id))
                .build();
    }

    // 3.API cho phép admin cập nhật status của 1 user, để khóa/mở khóa tài khoản của user đó
    @PatchMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<UserResponse> updateUserStatus(@PathVariable String id, @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(userService.updateUserStatus(id, request))
                .build();
    }
}
