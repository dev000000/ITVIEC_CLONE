package com.dev001.itviec.dto.response;

import java.time.LocalDateTime;
import java.util.Set;

import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;
import com.dev001.itviec.enums.SalaryCurrency;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavedJobItemResponse {
    Long id;
    String title;
    String slug;
    CityResponse city;
    Long salaryMin;
    Long salaryMax;
    SalaryCurrency salaryCurrency;
    JobType jobType;
    JobStatus status;
    LocalDateTime postedAt;
    LocalDateTime expiresAt;
    Set<SkillResponse> skills;
    CompanyBaseResponse company;
}
