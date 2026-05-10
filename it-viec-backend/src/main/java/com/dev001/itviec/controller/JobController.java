package com.dev001.itviec.controller;

import java.util.List;

import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.service.JobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/jobs")
public class JobController {

    private final JobService jobService;

    // 1.API trả về toàn bộ job đang active có phân trang, để hiển thị ở trang chủ và trang tìm kiếm
    @GetMapping
    public ApiResponse<PageResponse<JobCardResponse>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.<PageResponse<JobCardResponse>>builder()
                .code(1000)
                .result(jobService.getJobCards(page, size))
                .build();
    }

    // 2.API trả về thông tin chi tiết của job theo slug, công việc phải được active
    @GetMapping("/{slug}")
    public ApiResponse<JobDetailResponse>getJobDetailBySlug(@PathVariable String slug) {
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.getJobBySlug(slug))
                .build();
    }

    // 3.API cho phép công ty hiện tại lấy toàn bộ công việc của công ty đó (bất kể trạng thái nào)
    @GetMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<List<JobDetailResponse>> getMyJobs() {
        return ApiResponse.<List<JobDetailResponse>>builder()
                .code(1000)
                .result(jobService.getJobsByCurrentEmployer())
                .build();
    }

    // 4.API cho phép công ty hiện tại tạo mới công việc
    // ( *chỉ công ty đó mới được tạo cv của họ, không công ty nào khác được phép tạo cv của công ty khác* )
    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<JobDetailResponse> createJob(@RequestBody JobCreateRequest request) {
        return ApiResponse.<JobDetailResponse>builder()
                .code(1000)
                .result(jobService.createJob(request))
                .build();
    }

    // 5.API cho phép công ty hiện tại chỉnh sửa công việc
    // ( *chỉ công ty đó mới được chỉnh sửa job của họ, không công ty nào khác được phép chỉnh sửa job của công ty khác* )
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> updateJob(@RequestBody JobCreateRequest request, @PathVariable String id) {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }

    // 6.API cho phép công ty hiện tại chỉnh sửa công việc ( cập nhật trạng thái )
    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> updateJobStatus(@RequestBody JobCreateRequest request, @PathVariable String id) {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }
    // 7.API cho phép công ty hiện tại xóa công việc của họ
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> deleteJob(@PathVariable String id) {
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }

    // 8.API cho phép công ty hiện tại xem tất cả đơn ứng tuyển của 1 job cụ thể
    @GetMapping("/jobs/{id}/applications")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<Void> getApplicationsByJob(@PathVariable String id) {
        return  ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }
}
