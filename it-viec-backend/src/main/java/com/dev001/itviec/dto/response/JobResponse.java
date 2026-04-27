package com.dev001.itviec.dto.response;

import java.time.LocalDateTime;
import java.util.Set;

import com.dev001.itviec.enums.*;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobResponse {
    Long id;
    CompanySummaryResponse company;
    String title;
    String slug;
    String jobReason;
    String jobDescription;
    String jobRequirements;
    String whyJoinUs;
    String location;
    CityResponse city;
    String salary;
    JobType jobType;
    ExperienceLevel experienceLevel;
    LocalDateTime postedAt;
    LocalDateTime expiresAt;
    JobStatus jobStatus;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<SkillResponse> skills;
}
