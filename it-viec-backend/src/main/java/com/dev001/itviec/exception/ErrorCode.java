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
    SKILL_NAME_EXISTED(1027, "Skill name already existed", HttpStatus.BAD_REQUEST),
    SEEKER_ID_REQUIRED(1028, "Seeker ID must not be blank", HttpStatus.BAD_REQUEST),
    PHONE_NUMBER_REQUIRED(1029, "Phone number must not be blank", HttpStatus.BAD_REQUEST),
    RESUME_URL_REQUIRED(1030, "Resume URL must not be blank", HttpStatus.BAD_REQUEST),
    DESIRED_LOCATIONS_REQUIRED(1031, "Desired locations must not be blank", HttpStatus.BAD_REQUEST),
    PHONE_NUMBER_SIZE(1032, "Phone number must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),
    PHONE_NUMBER_INVALID(1033, "Phone number is invalid", HttpStatus.BAD_REQUEST),
    APPLICATION_ALREADY_EXISTS(1034, "Application already exists", HttpStatus.BAD_REQUEST),
    DESIRED_LOCATION_SIZE(1035, "Desired location must be at least {min}", HttpStatus.BAD_REQUEST),
    APPLICATION_NOT_FOUND(1036, "Application not found", HttpStatus.NOT_FOUND),
    STATUS_REQUIRED(1037, "Status must not be blank", HttpStatus.BAD_REQUEST),
    COMPANY_NOT_FOUND_BY_EMPLOYER(1038, "Company not found when search by employer", HttpStatus.NOT_FOUND),
    COMPANY_NAME_REQUIRED(1039, "Company name must not be blank", HttpStatus.BAD_REQUEST),
    ADDRESS_REQUIRED(1040, "Address must not be blank", HttpStatus.BAD_REQUEST),
    COMPANY_MODEL_REQUIRED(1041, "Company model must not be null", HttpStatus.BAD_REQUEST),
    INDUSTRY_REQUIRED(1042, "Industry must not be blank", HttpStatus.BAD_REQUEST),
    COMPANY_SIZE_REQUIRED(1043, "Company size must not be null", HttpStatus.BAD_REQUEST),
    COUNTRY_REQUIRED(1044, "Country must not be null", HttpStatus.BAD_REQUEST),
    WORKING_HOURS_REQUIRED(1045, "Working hours must not be null", HttpStatus.BAD_REQUEST),
    OVERTIME_POLICY_REQUIRED(1046, "Overtime policy must not be null", HttpStatus.BAD_REQUEST),
    COMPANY_INTRODUCTION_REQUIRED(1047, "Company introduction must not be blank", HttpStatus.BAD_REQUEST),
    OUR_EXPERTISE_REQUIRED(1048, "Our expertise must not be blank", HttpStatus.BAD_REQUEST),
    WHY_WORK_HERE_REQUIRED(1049, "Why work here must not be blank", HttpStatus.BAD_REQUEST),
    AT_LEAST_3_SKILLS_REQUIRED(1050, "At least 3 skills are required", HttpStatus.BAD_REQUEST),
    JOB_TITLE_REQUIRED(1051, "Job title must not be blank", HttpStatus.BAD_REQUEST),
    DATE_OF_BIRTH_REQUIRED(1052, "Date of birth must not be blank", HttpStatus.BAD_REQUEST),
    GENDER_REQUIRED(1053, "Gender must not be blank", HttpStatus.BAD_REQUEST),
    CITY_REQUIRED(1054, "City must not be blank", HttpStatus.BAD_REQUEST),
    AT_LEAST_3_DESIRED_LOCATIONS_REQUIRED(1055, "At least 3 desired locations are required", HttpStatus.BAD_REQUEST),
    DATE_OF_BIRTH_MUST_BE_IN_PAST(1056, "Date of birth must be in the past", HttpStatus.BAD_REQUEST);

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
