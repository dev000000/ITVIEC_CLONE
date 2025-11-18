package com.dev001.itviec.configuration;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {

        ErrorCode errorCode;

        errorCode = ErrorCode.UNAUTHENTICATED; // 401
        String code = (String) request.getAttribute("auth.error.code");
        if ("ACCESS_TOKEN_EXPIRED".equals(code)) { // do bạn ném từ filter khi detect ExpiredJwtException
            errorCode = ErrorCode.ACCESS_TOKEN_EXPIRED;
        }
        request.removeAttribute("auth.error.code");
        response.setStatus(errorCode.getStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setHeader("WWW-Authenticate", "Bearer error=\"invalid_token\", error_description=\"expired\"");
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }
}
