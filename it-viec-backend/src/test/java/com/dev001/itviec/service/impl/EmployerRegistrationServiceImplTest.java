package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dev001.itviec.dto.request.RegisterEmployerRequest;
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
import com.dev001.itviec.service.CompanyService;
import com.dev001.itviec.service.EmailService;

@ExtendWith(MockitoExtension.class)
class EmployerRegistrationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailService emailService;

    @Mock
    private CompanyService companyService;

    @InjectMocks
    private EmployerRegistrationServiceImpl employerRegistrationService;

    @Test
    void registerEmployer_happyPath_shouldCreateUserEmployerCompanyAndSendEmail() {
        RegisterEmployerRequest request = RegisterEmployerRequest.builder()
                .fullName("  Nguyen   Van A  ")
                .jobTitle("HR Manager")
                .email("hr@company.com")
                .phoneNumber("0912345678")
                .referralSource("Google")
                .companyName("Acme Corp")
                .companyAddress("Ho Chi Minh")
                .website("https://acme.com")
                .build();

        when(userRepository.existsByEmail("hr@company.com")).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("hashed-placeholder");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId("user-1");
            return user;
        });
        when(employerRepository.save(any(Employer.class))).thenAnswer(invocation -> {
            Employer employer = invocation.getArgument(0);
            employer.setId("employer-1");
            return employer;
        });
        when(companyService.generateCompanySlug("Acme Corp")).thenReturn("acme-corp");

        employerRegistrationService.registerEmployer(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();
        assertThat(savedUser.getStatus()).isEqualTo(UserStatus.PENDING_ADMIN_REVIEW);
        assertThat(savedUser.getRole()).isEqualTo(Role.EMPLOYER);
        assertThat(savedUser.getEmail()).isEqualTo("hr@company.com");

        ArgumentCaptor<Employer> employerCaptor = ArgumentCaptor.forClass(Employer.class);
        verify(employerRepository).save(employerCaptor.capture());
        Employer savedEmployer = employerCaptor.getValue();
        assertThat(savedEmployer.getFullName()).isEqualTo("Nguyen Van A");
        assertThat(savedEmployer.getReferralSource()).isEqualTo("Google");

        ArgumentCaptor<Company> companyCaptor = ArgumentCaptor.forClass(Company.class);
        verify(companyRepository).save(companyCaptor.capture());
        Company savedCompany = companyCaptor.getValue();
        assertThat(savedCompany.getCompanyName()).isEqualTo("Acme Corp");
        assertThat(savedCompany.getSlug()).isEqualTo("acme-corp");
        assertThat(savedCompany.getAddress()).isEqualTo("Ho Chi Minh");

        verify(emailService)
                .sendHtml(
                        eq("hr@company.com"),
                        eq("[ITViec] Đăng ký nhà tuyển dụng thành công"),
                        eq("email/employer-registration-received"),
                        eq(Map.of("name", "Nguyen Van A", "companyName", "Acme Corp")));
    }

    @Test
    void registerEmployer_duplicateEmail_shouldThrowEmailExisted() {
        RegisterEmployerRequest request = RegisterEmployerRequest.builder()
                .fullName("Test User")
                .jobTitle("HR")
                .email("existing@test.com")
                .phoneNumber("0912345678")
                .companyName("Test Co")
                .companyAddress("Hanoi")
                .build();

        when(userRepository.existsByEmail("existing@test.com")).thenReturn(true);

        assertThatThrownBy(() -> employerRegistrationService.registerEmployer(request))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.EMAIL_EXISTED);
    }
}
