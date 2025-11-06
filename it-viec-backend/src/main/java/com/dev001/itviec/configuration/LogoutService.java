package com.dev001.itviec.configuration;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.dev001.itviec.repository.TokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenRepository tokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        // CASE 1 : RETURN JSON FOR STORING IN LOCAL STORAGE
        //        final String authHeader = request.getHeader("Authorization");
        //        final String jwt;
        //        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        //            request.setAttribute("auth.error.code", "LOGOUT_FAIL");
        //            return;
        //        }
        //        jwt = authHeader.substring("Bearer ".length());

        // CASE 2 : USE HTTP ONLY COOKIE
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

        var savedToken = tokenRepository.findByToken(jwt).orElse(null);
        // check if token not exist in database, then return
        if (savedToken == null) {
            request.setAttribute("auth.error.code", "LOGOUT_FAIL");
            return;
        }
        // if token exist in database, then get all tokens of user ( get user in token (already get in db) )
        var validUserTokens =
                tokenRepository.findAllValidTokensByUser(savedToken.getUser().getId());
        // if list of valid token is empty, then return
        if (validUserTokens.isEmpty()) {
            request.setAttribute("auth.error.code", "LOGOUT_FAIL");
            return;
        }
        // revoke all valid token of user
        validUserTokens.forEach(token -> token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }
}
