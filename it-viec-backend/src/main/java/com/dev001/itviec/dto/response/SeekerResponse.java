package com.dev001.itviec.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import com.dev001.itviec.enums.Gender;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerResponse {
    String id;
    UserResponse user;
    String fullName;
    String jobTitle;
    String phoneNumber;
    LocalDate dateOfBirth;
    Gender gender;
    CityResponse city;
    String address;
    String personalLink;
    String coverLetter;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<SkillResponse> skills;
    Set<CityResponse> desiredLocations;
}
