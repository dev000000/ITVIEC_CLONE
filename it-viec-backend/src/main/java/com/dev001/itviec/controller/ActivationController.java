package com.dev001.itviec.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.request.EmployerActivateRequest;
import com.dev001.itviec.dto.request.ResendActivationRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.service.ActivationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class ActivationController {

    private final ActivationService activationService;

    @GetMapping("/activate")
    public ApiResponse<String> activate(@RequestParam String token) {
        activationService.activate(token);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Account activated successfully")
                .build();
    }

    @PostMapping("/resend-activation")
    public ApiResponse<String> resendActivation(@RequestBody @Valid ResendActivationRequest request) {
        activationService.resendActivation(request.getEmail());
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Activation email sent")
                .build();
    }

    @PostMapping("/activate-employer")
    public ApiResponse<String> activateEmployer(@RequestBody @Valid EmployerActivateRequest request) {
        activationService.activateEmployer(request.getToken(), request.getPassword(), request.getConfirmPassword());
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Employer account activated successfully")
                .build();
    }
}
