package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.dto.response.UserResponse;
import com.dev001.itviec.service.CityService;
import com.dev001.itviec.service.impl.CityServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/city")
public class CityController {

    private final CityService cityService;

    @GetMapping
    public ApiResponse<List<CityResponse>> getCities() {
        return ApiResponse.<List<CityResponse>>builder()
                .code(1000)
                .result(cityService.getAllCities())
                .build();
    }
}
