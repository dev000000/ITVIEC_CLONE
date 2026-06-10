package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.dto.response.SavedJobResponse;
import com.dev001.itviec.service.SavedJobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/seekers/me/saved-jobs")
@PreAuthorize("hasRole('SEEKER')")
public class SavedJobController {

    private final SavedJobService savedJobService;

    // 1. Lưu việc làm
    @PostMapping("/{jobId}")
    public ApiResponse<SavedJobResponse> saveJob(@PathVariable Long jobId) {
        return ApiResponse.<SavedJobResponse>builder()
                .code(1000)
                .result(savedJobService.saveJob(jobId))
                .build();
    }

    // 2. Bỏ lưu việc làm
    @DeleteMapping("/{jobId}")
    public ApiResponse<Void> unsaveJob(@PathVariable Long jobId) {
        savedJobService.unsaveJob(jobId);
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }

    // 3. Lấy danh sách việc làm đã lưu (phân trang, sắp xếp theo expiresAt)
    @GetMapping
    public ApiResponse<PageResponse<SavedJobResponse>> getMySavedJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "expiresAt,asc") String sort) {
        return ApiResponse.<PageResponse<SavedJobResponse>>builder()
                .code(1000)
                .result(savedJobService.getMySavedJobs(page, size, sort))
                .build();
    }

    // 4. Lấy danh sách job ID đã lưu (dùng để hydrate store trên FE)
    @GetMapping("/ids")
    public ApiResponse<List<Long>> getMySavedJobIds() {
        return ApiResponse.<List<Long>>builder()
                .code(1000)
                .result(savedJobService.getMySavedJobIds())
                .build();
    }
}
