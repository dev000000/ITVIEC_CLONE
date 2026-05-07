package com.dev001.itviec.dto.request;

 import com.dev001.itviec.validator.PasswordConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterUserSeekerRequest {

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID")
    String email;

    @NotBlank(message = "PASSWORD_REQUIRED")
    @PasswordConstraint
    String password;

    @NotBlank(message = "FULL_NAME_REQUIRED")
    @Size(min = 2, max = 50, message = "FULL_NAME_SIZE")
    String fullName;

}
