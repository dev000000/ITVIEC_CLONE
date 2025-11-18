package com.dev001.itviec.dto.response;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.country.Country;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.*;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobResponse {
    Long id;
    Company company;
    String title;
    String slug;
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
    JobStatus jobStatus;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<Skill> skills;
}
