package com.dev001.itviec.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;
import com.dev001.itviec.enums.OvertimePolicy;
import com.dev001.itviec.enums.WorkingHours;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyResponse {
    String id;
    EmployerResponse employer;
    String companyName;
    String slug;
    String description;
    String website;
    String logoUrl;
    String address;
    CompanyModel companyModel;
    String industry;
    CompanySize companySize;
    CountryResponse country;
    WorkingHours workingHours;
    OvertimePolicy overtimePolicy;
    String companyIntroduction;
    String ourExpertise;
    String whyWorkHere;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<SkillResponse> companySkills;
//    List<JobResponse> jobs;
}
