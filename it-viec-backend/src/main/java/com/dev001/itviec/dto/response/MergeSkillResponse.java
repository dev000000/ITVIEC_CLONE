package com.dev001.itviec.dto.response;

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
public class MergeSkillResponse {
    String message;
    SkillUsageCountResponse migratedRecords;
    SkillAdminResponse sourceSkill;
    SkillAdminResponse targetSkill;
}
