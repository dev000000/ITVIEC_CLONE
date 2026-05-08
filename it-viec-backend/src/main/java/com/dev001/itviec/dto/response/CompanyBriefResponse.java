package com.dev001.itviec.dto.response;

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
public class CompanyBriefResponse {
    String id;
    String companyName;
    String slug;
    String logoUrl;
    String description;
    CompanyModel companyModel;
    CountryResponse country;
    WorkingHours workingHours;
    OvertimePolicy overtimePolicy;
    String industry;
    CompanySize companySize;
}
