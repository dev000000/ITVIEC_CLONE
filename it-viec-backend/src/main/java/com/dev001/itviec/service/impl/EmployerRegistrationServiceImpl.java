package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.*;

import java.util.Map;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev001.itviec.dto.request.RegisterEmployerRequest;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Role;
import com.dev001.itviec.enums.UserStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.CompanyService;
import com.dev001.itviec.service.EmailService;
import com.dev001.itviec.service.EmployerRegistrationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmployerRegistrationServiceImpl implements EmployerRegistrationService {

    private final UserRepository userRepository;
    private final EmployerRepository employerRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final CompanyService companyService;

    @Override
    @Transactional
    public void registerEmployer(RegisterEmployerRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(EMAIL_EXISTED);
        }

        String placeholderPassword = passwordEncoder.encode(UUID.randomUUID().toString());

        User user = User.builder()
                .email(request.getEmail())
                .password(placeholderPassword)
                .role(Role.EMPLOYER)
                .status(UserStatus.PENDING_ADMIN_REVIEW)
                .build();
        User savedUser = userRepository.save(user);

        String normalizedFullName = request.getFullName().trim().replaceAll("\\s+", " ");
        Employer employer = Employer.builder()
                .user(savedUser)
                .fullName(normalizedFullName)
                .jobTitle(request.getJobTitle())
                .phoneNumber(request.getPhoneNumber())
                .referralSource(request.getReferralSource())
                .build();
        Employer savedEmployer = employerRepository.save(employer);

        String slug = companyService.generateCompanySlug(request.getCompanyName());
        Company company = Company.builder()
                .employer(savedEmployer)
                .companyName(request.getCompanyName())
                .slug(slug)
                .address(request.getCompanyAddress())
                .website(request.getWebsite())
                .build();
        companyRepository.save(company);

        emailService.sendHtml(
                savedUser.getEmail(),
                "[ITViec] Đăng ký nhà tuyển dụng thành công",
                "email/employer-registration-received",
                Map.of("name", normalizedFullName, "companyName", request.getCompanyName()));

        log.info("Employer registration submitted for: {}", savedUser.getEmail());
    }
}
