package com.dev001.itviec.exception;

import com.dev001.itviec.dto.response.SkillUsageCountResponse;

import lombok.Getter;

@Getter
public class SkillInUseException extends AppException {
    private final SkillUsageCountResponse usageCount;

    public SkillInUseException(SkillUsageCountResponse usageCount) {
        super(ErrorCode.SKILL_IN_USE);
        this.usageCount = usageCount;
    }
}
