package com.dev001.itviec.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev001.itviec.dto.request.PopularTagCreateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.PopularTagResponse;
import com.dev001.itviec.service.PopularTagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tag/popular")
public class PopularTagController {

    private final PopularTagService popularTagService;

    @GetMapping
    public ApiResponse<List<PopularTagResponse>> getPopularTags() {
        return ApiResponse.<List<PopularTagResponse>>builder()
                .code(1000)
                .result(popularTagService.getPopularTags())
                .build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PopularTagResponse> createPopularTag(@RequestBody @Valid PopularTagCreateRequest request) {
        return ApiResponse.<PopularTagResponse>builder()
                .code(1000)
                .result(popularTagService.createPopularTag(request))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deletePopularTag(@PathVariable Long id) {
        popularTagService.deletePopularTag(id);
        return ApiResponse.<Void>builder().code(1000).build();
    }
}
