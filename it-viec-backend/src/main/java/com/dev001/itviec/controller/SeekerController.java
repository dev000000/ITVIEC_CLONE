package com.dev001.itviec.controller;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.service.SeekerService;
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
@RequestMapping("/api/v1/seeker")
public class SeekerController {

    private final SeekerService seekerService;

    @GetMapping
    public ApiResponse<List<SeekerResponse>> getSkills() {
        return ApiResponse.<List<SeekerResponse>>builder()
                .code(1000)
                .result(seekerService.getAllSeekers())
                .build();
    }
}
