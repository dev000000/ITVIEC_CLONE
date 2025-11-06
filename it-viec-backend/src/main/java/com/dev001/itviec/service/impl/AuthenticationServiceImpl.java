package com.dev001.itviec.service.impl;

import static com.dev001.itviec.enums.Role.USER;
import static com.dev001.itviec.enums.TokenType.BEARER;
import static com.dev001.itviec.exception.ErrorCode.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dev001.itviec.configuration.CookieFactory;
import com.dev001.itviec.configuration.JwtService;
import com.dev001.itviec.dto.request.AuthenticationRequest;
import com.dev001.itviec.dto.request.RegisterRequest;
import com.dev001.itviec.dto.response.AuthenticationResponse;
import com.dev001.itviec.dto.response.RegisterResponse;
import com.dev001.itviec.entity.token.Token;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.mapper.UserMapper;
import com.dev001.itviec.repository.TokenRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.AuthenticationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final UserMapper userMapper;
    private final CookieFactory cookieFactory;


    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
        // 1. Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        // 2. Check user exist
        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(USER_NOT_FOUND));

        // 3. revoke all tokens of user in database
        revokeAllUserTokens(user, true);
        // 4. generate new token for user
        String accessToken = jwtService.generateToken(user, false);
        String refreshToken = jwtService.generateToken(user, true);
        // 5. save token to database
        saveUserToken(user, accessToken, true);
        saveUserToken(user, refreshToken, false);

        // 6. set cookie for response
        response.addHeader(
                HttpHeaders.SET_COOKIE, cookieFactory.accessCookie(accessToken).toString());
        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookieFactory.refreshCookie(refreshToken).toString());

        // 7. return response
        return AuthenticationResponse.builder().authenticated(true).build();
    }

    private void revokeAllUserTokens(User user, boolean isRevokeRefreshToken) {
        var validUserTokens = isRevokeRefreshToken
                ? tokenRepository.findAllValidTokensByUser(user.getId())
                : tokenRepository.findAllValidAccessTokensByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token -> token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String token, boolean isAccessToken) {
        var savedToken = Token.builder()
                .user(user)
                .token(token)
                .tokenType(BEARER)
                .isAccessToken(isAccessToken)
                .expiryTime(jwtService.extractExpiration(token))
                .revoked(false)
                .build();
        tokenRepository.save(savedToken);
    }

    @Override
    public RegisterResponse register(RegisterRequest request, HttpServletResponse response) {

        // 1. check username existed
        // Don't need this
        //        if (userRepository.existsByUsername(request.getUsername())) {
        //            throw new AppException(USER_EXISTED);
        //        }
        // 2. convert RegisterRequest to User
        User user = userMapper.toUser(request);
        // 3. hash password and set it to user
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);
        // 4. set roles to user (default role is USER for user register)
        user.setRole(USER);
        // 5. save user to DB
        User savedUser = null;
        try {
            savedUser = userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(USER_EXISTED);
        }
        // 6. generate token for user
        String accessToken = jwtService.generateToken(savedUser, false);
        String refreshToken = jwtService.generateToken(savedUser, true);
        // 7. save token to DB
        saveUserToken(savedUser, accessToken, true);
        saveUserToken(savedUser, refreshToken, false);
        // 8. convert user to RegisterResponse and return

        RegisterResponse RegisResponse = userMapper.toRegisterResponse(user);
        // 9. set cookie for response
        //        response.addHeader(HttpHeaders.SET_COOKIE, cookieFactory.accessCookie(accessToken).toString());
        //        response.addHeader(HttpHeaders.SET_COOKIE, cookieFactory.refreshCookie(refreshToken).toString());
        return RegisResponse;
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        // 1. get refresh token from request
        String refreshToken = null;
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("refreshToken".equals(c.getName())) {
                    refreshToken = c.getValue();
                    break;
                }
            }
        }
        // 2. extract email from refresh token
        String email = jwtService.extractEmail(refreshToken).orElse(null);
        // 3. check if email in token is null throw ex
        if (email == null) {
            throw new AppException(REFRESH_TOKEN_EXPIRED);
        }
        // 4. check if user not exist in db throw ex
        var userDetails =
                userRepository.findByEmail(email).orElseThrow(() -> new AppException(REFRESH_TOKEN_EXPIRED));
        // 5. check if token is expired or not valid throw ex
        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            throw new AppException(REFRESH_TOKEN_EXPIRED);
        }
        // 6. check if token is revoked or not throw ex
        var isTokenRevoked = tokenRepository
                .findByToken(refreshToken)
                .map(token -> !token.isRevoked())
                .orElse(false);
        if (!isTokenRevoked) {
            throw new AppException(REFRESH_TOKEN_EXPIRED);
        }
        // 6. revoke all token available of user, then generate new access token for user and save it to DB,
        revokeAllUserTokens(userDetails, false);
        var accessToken = jwtService.generateToken(userDetails, false);
        saveUserToken(userDetails, accessToken, true);
        // 7. set cookie for response
        response.addHeader(
                HttpHeaders.SET_COOKIE, cookieFactory.accessCookie(accessToken).toString());
    }

}
