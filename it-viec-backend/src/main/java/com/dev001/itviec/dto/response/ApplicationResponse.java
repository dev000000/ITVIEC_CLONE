package com.dev001.itviec.dto.response;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicationResponse {

    String id;
    Seeker seeker;
    Job job;
    String fullName;
    String phoneNumber;
    String resumeUrl;
    String coverLetter;
    ApplicationStatus status;
    String employerMessage;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    List<City> desiredLocations;
}
