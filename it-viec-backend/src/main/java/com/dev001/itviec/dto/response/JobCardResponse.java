package com.dev001.itviec.dto.response;

import java.time.LocalDateTime;
import java.util.Set;

import com.dev001.itviec.enums.JobType;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobCardResponse {
    Long id;
    String title;
    String slug;
    CityResponse city;
    String salary;
    JobType jobType;
    LocalDateTime postedAt;
    Set<SkillResponse> skills;
    CompanyBaseResponse company;
}
