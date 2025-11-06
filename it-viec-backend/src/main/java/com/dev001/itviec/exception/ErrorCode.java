package com.dev001.itviec.exception;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1001, "User already existed", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1002, "User not found", HttpStatus.NOT_FOUND),
    USERNAME_INVALID(1003, "Username must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004, "Password must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1005, "User is not authenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1006, "User is not permitted", HttpStatus.FORBIDDEN),
    DOB_INVALID(1007, "User must be > {min}", HttpStatus.BAD_REQUEST),
    ACCESS_TOKEN_EXPIRED(1008, "Access token expired", HttpStatus.GONE),
    USERNAME_OR_PASSWORD_INCORECT(1009, "User name or password is incorect!", HttpStatus.UNAUTHORIZED),
    LOGOUT_SUCCESS(1010, "Logout success", HttpStatus.OK),
    REFRESH_TOKEN_EXPIRED(1011, "Your session has expired. Please login again.", HttpStatus.UNAUTHORIZED),
    LOGOUT_FAIL(1012, "Logout fail!", HttpStatus.BAD_REQUEST);

    private int code;
    private String message;
    private HttpStatusCode statusCode;

    public static ErrorCode fromCode(int code) {
        return Arrays.stream(values())
                .filter(e -> e.code == code)
                .findFirst()
                .orElse(null); // hoặc throw exception nếu không tìm thấy
    }
}
