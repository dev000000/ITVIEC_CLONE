package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import com.dev001.itviec.entity.activation.ActivationToken;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.ActivationTokenType;
import com.dev001.itviec.enums.UserStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.repository.ActivationTokenRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.EmailService;

@ExtendWith(MockitoExtension.class)
class ActivationServiceImplTest {

    @Mock
    private ActivationTokenRepository activationTokenRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ActivationServiceImpl activationService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(activationService, "frontendBaseUrl", "http://localhost:5173");
        ReflectionTestUtils.setField(activationService, "expiryHours", 24);
        ReflectionTestUtils.setField(activationService, "employerExpiryHours", 72);
        ReflectionTestUtils.setField(activationService, "resendCooldownMinutes", 2);
    }

    @Test
    void createAndSendActivation_shouldSaveEmailVerifyToken() {
        User user = User.builder().email("seeker@test.com").build();

        activationService.createAndSendActivation(user);

        ArgumentCaptor<ActivationToken> captor = ArgumentCaptor.forClass(ActivationToken.class);
        verify(activationTokenRepository).save(captor.capture());
        ActivationToken token = captor.getValue();
        assertThat(token.getTokenType()).isEqualTo(ActivationTokenType.EMAIL_VERIFY);
        assertThat(token.isUsed()).isFalse();
        verify(emailService)
                .sendHtml(
                        eq("seeker@test.com"),
                        eq("[ITViec] Xác thực tài khoản của bạn"),
                        eq("email/activation"),
                        any(Map.class));
    }

    @Test
    void createAndSendEmployerActivation_shouldMarkOldTokensAndSendEmail() {
        User user = User.builder().email("employer@test.com").build();

        activationService.createAndSendEmployerActivation(user);

        verify(activationTokenRepository).markAllUsedByUser(user);
        ArgumentCaptor<ActivationToken> captor = ArgumentCaptor.forClass(ActivationToken.class);
        verify(activationTokenRepository).save(captor.capture());
        ActivationToken token = captor.getValue();
        assertThat(token.getTokenType()).isEqualTo(ActivationTokenType.SET_PASSWORD);
        verify(emailService)
                .sendHtml(
                        eq("employer@test.com"),
                        eq("[ITViec] Thiết lập mật khẩu tài khoản nhà tuyển dụng"),
                        eq("email/employer-activation"),
                        any(Map.class));
    }

    @Test
    void activateEmployer_validToken_shouldSetPasswordAndActivate() {
        User user = User.builder()
                .email("employer@test.com")
                .status(UserStatus.PENDING_ACTIVATION)
                .build();
        ActivationToken token = ActivationToken.builder()
                .token("valid-token")
                .tokenType(ActivationTokenType.SET_PASSWORD)
                .expiresAt(LocalDateTime.now().plusHours(1))
                .used(false)
                .user(user)
                .build();

        when(activationTokenRepository.findByTokenAndUsedFalse("valid-token")).thenReturn(Optional.of(token));
        when(passwordEncoder.encode("SecurePass123!")).thenReturn("encoded-password");

        activationService.activateEmployer("valid-token", "SecurePass123!", "SecurePass123!");

        assertThat(user.getStatus()).isEqualTo(UserStatus.ACTIVE);
        assertThat(user.getPassword()).isEqualTo("encoded-password");
        assertThat(token.isUsed()).isTrue();
        verify(userRepository).save(user);
        verify(activationTokenRepository).save(token);
    }

    @Test
    void activateEmployer_passwordMismatch_shouldThrow() {
        assertThatThrownBy(() -> activationService.activateEmployer("token", "pass1", "pass2"))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.PASSWORD_MISMATCH);

        verify(activationTokenRepository, never()).findByTokenAndUsedFalse(any());
    }

    @Test
    void activateEmployer_emailVerifyToken_shouldThrowInvalid() {
        ActivationToken token = ActivationToken.builder()
                .tokenType(ActivationTokenType.EMAIL_VERIFY)
                .expiresAt(LocalDateTime.now().plusHours(1))
                .used(false)
                .user(User.builder().build())
                .build();
        when(activationTokenRepository.findByTokenAndUsedFalse("wrong-type")).thenReturn(Optional.of(token));

        assertThatThrownBy(() -> activationService.activateEmployer("wrong-type", "pass", "pass"))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.ACTIVATION_TOKEN_INVALID);
    }

    @Test
    void activateEmployer_expiredToken_shouldThrow() {
        ActivationToken token = ActivationToken.builder()
                .tokenType(ActivationTokenType.SET_PASSWORD)
                .expiresAt(LocalDateTime.now().minusHours(1))
                .used(false)
                .user(User.builder().build())
                .build();
        when(activationTokenRepository.findByTokenAndUsedFalse("expired")).thenReturn(Optional.of(token));

        assertThatThrownBy(() -> activationService.activateEmployer("expired", "pass", "pass"))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.ACTIVATION_TOKEN_EXPIRED);
    }

    @Test
    void activateEmployer_usedToken_shouldThrowInvalid() {
        when(activationTokenRepository.findByTokenAndUsedFalse("used")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> activationService.activateEmployer("used", "pass", "pass"))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.ACTIVATION_TOKEN_INVALID);
    }
}
