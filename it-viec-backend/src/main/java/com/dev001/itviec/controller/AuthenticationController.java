package com.dev001.itviec.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.request.*;
import com.dev001.itviec.dto.response.*;
import com.dev001.itviec.service.AuthenticationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request, HttpServletResponse response) {
        AuthenticationResponse authResponse = authenticationService.authenticate(request, response);
        return ApiResponse.<AuthenticationResponse>builder()
                .code(1000)
                .result(authResponse)
                .build();
    }
//    @PostMapping("/login")
//    public String login(
//            @RequestBody AuthenticationRequest request, HttpServletResponse response) {
//        return request.getEmail();
//    }

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(
            @RequestBody @Valid RegisterRequest request, HttpServletResponse response) {

        RegisterResponse RegisResponse = authenticationService.register(request, response);
        return ApiResponse.<RegisterResponse>builder()
                .code(1000)
                .result(RegisResponse)
                .build();
    }


    @PostMapping("/refresh-token")
    public ApiResponse<?> refreshTokenH(HttpServletRequest request, HttpServletResponse response) {
        authenticationService.refreshToken(request, response);
        return ApiResponse.<Void>builder().code(1000).build();
    }

}
