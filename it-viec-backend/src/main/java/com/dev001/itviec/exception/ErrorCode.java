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
    DATE_OF_BIRTH_MUST_BE_IN_PAST(1056, "Date of birth must be in the past", HttpStatus.BAD_REQUEST),
    INVALID_USER_STATUS(1057, "Invalid user status", HttpStatus.BAD_REQUEST),
    ADMIN_IS_NOT_ALLOWED_TO_UPDATE_STATUS_ADMIN(
            1058, "Admin is not allowed to update status of admin", HttpStatus.BAD_REQUEST),
    TITLE_REQUIRED(1059, "Title must not be blank", HttpStatus.BAD_REQUEST),
    JOB_REASON_REQUIRED(1060, "Job reason must not be blank", HttpStatus.BAD_REQUEST),
    JOB_DESCRIPTION_REQUIRED(1061, "Job description must not be blank", HttpStatus.BAD_REQUEST),
    JOB_REQUIREMENTS_REQUIRED(1062, "Job requirements must not be blank", HttpStatus.BAD_REQUEST),
    WHY_JOIN_US_REQUIRED(1063, "Why join us must not be blank", HttpStatus.BAD_REQUEST),
    LOCATION_REQUIRED(1064, "Location must not be blank", HttpStatus.BAD_REQUEST),
    SALARY_REQUIRED(1065, "Salary must not be blank", HttpStatus.BAD_REQUEST),
    JOB_TYPE_REQUIRED(1066, "Job type must not be null", HttpStatus.BAD_REQUEST),
    EXPERIENCE_LEVEL_REQUIRED(1067, "Experience level must not be null", HttpStatus.BAD_REQUEST),
    POSTED_AT_REQUIRED(1068, "Posted at must not be blank", HttpStatus.BAD_REQUEST),
    EXPIRES_AT_REQUIRED(1069, "Expires at must not be blank", HttpStatus.BAD_REQUEST),
    INVALID_JOB_TYPE(1070, "Invalid job type", HttpStatus.BAD_REQUEST),
    INVALID_EXPERIENCE_LEVEL(1071, "Invalid experience level", HttpStatus.BAD_REQUEST),
    INVALID_JOB_STATUS(1072, "Invalid job status", HttpStatus.BAD_REQUEST),
    COMPANY_LOGO_REQUIRED(1073, "Company logo file is required", HttpStatus.BAD_REQUEST),
    COMPANY_LOGO_INVALID_TYPE(1074, "Company logo must be a PNG, JPEG, or WEBP image", HttpStatus.BAD_REQUEST),
    COMPANY_LOGO_TOO_LARGE(1075, "Company logo must not exceed 2 MB", HttpStatus.BAD_REQUEST),
    COMPANY_LOGO_NOT_FOUND(1076, "Company logo not found", HttpStatus.NOT_FOUND),
    COMPANY_LOGO_UPLOAD_FAILED(1077, "Failed to upload company logo", HttpStatus.INTERNAL_SERVER_ERROR),
    SEEKER_CV_REQUIRED(1078, "CV file is required", HttpStatus.BAD_REQUEST),
    SEEKER_CV_INVALID_TYPE(1079, "CV must be a PDF, DOC, or DOCX file", HttpStatus.BAD_REQUEST),
    SEEKER_CV_TOO_LARGE(1080, "CV file must not exceed 5 MB", HttpStatus.BAD_REQUEST),
    SEEKER_CV_NOT_FOUND(1081, "CV not found", HttpStatus.NOT_FOUND),
    SEEKER_CV_UPLOAD_FAILED(1082, "Failed to upload CV", HttpStatus.INTERNAL_SERVER_ERROR),
    SEEKER_AVATAR_REQUIRED(1083, "Avatar file is required", HttpStatus.BAD_REQUEST),
    SEEKER_AVATAR_INVALID_TYPE(1084, "Avatar must be a PNG, JPEG, or WEBP image", HttpStatus.BAD_REQUEST),
    SEEKER_AVATAR_TOO_LARGE(1085, "Avatar file must not exceed 2 MB", HttpStatus.BAD_REQUEST),
    SEEKER_AVATAR_NOT_FOUND(1086, "Avatar not found", HttpStatus.NOT_FOUND),
    SEEKER_AVATAR_UPLOAD_FAILED(1087, "Failed to upload avatar", HttpStatus.INTERNAL_SERVER_ERROR),
    SKILL_NOT_FOUND(1088, "Skill not found", HttpStatus.NOT_FOUND),
    POPULAR_TAG_NOT_FOUND(1089, "Popular tag not found", HttpStatus.NOT_FOUND),
    POPULAR_TAG_ALREADY_EXISTS(1090, "Popular tag already exists", HttpStatus.BAD_REQUEST),
    POPULAR_TAG_CATEGORY_INVALID(1091, "Popular tag category is invalid", HttpStatus.BAD_REQUEST),
    POPULAR_TAG_SOURCE_ID_INVALID(1092, "Popular tag source id is invalid", HttpStatus.BAD_REQUEST),
    POPULAR_TAG_CATEGORY_REQUIRED(1093, "Popular tag category is required", HttpStatus.BAD_REQUEST),
    POPULAR_TAG_SOURCE_ID_REQUIRED(1094, "Popular tag source id is required", HttpStatus.BAD_REQUEST),
    SAVED_JOBS_LIMIT_EXCEEDED(1095, "You can save up to 20 jobs", HttpStatus.BAD_REQUEST),
    SAVED_JOB_NOT_FOUND(1096, "Saved job not found", HttpStatus.NOT_FOUND),
    JOB_NOT_SAVABLE(1097, "Job is not savable", HttpStatus.BAD_REQUEST),
    EMAIL_SEND_FAILED(1100, "Failed to send email", HttpStatus.INTERNAL_SERVER_ERROR),
    EMAIL_SUBJECT_REQUIRED(1101, "Email subject must not be blank", HttpStatus.BAD_REQUEST),
    EMAIL_BODY_REQUIRED(1102, "Email body must not be blank", HttpStatus.BAD_REQUEST),
    ACTIVATION_TOKEN_INVALID(1103, "Activation token is invalid or already used", HttpStatus.BAD_REQUEST),
    ACTIVATION_TOKEN_EXPIRED(1104, "Activation token has expired", HttpStatus.BAD_REQUEST),
    ACCOUNT_NOT_ACTIVATED(1105, "Account is not activated. Please check your email.", HttpStatus.FORBIDDEN),
    ACCOUNT_ALREADY_ACTIVATED(1106, "Account is already activated", HttpStatus.BAD_REQUEST),
    ACTIVATION_RESEND_TOO_SOON(
            1107, "Please wait before requesting a new activation email", HttpStatus.TOO_MANY_REQUESTS),
    ACCOUNT_DISABLED(1108, "Account has been disabled", HttpStatus.FORBIDDEN);

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
