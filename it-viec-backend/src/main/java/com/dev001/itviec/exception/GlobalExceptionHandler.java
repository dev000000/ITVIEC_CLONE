package com.dev001.itviec.exception;

import java.util.Map;
import java.util.Objects;

import jakarta.validation.ConstraintViolation;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.dev001.itviec.dto.response.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    private static final String MIN_ATTRIBUTE = "min";
    private static final String MAX_ATTRIBUTE = "max";

    //    @ExceptionHandler(value = Exception.class)
    //    ResponseEntity<ApiResponse> handleException(Exception exception) {
    //        ErrorCode errorCode = ErrorCode.UNCATEGORIZED_EXCEPTION;
    //        ApiResponse apiResponse = ApiResponse.builder()
    //                .code(errorCode.getCode())
    //                .message(errorCode.getMessage())
    //                .build();
    //        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    //    }
    // this is for catch exception from the usernamepasswordauthenticationprovider
    @ExceptionHandler(value = BadCredentialsException.class)
    ResponseEntity<ApiResponse> handleBadCredential(Exception exception) {
        ErrorCode errorCode = ErrorCode.USERNAME_OR_PASSWORD_INCORECT;
        ApiResponse apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handleAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.valueOf(enumKey);

        // Luu attribute
        var constraintViolation =
                exception.getBindingResult().getAllErrors().get(0).unwrap(ConstraintViolation.class);
        // example exception.getBindingResult().getAllErrors() : ListOf<FieldError>
        /*[
        FieldError{objectName='userDTO', field='username',
        	rejectedValue=ab, // du lieu nhap vao ma ko hop le
        	defaultMessage='USERNAME_INVALID_LENGTH'},

        FieldError{objectName='userDTO', field='age',
        	rejectedValue=15,
        	defaultMessage='AGE_TOO_SMALL'}
        ] */
        //        example .unwrap(ConstraintViolation.class)
        /*     propertyPath: username
        invalidValue: ab
        message: USERNAME_INVALID_LENGTH
        constraintDescriptor: @Size(min=5, max=10)
        */
        var attributes = constraintViolation.getConstraintDescriptor().getAttributes();
        /*{ example getAttributes()
        	"min": 5,
        	"max": 10,
        	"message": "USERNAME_INVALID_LENGTH",
        	"groups": [],
        	"payload": []
        }
         */
        ApiResponse apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(
                        Objects.nonNull(attributes)
                                ? mapAttributes(errorCode.getMessage(), attributes)
                                : errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    private String mapAttributes(String message, Map<String, Object> attributes) {
        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));
        String maxValue = String.valueOf(attributes.get(MAX_ATTRIBUTE));

        message = message.replace("{" + MIN_ATTRIBUTE + "}", minValue).replace("{" + MAX_ATTRIBUTE + "}", maxValue);
        return message;
    }
}
