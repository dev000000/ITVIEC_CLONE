package com.dev001.itviec.controller;

import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.request.SendEmailRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/emails")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> sendEmail(@RequestBody @Valid SendEmailRequest request) {
        emailService.sendSimple(request.getTo(), request.getSubject(), request.getBody());
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Email sent successfully")
                .build();
    }
}
