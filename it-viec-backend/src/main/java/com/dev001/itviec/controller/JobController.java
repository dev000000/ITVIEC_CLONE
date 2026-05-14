package com.dev001.itviec.controller;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.request.JobUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class JobController {

    private final JobService jobService;

    // 1.API trả về toàn bộ job đang active có phân trang, để hiển thị ở trang chủ và trang tìm kiếm
    @GetMapping("/jobs")
    public ApiResponse<PageResponse<JobCardResponse>> getAllJobs(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<JobCardResponse>>builder()
                .code(1000)
                .result(jobService.getJobCards(page, size))
                .build();
    }

    // 2.API trả về thông tin chi tiết của job theo slug, công việc phải được active
    @GetMapping("/jobs/{slug}")
    public ApiResponse<JobDetailResponse> getJobBySlug(@PathVariable String slug) {
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.getJobBySlug(slug))
                .build();
    }

    // 3.API cho phép công ty hiện tại lấy toàn bộ công việc của công ty đó (bất kể trạng thái nào)
    @GetMapping("/companies/me/jobs")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<List<JobDetailResponse>> getMyJobs() {
        return ApiResponse.<List<JobDetailResponse>>builder()
                .code(1000)
                .result(jobService.getJobsByCurrentEmployer())
                .build();
    }

    // 4.API cho phép công ty hiện tại tạo mới công việc
    // ( *chỉ công ty đó mới được tạo cv của họ, không công ty nào khác được phép tạo cv của công ty khác* )
    @PostMapping("/jobs")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<JobDetailResponse> createJob(@RequestBody JobCreateRequest request) {
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.createJob(request))
                .build();
    }

    // 5.API cho phép công ty hiện tại chỉnh sửa công việc
    // ( *chỉ công ty đó mới được chỉnh sửa job của họ, không công ty nào khác được phép chỉnh sửa job của công ty khác*
    // )
    @PutMapping("/companies/me/jobs/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<JobDetailResponse> updateJob(
            @RequestBody @Valid JobUpdateRequest request, @PathVariable Long id) {
        log.info("updateJob: {}", request);
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.updateJob(id, request))
                .build();
    }

    // 6.API cho phép công ty hiện tại xóa công việc của họ -- Sẽ xử lí xóa mềm (soft delete)
    @DeleteMapping("/companies/me/jobs/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> deleteJob(@PathVariable String id) {
        return ApiResponse.<Void>builder().code(1000).build();
    }
}
