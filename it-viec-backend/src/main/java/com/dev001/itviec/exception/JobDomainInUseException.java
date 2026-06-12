package com.dev001.itviec.exception;

import com.dev001.itviec.dto.response.JobDomainUsageCountResponse;

public class JobDomainInUseException extends AppException {
    private final JobDomainUsageCountResponse usageCount;

    public JobDomainInUseException(JobDomainUsageCountResponse usageCount) {
        super(ErrorCode.JOB_DOMAIN_IN_USE);
        this.usageCount = usageCount;
    }

    public JobDomainUsageCountResponse getUsageCount() {
        return usageCount;
    }
}
