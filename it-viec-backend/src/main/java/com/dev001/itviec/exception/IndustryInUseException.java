package com.dev001.itviec.exception;

import com.dev001.itviec.dto.response.IndustryUsageCountResponse;

public class IndustryInUseException extends AppException {
    private final IndustryUsageCountResponse usageCount;

    public IndustryInUseException(IndustryUsageCountResponse usageCount) {
        super(ErrorCode.INDUSTRY_IN_USE);
        this.usageCount = usageCount;
    }

    public IndustryUsageCountResponse getUsageCount() {
        return usageCount;
    }
}
