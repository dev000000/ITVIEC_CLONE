package com.dev001.itviec.dto.request;

import java.time.LocalDate;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.Gender;
import com.dev001.itviec.validator.PhoneNumberPatterns;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerUpdateRequest {

    @NotBlank(message = "FULL_NAME_REQUIRED")
    String fullName;

    @NotBlank(message = "EMAIL_REQUIRED")
    String jobTitle;

    @NotBlank(message = "PHONE_NUMBER_REQUIRED")
    @Pattern(regexp = PhoneNumberPatterns.VIETNAM_PHONE_NUMBER, message = "PHONE_NUMBER_INVALID")
    String phoneNumber;

    @NotNull(message = "DATE_OF_BIRTH_REQUIRED")
    @Past(message = "DATE_OF_BIRTH_MUST_BE_IN_PAST")
    LocalDate dateOfBirth;

    @NotNull(message = "GENDER_REQUIRED")
    Gender gender;

    City city;

    String address;

    String personalLink;

    String coverLetter;

    @Size(min = 3, message = "AT_LEAST_3_SKILLS_REQUIRED")
    Set<Skill> skills;

    @Size(min = 3, message = "AT_LEAST_3_DESIRED_LOCATIONS_REQUIRED")
    Set<City> desiredLocations;
}
