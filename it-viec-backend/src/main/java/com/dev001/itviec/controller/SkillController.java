package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.service.CityService;
import com.dev001.itviec.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/skills")
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ApiResponse<List<SkillResponse>> getSkills() {
        return ApiResponse.<List<SkillResponse>>builder()
                .code(1000)
                .result(skillService.getAllSkills())
                .build();
    }
}
