package com.dev001.itviec.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyCardResponse {
    String id;
    String companyName;
    String slug;
    String logoUrl;
    String address;
    Set<SkillResponse> companySkills;
    // trả về số lượng job public cho mọi người check
    int numberOfJobsActive;
}
