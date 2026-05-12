package com.dev001.itviec.dto.response;

import com.dev001.itviec.enums.ApplicationStatus;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

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
    String coverLetter;
    ApplicationStatus status;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<CityResponse> desiredLocations;
}
