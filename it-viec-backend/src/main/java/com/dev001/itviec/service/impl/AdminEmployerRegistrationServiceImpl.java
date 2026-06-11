package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.*;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev001.itviec.dto.response.EmployerRegistrationResponse;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Role;
import com.dev001.itviec.enums.UserStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.ActivationService;
import com.dev001.itviec.service.AdminEmployerRegistrationService;
import com.dev001.itviec.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminEmployerRegistrationServiceImpl implements AdminEmployerRegistrationService {

    private final UserRepository userRepository;
    private final EmployerRepository employerRepository;
    private final CompanyRepository companyRepository;
    private final ActivationService activationService;
    private final EmailService emailService;

    @Override
    @Transactional(readOnly = true)
    public List<EmployerRegistrationResponse> getPendingRegistrations() {
        List<User> pendingUsers = userRepository.findByRoleAndStatus(Role.EMPLOYER, UserStatus.PENDING_ADMIN_REVIEW);

        return pendingUsers.stream()
                .map(user -> {
                    Employer employer =
                            employerRepository.findByUser(user).orElseThrow(() -> new AppException(EMPLOYER_NOT_FOUND));
                    var company = companyRepository.findByEmployer(employer).orElse(null);

                    return EmployerRegistrationResponse.builder()
                            .userId(user.getId())
                            .email(user.getEmail())
                            .fullName(employer.getFullName())
                            .jobTitle(employer.getJobTitle())
                            .phoneNumber(employer.getPhoneNumber())
                            .referralSource(employer.getReferralSource())
                            .companyName(company != null ? company.getCompanyName() : null)
                            .companyAddress(company != null ? company.getAddress() : null)
                            .website(company != null ? company.getWebsite() : null)
                            .status(user.getStatus())
                            .createdAt(user.getCreatedAt().toString())
                            .build();
                })
                .toList();
    }

    @Override
    @Transactional
    public void approveRegistration(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(USER_NOT_FOUND));

        if (user.getStatus() != UserStatus.PENDING_ADMIN_REVIEW) {
            throw new AppException(INVALID_USER_STATUS);
        }

        user.setStatus(UserStatus.PENDING_ACTIVATION);
        userRepository.save(user);

        activationService.createAndSendEmployerActivation(user);

        log.info("Admin approved employer registration for: {}", user.getEmail());
    }

    @Override
    @Transactional
    public void rejectRegistration(String userId, String reason) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(USER_NOT_FOUND));

        if (user.getStatus() != UserStatus.PENDING_ADMIN_REVIEW) {
            throw new AppException(INVALID_USER_STATUS);
        }

        user.setStatus(UserStatus.DISABLED);
        userRepository.save(user);

        emailService.sendHtml(
                user.getEmail(),
                "[ITViec] Thông báo về đăng ký nhà tuyển dụng",
                "email/employer-registration-rejected",
                Map.of("name", user.getEmail(), "reason", reason != null ? reason : ""));

        log.info("Admin rejected employer registration for: {}", user.getEmail());
    }
}
