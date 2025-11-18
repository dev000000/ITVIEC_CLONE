package com.dev001.itviec.dto.response;

import com.dev001.itviec.entity.country.Country;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;
import com.dev001.itviec.enums.OvertimePolicy;
import com.dev001.itviec.enums.WorkingHours;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyResponse {
    String id;
    Employer employer;
    String companyName;
    String slug;
    String description;
    String website;
    String logoUrl;
    String address;
    CompanyModel companyModel;
    String industry;
    CompanySize companySize;
    Country country;
    WorkingHours workingHours;
    OvertimePolicy overtimePolicy;
    String companyIntroduction;
    String ourExpertise;
    String whyWorkHere;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<Skill> skills;
}
