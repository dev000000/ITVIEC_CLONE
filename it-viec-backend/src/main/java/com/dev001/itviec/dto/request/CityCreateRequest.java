package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CityCreateRequest {
    @NotBlank(message = "CITY_NAME_REQUIRED")
    String cityName;
}
