package com.dev001.itviec.dto.response;

import com.dev001.itviec.enums.Gender;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerBasicResponse {
    String id;
    String cvUrl;
}
