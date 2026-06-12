package com.dev001.itviec.dto.response;

import com.dev001.itviec.enums.SkillStatus;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobDomainAdminResponse {
    Long id;
    String domainName;
    SkillStatus status;
    Long mergedIntoId;
    String mergedIntoName;
    long jobCount;
}
