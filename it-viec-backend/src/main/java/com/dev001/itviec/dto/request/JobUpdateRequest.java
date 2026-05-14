package com.dev001.itviec.dto.request;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.ExperienceLevel;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobUpdateRequest {

    @NotBlank(message = "TITLE_REQUIRED")
    String title;

    @NotBlank(message = "JOB_REASON_REQUIRED")
    String jobReason;

    @NotBlank(message = "JOB_DESCRIPTION_REQUIRED")
    String jobDescription;

    @NotBlank(message = "JOB_REQUIREMENTS_REQUIRED")
    String jobRequirements;

    @NotBlank(message = "WHY_JOIN_US_REQUIRED")
    String whyJoinUs;

    @NotBlank(message = "LOCATION_REQUIRED")
    String location;

    //    @NotNull(message = "CITY_REQUIRED")
    City city;

    @NotBlank(message = "SALARY_REQUIRED")
    String salary;

    @NotNull(message = "JOB_TYPE_REQUIRED")
    JobType jobType;

    @NotNull(message = "EXPERIENCE_LEVEL_REQUIRED")
    ExperienceLevel experienceLevel;

    @NotNull(message = "POSTED_AT_REQUIRED")
    LocalDateTime postedAt;

    @NotNull(message = "EXPIRES_AT_REQUIRED")
    LocalDateTime expiresAt;

    @NotNull(message = "STATUS_REQUIRED")
    JobStatus status;

    @Size(min = 3, message = "AT_LEAST_3_SKILLS_REQUIRED")
    Set<Skill> skills;
}
