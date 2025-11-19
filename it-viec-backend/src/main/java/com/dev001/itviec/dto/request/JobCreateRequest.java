package com.dev001.itviec.dto.request;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.ExperienceLevel;
import com.dev001.itviec.enums.JobStatus;
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
public class JobCreateRequest {
    String companyId;
    String title;
    String jobReason;
    String jobDescription;
    String jobRequirements;
    String whyJoinUs;
    String location;
    City city;
    String salary;
    JobType jobType;
    ExperienceLevel experienceLevel;
    LocalDateTime postedAt;
    LocalDateTime expiresAt;
    Set<Skill> skills;
}
