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

import com.dev001.itviec.dto.request.IndustryCreateRequest;
import com.dev001.itviec.dto.request.IndustryUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.IndustryAdminResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.service.IndustryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/industries")
@PreAuthorize("hasRole('ADMIN')")
public class AdminIndustryController {

    private final IndustryService industryService;

    @GetMapping
    public ApiResponse<PageResponse<IndustryAdminResponse>> getAdminIndustries(
            @RequestParam(required = false) SkillStatus status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<IndustryAdminResponse>>builder()
                .code(1000)
                .result(industryService.getAdminIndustries(status, search, page, size))
                .build();
    }

    @PostMapping
    public ApiResponse<IndustryAdminResponse> createIndustry(@RequestBody @Valid IndustryCreateRequest request) {
        return ApiResponse.<IndustryAdminResponse>builder()
                .code(1000)
                .result(industryService.createIndustryAdmin(request.getIndustryName()))
                .build();
    }

    @PatchMapping("/{id}")
    public ApiResponse<IndustryAdminResponse> updateIndustry(
            @PathVariable Long id, @RequestBody @Valid IndustryUpdateRequest request) {
        return ApiResponse.<IndustryAdminResponse>builder()
                .code(1000)
                .result(industryService.updateIndustry(id, request.getIndustryName()))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<IndustryAdminResponse> deprecateIndustry(@PathVariable Long id) {
        return ApiResponse.<IndustryAdminResponse>builder()
                .code(1000)
                .result(industryService.deprecateIndustry(id))
                .build();
    }

    @PatchMapping("/{id}/restore")
    public ApiResponse<IndustryAdminResponse> restoreIndustry(@PathVariable Long id) {
        return ApiResponse.<IndustryAdminResponse>builder()
                .code(1000)
                .result(industryService.restoreIndustry(id))
                .build();
    }
}
