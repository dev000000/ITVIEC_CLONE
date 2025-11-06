package com.dev001.itviec.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.dev001.itviec.enums.Role;
import com.dev001.itviec.validator.DobConstraint;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {
    @Size(min = 10, max = 20, message = "USERNAME_INVALID")
    String username;

    @Size(min = 10, max = 20, message = "PASSWORD_INVALID")
    String password;

    String firstName;
    String lastName;

    @NotNull(message = "DOB_INVALID")
    @DobConstraint(min = 10, message = "DOB_INVALID")
    LocalDate dob;

    // for test
    Role role;
}
