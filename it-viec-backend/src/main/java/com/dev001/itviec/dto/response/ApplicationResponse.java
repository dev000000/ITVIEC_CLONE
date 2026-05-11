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
public class ApplicationResponse {

    String id;
    SeekerResponse seeker;
    JobDetailResponse job;
    String fullName;
    String phoneNumber;
    String resumeUrl;
    String coverLetter;
    ApplicationStatus status;
    String employerMessage;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<CityResponse> desiredLocations;
}
