package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PopularTagCreateRequest {
    @NotBlank(message = "POPULAR_TAG_CATEGORY_REQUIRED")
    String category;

    @NotBlank(message = "POPULAR_TAG_SOURCE_ID_REQUIRED")
    String sourceId;
}
