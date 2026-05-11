package com.dev001.itviec.configuration;

import com.dev001.itviec.repository.TokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenRepository tokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        // 1. Lấy JWT từ cookie
        String jwt = null;
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("accessToken".equals(c.getName())) {
                    jwt = c.getValue();
                    break;
                }
            }
        }
        if (jwt == null) {
            request.setAttribute("auth.error.code", "LOGOUT_FAIL");
            return;
        }

        // 2.Kiểm tra token có tồn tại trong DB không
        var savedToken = tokenRepository.findByToken(jwt).orElse(null);
        if (savedToken == null) {
            request.setAttribute("auth.error.code", "LOGOUT_FAIL");
            return;
        }

        // Token đã bị revoke trước đó → coi như logout thành công (idempotent)
        if (savedToken.isRevoked()) {
            return; // không set LOGOUT_FAIL, vẫn trả success
        }

        // 3.lấy TẤT CẢ token còn valid của user (revoked = false)
        var validUserTokens = tokenRepository.findByUserAndRevokedFalse(savedToken.getUser());

        // 4. Revoke hêt tất cả token còn hiệu lực
        if (!validUserTokens.isEmpty()) {
            validUserTokens.forEach(token -> token.setRevoked(true));
            tokenRepository.saveAll(validUserTokens);
        }
    }
}
