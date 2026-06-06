package com.dev001.itviec.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.enums.Gender;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerPersonalInfoUpdateRequest {

    @NotBlank(message = "FULL_NAME_REQUIRED")
    String fullName;

    @NotNull(message = "GENDER_REQUIRED")
    Gender gender;

    @NotBlank(message = "JOB_TITLE_REQUIRED")
    String jobTitle;

    String personalLink;

    @NotBlank(message = "PHONE_NUMBER_REQUIRED")
    String phoneNumber;

    @NotNull(message = "DATE_OF_BIRTH_REQUIRED")
    @Past(message = "DATE_OF_BIRTH_MUST_BE_IN_PAST")
    LocalDate dateOfBirth;

    // Gửi lên object đầy đủ { id, cityName } — JPA resolve qua id
    City city;

    String address;
}
