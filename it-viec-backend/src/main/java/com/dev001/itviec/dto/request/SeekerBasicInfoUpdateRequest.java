package com.dev001.itviec.dto.request;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import com.dev001.itviec.entity.city.City;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerBasicInfoUpdateRequest {

    @NotBlank(message = "FULL_NAME_REQUIRED")
    String fullName;

    @NotBlank(message = "PHONE_NUMBER_REQUIRED")
    String phoneNumber;

    @Size(min = 3, message = "AT_LEAST_3_DESIRED_LOCATIONS_REQUIRED")
    Set<City> desiredLocations;
}
