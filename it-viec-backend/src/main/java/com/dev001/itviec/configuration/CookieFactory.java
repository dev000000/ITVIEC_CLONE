package com.dev001.itviec.configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieFactory {
    @Value("${application.security.cookie.secure}")
    private boolean secure;

    @Value("${application.security.cookie.same-site}")
    private String sameSite;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration; // in milliseconds

    public ResponseCookie accessCookie(String value) {
        long maxAgeSeconds = TimeUnit.MILLISECONDS.toSeconds(refreshExpiration);
        return base("accessToken", value, "/", maxAgeSeconds);
    }

    public ResponseCookie accessCookie(String value, long maxAgeSeconds) {
        return base("accessToken", value, "/", maxAgeSeconds);
    }

    public ResponseCookie refreshCookie(String value, long maxAgeSeconds) {
        return base("refreshToken", value, "/", maxAgeSeconds);
    }

    public ResponseCookie refreshCookie(String value) {
        long maxAgeSeconds = TimeUnit.MILLISECONDS.toSeconds(refreshExpiration);
        return base("refreshToken", value, "/", maxAgeSeconds);
    }

    public ResponseCookie deleteAccessCookie() {
        return accessCookie("", 0);
    }

    public ResponseCookie deleteRefreshCookie() {
        return refreshCookie("", 0);
    }

    private ResponseCookie base(String name, String value, String path, long maxAge) {
        return ResponseCookie.from(name, value == null ? "" : value)
                .httpOnly(true)
                .secure(secure)
                .sameSite(sameSite)
                .path(path)
                .maxAge(maxAge)
                .build();
    }
}
