package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.service.CityService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cities")
public class CityController {

    private final CityService cityService;

    // 1.API trả về toàn bộ city có trong hệ thống, để hiển thị trong select box
    @GetMapping
    public ApiResponse<List<CityResponse>> getAllCities() {
        return ApiResponse.<List<CityResponse>>builder()
                .code(1000)
                .result(cityService.getAllCities())
                .build();
    }

    // 2.API cho phép admin thêm city mới vào hệ thống
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> addCity() {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }

}
