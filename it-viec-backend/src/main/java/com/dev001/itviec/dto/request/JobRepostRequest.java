package com.dev001.itviec.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobRepostRequest {
    @NotNull(message = "POSTED_AT_REQUIRED")
    LocalDateTime postedAt;

    LocalDateTime expiresAt;
}
