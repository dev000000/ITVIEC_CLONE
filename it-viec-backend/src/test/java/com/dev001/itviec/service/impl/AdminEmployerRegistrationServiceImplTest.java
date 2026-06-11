package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dev001.itviec.dto.response.EmployerRegistrationResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Role;
import com.dev001.itviec.enums.UserStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.ActivationService;
import com.dev001.itviec.service.EmailService;

@ExtendWith(MockitoExtension.class)
class AdminEmployerRegistrationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private ActivationService activationService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AdminEmployerRegistrationServiceImpl adminEmployerRegistrationService;

    @Test
    void getPendingRegistrations_shouldMapToResponse() {
        User user = User.builder()
                .id("user-1")
                .email("hr@acme.com")
                .role(Role.EMPLOYER)
                .status(UserStatus.PENDING_ADMIN_REVIEW)
                .build();
        user.setCreatedAt(LocalDateTime.of(2026, 6, 1, 10, 0));
        Employer employer = Employer.builder()
                .fullName("Jane Doe")
                .jobTitle("HR Lead")
                .phoneNumber("0912345678")
                .referralSource("LinkedIn")
                .user(user)
                .build();
        Company company = Company.builder()
                .companyName("Acme")
                .address("HCM")
                .website("https://acme.com")
                .build();

        when(userRepository.findByRoleAndStatus(Role.EMPLOYER, UserStatus.PENDING_ADMIN_REVIEW))
                .thenReturn(List.of(user));
        when(employerRepository.findByUser(user)).thenReturn(Optional.of(employer));
        when(companyRepository.findByEmployer(employer)).thenReturn(Optional.of(company));

        List<EmployerRegistrationResponse> result = adminEmployerRegistrationService.getPendingRegistrations();

        assertThat(result).hasSize(1);
        EmployerRegistrationResponse response = result.get(0);
        assertThat(response.getUserId()).isEqualTo("user-1");
        assertThat(response.getEmail()).isEqualTo("hr@acme.com");
        assertThat(response.getFullName()).isEqualTo("Jane Doe");
        assertThat(response.getCompanyName()).isEqualTo("Acme");
        assertThat(response.getReferralSource()).isEqualTo("LinkedIn");
    }

    @Test
    void approveRegistration_happyPath_shouldTransitionAndSendActivation() {
        User user = User.builder()
                .id("user-1")
                .email("hr@acme.com")
                .status(UserStatus.PENDING_ADMIN_REVIEW)
                .build();
        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));

        adminEmployerRegistrationService.approveRegistration("user-1");

        assertThat(user.getStatus()).isEqualTo(UserStatus.PENDING_ACTIVATION);
        verify(userRepository).save(user);
        verify(activationService).createAndSendEmployerActivation(user);
    }

    @Test
    void approveRegistration_wrongStatus_shouldThrow() {
        User user = User.builder().id("user-1").status(UserStatus.ACTIVE).build();
        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> adminEmployerRegistrationService.approveRegistration("user-1"))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.INVALID_USER_STATUS);
    }

    @Test
    void rejectRegistration_happyPath_shouldDisableAndSendEmail() {
        User user = User.builder()
                .id("user-1")
                .email("hr@acme.com")
                .status(UserStatus.PENDING_ADMIN_REVIEW)
                .build();
        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));

        adminEmployerRegistrationService.rejectRegistration("user-1", "Invalid company info");

        assertThat(user.getStatus()).isEqualTo(UserStatus.DISABLED);
        verify(userRepository).save(user);
        verify(emailService)
                .sendHtml(
                        eq("hr@acme.com"),
                        eq("[ITViec] Thông báo về đăng ký nhà tuyển dụng"),
                        eq("email/employer-registration-rejected"),
                        eq(Map.of("name", "hr@acme.com", "reason", "Invalid company info")));
    }

    @Test
    void rejectRegistration_wrongStatus_shouldThrow() {
        User user = User.builder().id("user-1").status(UserStatus.DISABLED).build();
        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> adminEmployerRegistrationService.rejectRegistration("user-1", null))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.INVALID_USER_STATUS);
    }
}
