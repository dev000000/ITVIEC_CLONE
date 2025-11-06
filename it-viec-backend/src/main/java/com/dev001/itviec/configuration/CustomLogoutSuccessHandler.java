package com.dev001.itviec.configuration;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    private final CookieFactory cookieFactory;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        SecurityContextHolder.clearContext();

        ErrorCode errorCode;
        errorCode = ErrorCode.LOGOUT_SUCCESS;
        String code = (String) request.getAttribute("auth.error.code");
        if ("LOGOUT_FAIL".equals(code)) {
            errorCode = ErrorCode.LOGOUT_FAIL;
        }
        // CASE 2 : IF USE HTTP ONLY COOKIE , REMOVE COOKIE FROM RESPONSE
        response.addHeader(
                HttpHeaders.SET_COOKIE, cookieFactory.deleteAccessCookie().toString());
        response.addHeader(
                HttpHeaders.SET_COOKIE, cookieFactory.deleteRefreshCookie().toString());

        request.removeAttribute("auth.error.code");
        response.setStatus(errorCode.getStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }
}
