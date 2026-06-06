package com.dev001.itviec.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PopularTagResponse {
    Long id;
    String category;
    String name;
    String sourceId;
    String companySlug;
}
