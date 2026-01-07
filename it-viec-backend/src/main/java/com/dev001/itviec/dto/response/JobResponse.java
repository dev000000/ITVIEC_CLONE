package com.dev001.itviec.dto.response;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.*;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.skill.Skill;
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
