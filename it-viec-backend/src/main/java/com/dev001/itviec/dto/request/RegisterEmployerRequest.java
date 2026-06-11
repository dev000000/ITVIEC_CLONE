package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterEmployerRequest {

    @NotBlank(message = "FULL_NAME_REQUIRED")
    @Size(min = 2, max = 50, message = "FULL_NAME_SIZE")
    String fullName;

    @NotBlank(message = "JOB_TITLE_REQUIRED")
    String jobTitle;

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID")
    String email;

    @NotBlank(message = "PHONE_NUMBER_REQUIRED")
    @Size(min = 9, max = 10, message = "PHONE_NUMBER_SIZE")
    String phoneNumber;

    String referralSource;

    @NotBlank(message = "COMPANY_NAME_REQUIRED")
    String companyName;

    @NotBlank(message = "ADDRESS_REQUIRED")
    String companyAddress;

    String website;
}
