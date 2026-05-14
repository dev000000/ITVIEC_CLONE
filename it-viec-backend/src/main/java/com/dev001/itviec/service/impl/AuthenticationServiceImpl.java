package com.dev001.itviec.service.impl;

import com.dev001.itviec.configuration.CookieFactory;
import com.dev001.itviec.configuration.JwtService;
import com.dev001.itviec.dto.request.AuthenticationRequest;
import com.dev001.itviec.dto.request.RegisterUserSeekerRequest;
import com.dev001.itviec.dto.response.AuthenticationResponse;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.token.Token;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Role;
import com.dev001.itviec.enums.UserStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.mapper.UserMapper;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.repository.TokenRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.dev001.itviec.enums.TokenType.BEARER;
import static com.dev001.itviec.exception.ErrorCode.*;

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
    private final SeekerRepository seekerRepository;

    // Method xác thực khi đăng nhập bằng form login
    @Override
    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
        // 1. Xác thực email và password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        // 2. Check user có tồn tại trong DB không
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new AppException(USER_NOT_FOUND));

        // 3. revoke toàn bộ token của user trong DB ( nếu có ) trước khi cấp token mới, tránh trường hợp user đăng nhập
        // ở nhiều nơi cùng lúc
        revokeAllUserTokens(user, true);

        // 4. tạo accesstoken và refresh token cho user
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
        return AuthenticationResponse.builder()
                .authenticated(true)
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .build();
    }

    // Method lấy current user dựa trên https only cookie ( không phải đăng nhập )
    @Override
    public AuthenticationResponse getCurrentUser() {
        // 1. lấy email từ SecurityContext (do JwtAuthenticationFilter set)
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(UNAUTHENTICATED);
        }
        String email = authentication.getName();

        // 2. tìm user trong DB theo email
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(USER_NOT_FOUND));

        // 3. trả về AuthenticationResponse
        return AuthenticationResponse.builder()
                .authenticated(true)
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .build();
    }

    // Method triển khai việc revoke toàn bộ token của user, nếu isRevokeRefreshToken = true thì sẽ revoke cả access
    // token và refresh token, ngược lại chỉ revoke access token
    private void revokeAllUserTokens(User user, boolean isRevokeRefreshToken) {
        var validUserTokens = isRevokeRefreshToken
                ? tokenRepository.findByUserAndRevokedFalse(user)
                : tokenRepository.findByUserAndRevokedFalseAndAccessTokenTrue(user);
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token -> token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    // Method lưu token vào database
    private void saveUserToken(User user, String token, boolean isAccessToken) {
        var savedToken = Token.builder()
                .user(user)
                .token(token)
                .tokenType(BEARER)
                .accessToken(isAccessToken)
                .expiryTime(jwtService.extractExpiration(token))
                .revoked(false)
                .build();
        tokenRepository.save(savedToken);
    }

    @Override
    @Transactional
    public void registerUserSeeker(RegisterUserSeekerRequest request, HttpServletResponse response) {
        // 1. kiếm tra email đã tồn tại chưa
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(EMAIL_EXISTED);
        }
        // 2. kiểm tra họ và tên đã tồn tại chưa
        if (seekerRepository.existsByFullNameIgnoreCase(request.getFullName())) {
            throw new AppException(FULL_NAME_EXISTED);
        }
        // 4. Hash password trước khi save vào DB
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // 5. Tạo đối tượng User từ request và set các trường cần thiết
        User user = User.builder()
                .email(request.getEmail())
                .password(hashedPassword)
                .role(Role.SEEKER)
                .status(UserStatus.ACTIVE)
                .build();
        User savedUser = userRepository.save(user);

        // 6.Normalize fullName trước khi save vào DB: loại bỏ khoảng trắng thừa, chuyển nhiều khoảng trắng thành 1
        // khoảng trắng
        String normalizedFullName = request.getFullName().trim().replaceAll("\\s+", " ");
        // 7. Tạo đối tượng Seeker
        Seeker seeker =
                Seeker.builder().user(savedUser).fullName(normalizedFullName).build();
        // 8. Save Seeker vào DB
        seekerRepository.save(seeker);
    }

    @Override
    @Transactional
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {

        // 1. Lấy refresh token từ cookie
        String refreshToken = null;
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("refreshToken".equals(c.getName())) {
                    refreshToken = c.getValue();
                    break;
                }
            }
        }
        // 2. Check xem user có tồn tại trong database chưa
        String email = jwtService.extractEmail(refreshToken).orElse(null);
        if (email == null) {
            throw new AppException(REFRESH_TOKEN_EXPIRED);
        }
        var userDetails = userRepository.findByEmail(email).orElseThrow(() -> new AppException(REFRESH_TOKEN_EXPIRED));

        // 3. kiểm tra refresh token có hợp lệ không
        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            throw new AppException(REFRESH_TOKEN_EXPIRED);
        }

        // 4. kiểm tra token đã bị revoke chưa ( trường hợp user logout nhưng refresh token vẫn còn trong cookie )
        Token token = tokenRepository
                .findByTokenAndRevokedFalse(refreshToken)
                .orElseThrow(() -> new AppException(REFRESH_TOKEN_EXPIRED));

        // 5. revoke toàn bộ access token của user
        revokeAllUserTokens(userDetails, false);

        // 6. tạo access token mới và lưu vào database
        var accessToken = jwtService.generateToken(userDetails, false);
        saveUserToken(userDetails, accessToken, true);

        // 7. set cookie cho access token mới
        response.addHeader(
                HttpHeaders.SET_COOKIE, cookieFactory.accessCookie(accessToken).toString());
    }
}
