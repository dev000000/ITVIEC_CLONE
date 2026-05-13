package com.dev001.itviec.dto.request;

import com.dev001.itviec.entity.country.Country;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;
import com.dev001.itviec.enums.OvertimePolicy;
import com.dev001.itviec.enums.WorkingHours;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyUpdateRequest {

    @NotBlank(message = "COMPANY_NAME_REQUIRED")
    String companyName;

    String description;

    String website;

    String logoUrl;

    @NotBlank(message = "ADDRESS_REQUIRED")
    String address;

    @NotNull(message = "COMPANY_MODEL_REQUIRED")
    CompanyModel companyModel;

    @NotBlank(message = "INDUSTRY_REQUIRED")
    String industry;

    @NotNull(message = "COMPANY_SIZE_REQUIRED")
    CompanySize companySize;

    @NotNull(message = "COUNTRY_REQUIRED")
    Country country;

    @NotNull(message = "WORKING_HOURS_REQUIRED")
    WorkingHours workingHours;

    @NotNull(message = "OVERTIME_POLICY_REQUIRED")
    OvertimePolicy overtimePolicy;

    @NotBlank(message = "COMPANY_INTRODUCTION_REQUIRED")
    String companyIntroduction;

    @NotBlank(message = "OUR_EXPERTISE_REQUIRED")
    String ourExpertise;

    @NotBlank(message = "WHY_WORK_HERE_REQUIRED")
    String whyWorkHere;

    @Size(min = 3, message = "AT_LEAST_3_SKILLS_REQUIRED")
    Set<Skill> companySkills = new HashSet<>();

}
