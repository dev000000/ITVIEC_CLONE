package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev001.itviec.entity.activation.ActivationToken;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.ActivationTokenType;
import com.dev001.itviec.enums.UserStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.repository.ActivationTokenRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.ActivationService;
import com.dev001.itviec.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActivationServiceImpl implements ActivationService {

    private final ActivationTokenRepository activationTokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.activation.base-url:http://localhost:5173}")
    private String frontendBaseUrl;

    @Value("${app.activation.expiry-hours:24}")
    private int expiryHours;

    @Value("${app.activation.employer-expiry-hours:72}")
    private int employerExpiryHours;

    @Value("${app.activation.resend-cooldown-minutes:2}")
    private int resendCooldownMinutes;

    @Override
    @Transactional
    public void createAndSendActivation(User user) {
        String tokenValue = UUID.randomUUID().toString();

        ActivationToken activationToken = ActivationToken.builder()
                .token(tokenValue)
                .tokenType(ActivationTokenType.EMAIL_VERIFY)
                .expiresAt(LocalDateTime.now().plusHours(expiryHours))
                .used(false)
                .user(user)
                .build();
        activationTokenRepository.save(activationToken);

        String activationLink = frontendBaseUrl + "/activate?token=" + tokenValue;

        Map<String, Object> variables = Map.of(
                "name", user.getEmail(),
                "activationLink", activationLink,
                "expiryHours", expiryHours);

        emailService.sendHtml(user.getEmail(), "[ITViec] Xác thực tài khoản của bạn", "email/activation", variables);
    }

    @Override
    @Transactional
    public void activate(String token) {
        ActivationToken found = activationTokenRepository
                .findByTokenAndUsedFalse(token)
                .orElseThrow(() -> new AppException(ACTIVATION_TOKEN_INVALID));

        if (found.getTokenType() != ActivationTokenType.EMAIL_VERIFY) {
            throw new AppException(ACTIVATION_TOKEN_INVALID);
        }

        if (found.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new AppException(ACTIVATION_TOKEN_EXPIRED);
        }

        User user = found.getUser();
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        found.setUsed(true);
        activationTokenRepository.save(found);

        log.info("Account activated for user: {}", user.getEmail());
    }

    @Override
    @Transactional
    public void resendActivation(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(USER_NOT_FOUND));

        if (user.getStatus() == UserStatus.ACTIVE) {
            throw new AppException(ACCOUNT_ALREADY_ACTIVATED);
        }

        Optional<ActivationToken> latest = activationTokenRepository.findFirstByUserOrderByCreatedAtDesc(user);
        if (latest.isPresent()) {
            long minutesSince = ChronoUnit.MINUTES.between(latest.get().getCreatedAt(), LocalDateTime.now());
            if (minutesSince < resendCooldownMinutes) {
                throw new AppException(ACTIVATION_RESEND_TOO_SOON);
            }
        }

        activationTokenRepository.markAllUsedByUser(user);
        createAndSendActivation(user);

        log.info("Activation email resent to: {}", email);
    }

    @Override
    @Transactional
    public void createAndSendEmployerActivation(User user) {
        activationTokenRepository.markAllUsedByUser(user);

        String tokenValue = UUID.randomUUID().toString();

        ActivationToken activationToken = ActivationToken.builder()
                .token(tokenValue)
                .tokenType(ActivationTokenType.SET_PASSWORD)
                .expiresAt(LocalDateTime.now().plusHours(employerExpiryHours))
                .used(false)
                .user(user)
                .build();
        activationTokenRepository.save(activationToken);

        String activationLink = frontendBaseUrl + "/customer/activate?token=" + tokenValue;

        Map<String, Object> variables = Map.of(
                "name", user.getEmail(),
                "activationLink", activationLink,
                "expiryHours", employerExpiryHours);

        emailService.sendHtml(
                user.getEmail(),
                "[ITViec] Thiết lập mật khẩu tài khoản nhà tuyển dụng",
                "email/employer-activation",
                variables);
    }

    @Override
    @Transactional
    public void activateEmployer(String token, String password, String confirmPassword) {
        if (!password.equals(confirmPassword)) {
            throw new AppException(PASSWORD_MISMATCH);
        }

        ActivationToken found = activationTokenRepository
                .findByTokenAndUsedFalse(token)
                .orElseThrow(() -> new AppException(ACTIVATION_TOKEN_INVALID));

        if (found.getTokenType() != ActivationTokenType.SET_PASSWORD) {
            throw new AppException(ACTIVATION_TOKEN_INVALID);
        }

        if (found.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new AppException(ACTIVATION_TOKEN_EXPIRED);
        }

        User user = found.getUser();
        user.setPassword(passwordEncoder.encode(password));
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        found.setUsed(true);
        activationTokenRepository.save(found);

        log.info("Employer account activated for user: {}", user.getEmail());
    }
}
