package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.NotBlank;

import com.dev001.itviec.validator.PasswordConstraint;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployerActivateRequest {

    @NotBlank(message = "ACTIVATION_TOKEN_INVALID")
    String token;

    @NotBlank(message = "PASSWORD_REQUIRED")
    @PasswordConstraint
    String password;

    @NotBlank(message = "PASSWORD_REQUIRED")
    String confirmPassword;
}
