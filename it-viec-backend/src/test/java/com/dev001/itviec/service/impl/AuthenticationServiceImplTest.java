package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;

import jakarta.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dev001.itviec.configuration.CookieFactory;
import com.dev001.itviec.configuration.JwtService;
import com.dev001.itviec.dto.request.AuthenticationRequest;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Role;
import com.dev001.itviec.enums.UserStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.UserMapper;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.repository.TokenRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.ActivationService;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private TokenRepository tokenRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private CookieFactory cookieFactory;

    @Mock
    private SeekerRepository seekerRepository;

    @Mock
    private ActivationService activationService;

    @Mock
    private HttpServletResponse response;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @Test
    void authenticate_pendingAdminReview_shouldThrow() {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("employer@test.com");
        request.setPassword("pass");
        User user = User.builder()
                .email("employer@test.com")
                .status(UserStatus.PENDING_ADMIN_REVIEW)
                .role(Role.EMPLOYER)
                .build();

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        when(userRepository.findByEmail("employer@test.com")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> authenticationService.authenticate(request, response))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.ACCOUNT_PENDING_ADMIN_REVIEW);
    }
}
