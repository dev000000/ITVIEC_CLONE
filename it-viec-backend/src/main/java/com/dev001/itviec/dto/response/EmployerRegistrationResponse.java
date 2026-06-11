package com.dev001.itviec.dto.response;

import com.dev001.itviec.enums.UserStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployerRegistrationResponse {
    String userId;
    String email;
    String fullName;
    String jobTitle;
    String phoneNumber;
    String referralSource;
    String companyName;
    String companyAddress;
    String website;
    UserStatus status;
    String createdAt;
}
