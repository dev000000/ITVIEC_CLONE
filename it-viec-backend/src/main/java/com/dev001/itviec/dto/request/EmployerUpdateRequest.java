package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployerUpdateRequest {

    @NotBlank(message = "FULL_NAME_REQUIRED")
    @Size(min = 2, max = 50, message = "FULL_NAME_SIZE")
    String fullName;

    @NotBlank(message = "JOB_TITLE_REQUIRED")
    String jobTitle;

    @NotBlank(message = "PHONE_NUMBER_REQUIRED")
    @Pattern(regexp = "^(0(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9]))[0-9]{7}$", message = "PHONE_NUMBER_INVALID")
    String phoneNumber;

}
