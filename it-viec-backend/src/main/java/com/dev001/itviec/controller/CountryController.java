package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CountryResponse;
import com.dev001.itviec.service.CountryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CountryController {
    CountryService countryService;

    // 1.API trả về toàn bộ country có trong hệ thống, để hiển thị trong select box
    @GetMapping("/countries")
    public ApiResponse<List<CountryResponse>> getAllCountries() {

        return ApiResponse.<List<CountryResponse>>builder()
                .code(1000)
                .result(countryService.getAllCountries())
                .build();
    }
}
