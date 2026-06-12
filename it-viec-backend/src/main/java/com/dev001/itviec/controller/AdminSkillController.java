package com.dev001.itviec.controller;

import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.request.SkillCreateRequest;
import com.dev001.itviec.dto.request.SkillMergeRequest;
import com.dev001.itviec.dto.request.SkillUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.MergeSkillResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.dto.response.SkillAdminResponse;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.service.SkillService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/skills")
@PreAuthorize("hasRole('ADMIN')")
public class AdminSkillController {

    private final SkillService skillService;

    @GetMapping
    public ApiResponse<PageResponse<SkillAdminResponse>> getAdminSkills(
            @RequestParam(required = false) SkillStatus status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<SkillAdminResponse>>builder()
                .code(1000)
                .result(skillService.getAdminSkills(status, search, page, size))
                .build();
    }

    @PostMapping
    public ApiResponse<SkillAdminResponse> createSkill(@RequestBody @Valid SkillCreateRequest request) {
        return ApiResponse.<SkillAdminResponse>builder()
                .code(1000)
                .result(skillService.createSkillAdmin(request.getSkillName()))
                .build();
    }

    @PatchMapping("/{id}")
    public ApiResponse<SkillAdminResponse> updateSkill(
            @PathVariable Long id, @RequestBody @Valid SkillUpdateRequest request) {
        return ApiResponse.<SkillAdminResponse>builder()
                .code(1000)
                .result(skillService.updateSkill(id, request.getSkillName()))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<SkillAdminResponse> deprecateSkill(@PathVariable Long id) {
        return ApiResponse.<SkillAdminResponse>builder()
                .code(1000)
                .result(skillService.deprecateSkill(id))
                .build();
    }

    @PostMapping("/{id}/merge")
    public ApiResponse<MergeSkillResponse> mergeSkill(
            @PathVariable Long id, @RequestBody @Valid SkillMergeRequest request) {
        return ApiResponse.<MergeSkillResponse>builder()
                .code(1000)
                .result(skillService.mergeSkill(id, request.getTargetSkillId()))
                .build();
    }

    @PatchMapping("/{id}/restore")
    public ApiResponse<SkillAdminResponse> restoreSkill(@PathVariable Long id) {
        return ApiResponse.<SkillAdminResponse>builder()
                .code(1000)
                .result(skillService.restoreSkill(id))
                .build();
    }
}
