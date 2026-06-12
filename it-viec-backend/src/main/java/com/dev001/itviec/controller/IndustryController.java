package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.IndustryResponse;
import com.dev001.itviec.service.IndustryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/industries")
public class IndustryController {

    private final IndustryService industryService;

    @GetMapping
    public ApiResponse<List<IndustryResponse>> getAllIndustries() {
        return ApiResponse.<List<IndustryResponse>>builder()
                .code(1000)
                .result(industryService.getAllIndustries())
                .build();
    }
}
