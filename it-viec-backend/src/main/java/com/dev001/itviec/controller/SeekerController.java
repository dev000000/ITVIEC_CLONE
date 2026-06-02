package com.dev001.itviec.controller;

import com.dev001.itviec.dto.request.SeekerUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.SeekerCvContent;
import com.dev001.itviec.dto.response.SeekerCvMetadataResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.service.SeekerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/seekers")
public class SeekerController {

    private final SeekerService seekerService;

    // 1.API riêng cho admin, trả về toàn bộ seeker có trong hệ thống (PRIVATE)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<SeekerResponse>> getAllSeekers() {
        return ApiResponse.<List<SeekerResponse>>builder()
                .code(1000)
                .result(seekerService.getAllSeekers())
                .build();
    }

    // 2.API riêng cho seeker, trả về thông tin của seeker hiện tại (PRIVATE)
    @GetMapping("/me")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<SeekerResponse> getMyProfile() {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.getMyProfile())
                .build();
    }

    // 3.API cho phép seeker cập nhật profile của họ (PRIVATE)
    @PutMapping("/me")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<SeekerResponse> updateMyProfile(@RequestBody @Valid SeekerUpdateRequest request) {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.updateMyProfile(request))
                .build();
    }

    // 4.API cho phép admin xem profile của 1 seeker (PRIVATE)
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<SeekerResponse> getSeekerById(@PathVariable String id) {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.getSeekerById(id))
                .build();
    }

    // 5.API cho phép seeker upload CV của mình (.pdf, .doc, .docx, tối đa 5MB)
    // (PRIVATE)
    @PostMapping(value = "/me/cv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<SeekerResponse> uploadMyCv(@RequestPart("file") MultipartFile file) {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.uploadMyCv(file))
                .build();
    }

    // 6.API cho phép seeker download CV của mình (PRIVATE)
    @GetMapping("/me/cv")
    @PreAuthorize("hasRole('SEEKER')")
    public ResponseEntity<byte[]> getMyCv() {
        SeekerCvContent cv = seekerService.getMyCv();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + cv.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(cv.getContentType()))
                .body(cv.getData());
    }

    // 6b.API cho phép seeker lấy metadata CV của mình (fileName, contentType, size,
    // updatedAt) (PRIVATE)
    @GetMapping("/me/cv/metadata")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<SeekerCvMetadataResponse> getMyCvMetadata() {
        return ApiResponse.<SeekerCvMetadataResponse>builder()
                .code(1000)
                .result(seekerService.getMyCvMetadata())
                .build();
    }

    @GetMapping("/me/cv/preview")
    @PreAuthorize("hasRole('SEEKER')")
    public ResponseEntity<byte[]> previewMyCv() {
        SeekerCvContent cv = seekerService.getMyCv();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + cv.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(cv.getContentType()))
                .body(cv.getData());
    }

    // 7.API cho phép employer/admin download CV của seeker theo id (PRIVATE)
    @GetMapping("/{id}/cv")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<byte[]> getCvBySeekerId(@PathVariable String id) {
        SeekerCvContent cv = seekerService.getCvBySeekerId(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + cv.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(cv.getContentType()))
                .body(cv.getData());
    }

    // 7b.API preview CV inline (dùng cho FE hiển thị trực tiếp trong browser, không
    // download) (PRIVATE)
    @GetMapping("/{id}/cv/preview")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<byte[]> previewCvBySeekerId(@PathVariable String id) {
        SeekerCvContent cv = seekerService.getCvBySeekerId(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + cv.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(cv.getContentType()))
                .body(cv.getData());
    }

    // 8.API cho phép seeker xóa CV của mình (PRIVATE)
    @DeleteMapping("/me/cv")
    @PreAuthorize("hasRole('SEEKER')")
    public ApiResponse<SeekerResponse> deleteMyCv() {
        return ApiResponse.<SeekerResponse>builder()
                .code(1000)
                .result(seekerService.deleteMyCv())
                .build();
    }
}
