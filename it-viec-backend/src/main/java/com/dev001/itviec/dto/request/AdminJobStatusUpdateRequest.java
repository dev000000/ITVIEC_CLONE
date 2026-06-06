package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.NotNull;

import com.dev001.itviec.enums.JobStatus;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminJobStatusUpdateRequest {

    @NotNull(message = "STATUS_REQUIRED")
    JobStatus status;
}
