package com.dev001.itviec.dto.response;

import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyProfileStatusResponse {
    boolean complete;
    List<String> missingFields;
}
