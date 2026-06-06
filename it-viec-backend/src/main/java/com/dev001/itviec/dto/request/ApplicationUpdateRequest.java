package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.NotNull;

import com.dev001.itviec.enums.ApplicationStatus;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicationUpdateRequest {

    @NotNull(message = "STATUS_REQUIRED")
    ApplicationStatus status;

    String employerMessage;
}
