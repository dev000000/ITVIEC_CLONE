package com.dev001.itviec.controller;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.dev001.itviec.service.impl.S3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/storage/objects")
public class S3Controller {
    private final S3Service s3Service;

    /**
     * Upload một object lên storage.
     */
    @PostMapping
    public ResponseEntity<String> uploadObject(@RequestParam("file") MultipartFile file) throws IOException {
        s3Service.uploadFile(file);
        return ResponseEntity.ok("File uploaded successfully");
    }

    /**
     * Tải về một object theo tên file.
     */
    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> downloadObject(@PathVariable String filename) {
        byte[] data = s3Service.downloadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(data);
    }
}
