package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.service.SkillService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/skills")
public class SkillController {

    private final SkillService skillService;

    // 1.API trả về toàn bộ skill có trong hệ thống, để hiển thị trong select box
    @GetMapping
    public ApiResponse<List<SkillResponse>> getAllSkills() {
        return ApiResponse.<List<SkillResponse>>builder()
                .code(1000)
                .result(skillService.getAllSkills())
                .build();
    }

    // 2.API cho phép admin thêm skill mới vào hệ thống
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> addSkill() {
        return ApiResponse.<Void>builder().code(1000).build();
    }
}
