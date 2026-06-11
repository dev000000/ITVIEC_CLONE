package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SendEmailRequest {

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID")
    String to;

    @NotBlank(message = "EMAIL_SUBJECT_REQUIRED")
    String subject;

    @NotBlank(message = "EMAIL_BODY_REQUIRED")
    String body;
}
