package com.dev001.itviec.configuration;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    private final CookieFactory cookieFactory;
    private final ObjectMapper objectMapper;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        // 1. Đầu tiên gán errorCode là LOGOUT_SUCCESS, sau đó check nếu có lỗi xảy ra trong LogoutService thì sẽ gán
        // lại errorCode là LOGOUT_FAIL
        ErrorCode errorCode;
        errorCode = ErrorCode.LOGOUT_SUCCESS;
        String code = (String) request.getAttribute("auth.error.code");
        if ("LOGOUT_FAIL".equals(code)) {
            errorCode = ErrorCode.LOGOUT_FAIL;
        }

        // 2. Xóa cookie bằng cách set lại cookie với maxAge = 0
        response.addHeader(
                HttpHeaders.SET_COOKIE, cookieFactory.deleteAccessCookie().toString());
        response.addHeader(
                HttpHeaders.SET_COOKIE, cookieFactory.deleteRefreshCookie().toString());

        // 3. Trả về response cho client
        request.removeAttribute("auth.error.code");
        response.setStatus(errorCode.getStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }
}
