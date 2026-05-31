package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dev001.itviec.dto.request.CompanyUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.dto.response.CompanyLogoContent;
import com.dev001.itviec.service.CompanyService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/companies")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyController {
    CompanyService companyService;

    // 1. API trả về toàn bộ company có kèm số lượng job đang active, để hiển thị ở (PUBLIC)
    // trang chủ
    @GetMapping
    public ApiResponse<List<CompanyCardResponse>> getAllCompanies() {
        return ApiResponse.<List<CompanyCardResponse>>builder()
                .code(1000)
                .result(companyService.getAllCompaniesWithJobCountActive())
                .build();
    }

    // 2. API trả về company theo slug kèm theo toàn bộ job đang active của company (PUBLIC)
    // đó, để hiển thị ở trang chi tiết company
    @GetMapping("/slug/{slug}")
    public ApiResponse<CompanyDetailResponse> getCompanyBySlug(@PathVariable String slug) {
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.getCompanyWithJobsActive(slug))
                .build();
    }

    // (PUBLIC)
    @GetMapping("/{id}/logo")
    public ResponseEntity<byte[]> getCompanyLogo(@PathVariable String id) {
        CompanyLogoContent logoContent = companyService.getCompanyLogo(id);
        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
        if (logoContent.getContentType() != null && !logoContent.getContentType().isBlank()) {
            mediaType = MediaType.parseMediaType(logoContent.getContentType());
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .contentLength(logoContent.getData().length)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + logoContent.getFileName() + "\"")
                .body(logoContent.getData());
    }

    // 3. API cho phép employer cập nhật thông tin company của mình (PRIVATE)
    @PutMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<CompanyDetailResponse> updateMyCompany(@RequestBody @Valid CompanyUpdateRequest request) {
        log.info("Received request to update company: {}", request);
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.updateMyCompany(request))
                .build();
    }

    // (PRIVATE)
    @PutMapping(value = "/me/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<CompanyDetailResponse> uploadMyCompanyLogo(@RequestParam("file") MultipartFile file) {
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.uploadMyCompanyLogo(file))
                .build();
    }

    // (PRIVATE)
    @DeleteMapping("/me/logo")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<CompanyDetailResponse> deleteMyCompanyLogo() {
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.deleteMyCompanyLogo())
                .build();
    }

    // 4. API cho phép employer xem thông tin company mình (PRIVATE)
    @GetMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ApiResponse<CompanyDetailResponse> getMyCompany() {
        return ApiResponse.<CompanyDetailResponse>builder()
                .code(1000)
                .result(companyService.getMyCompany())
                .build();
    }
}
