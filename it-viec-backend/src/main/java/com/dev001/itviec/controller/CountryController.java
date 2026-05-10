package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/countries")
public class CountryController {

    // 1.API trả về toàn bộ country có trong hệ thống, để hiển thị trong select box
    @GetMapping()
    public ApiResponse<Void> getAllCountries() {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }



}
