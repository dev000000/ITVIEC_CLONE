package com.dev001.itviec.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import java.util.Arrays;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1001, "User already existed", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1002, "User not found", HttpStatus.NOT_FOUND),
    USERNAME_INVALID(1003, "Username must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(
            1004,
            "Password must be at least 12 chars and include upper, lower, number, special",
            HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1005, "User is not authenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1006, "User is not permitted", HttpStatus.FORBIDDEN),
    DOB_INVALID(1007, "User must be > {min}", HttpStatus.BAD_REQUEST),
    ACCESS_TOKEN_EXPIRED(1008, "Access token expired", HttpStatus.GONE),
    USERNAME_OR_PASSWORD_INCORECT(1009, "User name or password is incorect!", HttpStatus.UNAUTHORIZED),
    LOGOUT_SUCCESS(1010, "Logout success", HttpStatus.OK),
    REFRESH_TOKEN_EXPIRED(1011, "Your session has expired. Please login again.", HttpStatus.UNAUTHORIZED),
    LOGOUT_FAIL(1012, "Logout fail!", HttpStatus.BAD_REQUEST),
    JOB_NOT_FOUND(1013, "Job not found!", HttpStatus.NOT_FOUND),
    COMPANY_NOT_FOUND(1014, "Company not found!", HttpStatus.NOT_FOUND),
    SEEKER_NOT_FOUND(1015, "Seeker not found", HttpStatus.NOT_FOUND),
    EMPLOYER_NOT_FOUND(1016, "Employer not found", HttpStatus.NOT_FOUND),
    EMAIL_EXISTED(1017, "Email already existed", HttpStatus.BAD_REQUEST),
    FULL_NAME_EXISTED(1018, "Full name already existed", HttpStatus.BAD_REQUEST),
    EMAIL_REQUIRED(1019, "Email must not be blank", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1020, "Email is invalid", HttpStatus.BAD_REQUEST),
    PASSWORD_REQUIRED(1021, "Password must not be blank", HttpStatus.BAD_REQUEST),
    FULL_NAME_REQUIRED(1022, "Full name must not be blank", HttpStatus.BAD_REQUEST),
    FULL_NAME_SIZE(1023, "Full name must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),
    COMPANY_NOT_FOUND_BY_SLUG(1024, "Company not found when search by slug", HttpStatus.NOT_FOUND),
    CITY_NAME_REQUIRED(1025, "City name must not be blank", HttpStatus.BAD_REQUEST),
    CITY_NAME_EXISTED(1026, "City name already existed", HttpStatus.BAD_REQUEST),
    SKILL_NAME_EXISTED(1027, "Skill name already existed", HttpStatus.BAD_REQUEST);

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
