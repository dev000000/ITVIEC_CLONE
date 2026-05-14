package com.dev001.itviec.dto.response;

import com.dev001.itviec.enums.Role;
import com.dev001.itviec.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticationResponse {
    boolean authenticated;
    String id;
    String email;
    Role role;
    UserStatus status;
}
