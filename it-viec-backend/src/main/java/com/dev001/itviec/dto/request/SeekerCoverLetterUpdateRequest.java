package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerCoverLetterUpdateRequest {

    @Size(max = 500, message = "COVER_LETTER_TOO_LONG")
    String coverLetter;
}
