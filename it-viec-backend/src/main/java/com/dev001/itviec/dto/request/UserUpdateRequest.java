package com.dev001.itviec.dto.request;


import com.dev001.itviec.enums.UserStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {

    @NotNull(message = "STATUS_REQUIRED")
    UserStatus status;
}
