package com.dev001.itviec.dto.response;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavedJobResponse {
    String id;
    LocalDateTime savedAt;
    SavedJobItemResponse job;
}
