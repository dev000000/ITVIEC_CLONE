package com.dev001.itviec.dto.response;

import java.time.LocalDateTime;
import java.util.Set;

import com.dev001.itviec.enums.ApplicationStatus;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
// Response trả về sau khi ứng tuyển thành công
public class ApplicationCreateResponse {
    String id;
    JobDetailResponse job;
    String fullName;
    String phoneNumber;
    String resumeUrl;
    String cvFileId;
    String resumePreviewUrl;
    String coverLetter;
    ApplicationStatus status;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<CityResponse> desiredLocations;
}
