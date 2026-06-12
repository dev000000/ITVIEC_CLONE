package com.dev001.itviec.dto.response;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerCvMetadataResponse {
    String id;
    String cvFileId;
    String fileName;
    String contentType;
    long size;
    boolean isPrimary;
    LocalDateTime updatedAt;
}
