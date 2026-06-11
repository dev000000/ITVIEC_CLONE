package com.dev001.itviec.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.request.*;
import com.dev001.itviec.dto.response.*;
import com.dev001.itviec.service.AuthenticationService;
import com.dev001.itviec.service.EmployerRegistrationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final EmployerRegistrationService employerRegistrationService;

    // 1.API login bằng form đăng nhập (PUBLIC)
    @PostMapping("/auth/login")
    public ApiResponse<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request, HttpServletResponse response) {
        AuthenticationResponse authResponse = authenticationService.authenticate(request, response);
        return ApiResponse.<AuthenticationResponse>builder()
                .code(1000)
                .result(authResponse)
                .build();
    }

    // 2.API trả về thông tin user hiện tại ( trong trường hợp refresh F5 website ) (PUBLIC)
    @GetMapping("/auth/me")
    public ApiResponse<AuthenticationResponse> me() {
        AuthenticationResponse authResponse = authenticationService.getCurrentUser();
        return ApiResponse.<AuthenticationResponse>builder()
                .code(1000)
                .result(authResponse)
                .build();
    }

    // 3.API đăng ký một tài khoản cho người tìm việc (seeker) (PUBLIC)
    @PostMapping("/auth/register/seekers")
    public ApiResponse<Void> register(
            @RequestBody @Valid RegisterUserSeekerRequest request, HttpServletResponse response) {
        authenticationService.registerUserSeeker(request, response);
        return ApiResponse.<Void>builder().code(1000).build();
    }

    // 4.API refresh token khi access token hết hạn (PUBLIC)
    @PostMapping("/auth/refresh-token")
    public ApiResponse<Void> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        authenticationService.refreshToken(request, response);
        return ApiResponse.<Void>builder().code(1000).build();
    }

    // 5.API đăng ký tài khoản nhà tuyển dụng (PUBLIC)
    @PostMapping("/auth/register/employers")
    public ApiResponse<String> registerEmployer(@RequestBody @Valid RegisterEmployerRequest request) {
        employerRegistrationService.registerEmployer(request);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Employer registration submitted successfully")
                .build();
    }
}
