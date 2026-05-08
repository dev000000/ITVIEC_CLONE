package com.dev001.itviec.dto.response;

import com.dev001.itviec.enums.JobType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

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
