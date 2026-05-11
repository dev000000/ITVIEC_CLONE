package com.dev001.itviec.dto.response;

import com.dev001.itviec.enums.Role;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserResponse {
    String id;
    String email;
    Role role;
}
