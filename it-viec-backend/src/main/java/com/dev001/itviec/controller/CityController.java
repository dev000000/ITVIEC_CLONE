package com.dev001.itviec.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.request.CityCreateRequest;
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
    public ApiResponse<CityResponse> addCity(@RequestBody @Valid CityCreateRequest request) {
        CityResponse newCity = cityService.createCity(request.getCityName());
        return ApiResponse.<CityResponse>builder().code(1000).result(newCity).build();
    }
}
