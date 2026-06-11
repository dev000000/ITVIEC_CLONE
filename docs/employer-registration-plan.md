# Employer Registration with Admin Verification

## Summary

Implement a two-phase employer registration flow where a company representative submits a registration form, the account enters a **PENDING_ADMIN_REVIEW** state, an admin manually verifies the company, and then the system sends a password-setup activation link. This mirrors how Indeed, LinkedIn, and Glassdoor handle employer onboarding — preventing spam/fake company accounts while providing a professional employer experience.

**Key architectural decisions:**

1. New `UserStatus.PENDING_ADMIN_REVIEW` — distinguishes employer-pending (waiting for admin) from seeker-pending (waiting for email click).
2. `ActivationToken.tokenType` enum (`EMAIL_VERIFY` | `SET_PASSWORD`) — reuses the existing token table with a type discriminator so seeker activation and employer password-setup share infrastructure but have distinct logic.
3. Placeholder BCrypt password at registration — satisfies the `users.password NOT NULL` constraint; replaced when the employer sets their real password via the activation link.
4. `employers.referral_source` — new nullable column for the "where did you hear about ITviec" field.
5. Company address at registration: stored as city name string in `companies.address` (from cities API dropdown); full address editing happens later in the company profile.

---

## Business Flow Comparison

### Industry standard (Indeed / LinkedIn / Glassdoor)

| Step | Indeed | LinkedIn | Glassdoor |
|------|--------|----------|-----------|
| 1. Submit form | Company details + work email | Work email + company page claim | Company email verification |
| 2. Verification | Manual review (1–3 business days) | Automated domain check + manual | Email domain + manual |
| 3. Account activation | Email with password setup link | Immediate (after verify) | Email confirmation |
| 4. Profile gate | Must complete company page before posting | Must have company page | Must verify company |
| 5. Rejection | Email notification | Denied claim → support | Email notification |

### Our implementation

| Step | Flow | Status |
|------|------|--------|
| 1. Submit registration form | `POST /api/v1/auth/register/employers` | `PENDING_ADMIN_REVIEW` |
| 2. Thank-you email | Automatic — "your application is being reviewed" | — |
| 3. Admin reviews | Admin panel → search/verify company → approve/reject | — |
| 4. Approval → activation email | `POST /api/v1/admin/employer-registrations/{userId}/approve` | `PENDING_ACTIVATION` |
| 5. Set password | Employer clicks link → `/employer/activate?token=xxx` → enters password | `ACTIVE` |
| 6. Profile gate | Banner on employer dashboard: "Complete your company profile to post jobs" | — |

**Differences from seeker flow:**
- Seeker: register → `PENDING_ACTIVATION` → click email link (verify email) → `ACTIVE`
- Employer: register → `PENDING_ADMIN_REVIEW` → admin approves → `PENDING_ACTIVATION` → click email link (set password) → `ACTIVE`

---

## Open Questions / Assumptions

| # | Question | Assumed answer | Impact |
|---|----------|----------------|--------|
| 1 | Should rejected employers be notified by email? | **Yes** — send a rejection email with generic reason | Need rejection email template |
| 2 | Can a rejected employer re-register with the same email? | **No** — status stays `DISABLED`; they must contact support | Simplifies logic |
| 3 | Should `PENDING_ADMIN_REVIEW` users be able to log in? | **No** — blocked at login like `PENDING_ACTIVATION` | Add check in `authenticate()` |
| 4 | How long is the password-setup link valid? | **72 hours** (longer than seeker's 24h because admin review adds delay) | Configurable via `app.activation.employer-expiry-hours` |
| 5 | What constitutes "complete company profile" for the banner? | At least: `companyModel`, `industry`, `companySize`, `country`, `companyIntroduction` are non-null | Check in `CompanyProfileStatusResponse` |
| 6 | Should the registration form email be validated as a work email (no gmail/yahoo)? | **Not for MVP** — can add later | Skip for now |
| 7 | Does the referral source field map to a fixed enum or free text? | **Fixed dropdown** (same as `ContactEmployerForm.listItem`) stored as `VARCHAR(100)` | No enum needed in backend |
| 8 | What MySQL ENUM value should be added for `PENDING_ADMIN_REVIEW`? | Alter the `users.status` column to add the new enum value | SQL migration required |

---

## Backend

### 1. SQL Migration

**File:** `src/main/resources/db/migration/V2__employer_registration.sql` (or append to `schema.sql` for dev)

```sql
-- 1. Add PENDING_ADMIN_REVIEW to users.status enum
ALTER TABLE users MODIFY COLUMN status 
  ENUM('PENDING_ACTIVATION', 'ACTIVE', 'DISABLED', 'PENDING_ADMIN_REVIEW') 
  DEFAULT 'PENDING_ACTIVATION';

-- 2. Add token_type to activation_tokens
ALTER TABLE activation_tokens 
  ADD COLUMN token_type ENUM('EMAIL_VERIFY', 'SET_PASSWORD') 
  NOT NULL DEFAULT 'EMAIL_VERIFY' 
  AFTER token;

-- 3. Add referral_source to employers
ALTER TABLE employers 
  ADD COLUMN referral_source VARCHAR(100) NULL 
  AFTER phone_number;
```

### 2. Enum Changes

#### `UserStatus.java`
**File:** `src/main/java/com/dev001/itviec/enums/UserStatus.java`

```java
public enum UserStatus {
    PENDING_ACTIVATION("Pending Activation"),
    PENDING_ADMIN_REVIEW("Pending Admin Review"),  // NEW
    ACTIVE("Active"),
    DISABLED("Disabled");
    // ... existing constructor
}
```

#### New: `ActivationTokenType.java`
**File:** `src/main/java/com/dev001/itviec/enums/ActivationTokenType.java`

```java
package com.dev001.itviec.enums;

public enum ActivationTokenType {
    EMAIL_VERIFY,     // seeker email verification (existing flow)
    SET_PASSWORD      // employer password setup after admin approval
}
```

### 3. Entity Changes

#### `ActivationToken.java` — add `tokenType` field
**File:** `src/main/java/com/dev001/itviec/entity/activation/ActivationToken.java`

Add after `String token`:

```java
@Enumerated(EnumType.STRING)
@Column(name = "token_type", nullable = false)
@Builder.Default
ActivationTokenType tokenType = ActivationTokenType.EMAIL_VERIFY;
```

#### `Employer.java` — add `referralSource` field
**File:** `src/main/java/com/dev001/itviec/entity/employer/Employer.java`

Add after `String phoneNumber`:

```java
@Column(name = "referral_source", columnDefinition = "VARCHAR(100)")
String referralSource;
```

### 4. DTOs

#### New: `RegisterEmployerRequest.java`
**File:** `src/main/java/com/dev001/itviec/dto/request/RegisterEmployerRequest.java`

```java
package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterEmployerRequest {

    // --- Personal info ---
    @NotBlank(message = "FULL_NAME_REQUIRED")
    @Size(min = 2, max = 50, message = "FULL_NAME_SIZE")
    String fullName;

    @NotBlank(message = "JOB_TITLE_REQUIRED")
    String jobTitle;

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID")
    String email;

    @NotBlank(message = "PHONE_NUMBER_REQUIRED")
    @Size(min = 9, max = 10, message = "PHONE_NUMBER_SIZE")
    String phoneNumber;

    String referralSource;  // nullable — "where did you hear about ITviec"

    // --- Company info ---
    @NotBlank(message = "COMPANY_NAME_REQUIRED")
    String companyName;

    @NotBlank(message = "ADDRESS_REQUIRED")
    String companyAddress;  // city name from dropdown

    String website;         // optional
}
```

#### New: `EmployerActivateRequest.java`
**File:** `src/main/java/com/dev001/itviec/dto/request/EmployerActivateRequest.java`

```java
package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.NotBlank;
import com.dev001.itviec.validator.PasswordConstraint;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployerActivateRequest {

    @NotBlank(message = "ACTIVATION_TOKEN_INVALID")
    String token;

    @NotBlank(message = "PASSWORD_REQUIRED")
    @PasswordConstraint
    String password;

    @NotBlank(message = "PASSWORD_REQUIRED")
    String confirmPassword;
}
```

#### New: `EmployerRegistrationResponse.java`
**File:** `src/main/java/com/dev001/itviec/dto/response/EmployerRegistrationResponse.java`

```java
package com.dev001.itviec.dto.response;

import com.dev001.itviec.enums.UserStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployerRegistrationResponse {
    String userId;
    String email;
    String fullName;
    String jobTitle;
    String phoneNumber;
    String referralSource;
    String companyName;
    String companyAddress;
    String website;
    UserStatus status;
    String createdAt;
}
```

#### New: `CompanyProfileStatusResponse.java`
**File:** `src/main/java/com/dev001/itviec/dto/response/CompanyProfileStatusResponse.java`

```java
package com.dev001.itviec.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.List;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyProfileStatusResponse {
    boolean complete;
    List<String> missingFields; // e.g. ["companyModel", "industry", "companySize"]
}
```

### 5. Repository Changes

#### `UserRepository.java` — add query methods
**File:** `src/main/java/com/dev001/itviec/repository/UserRepository.java`

Add:

```java
Page<User> findByRoleAndStatus(Role role, UserStatus status, Pageable pageable);

List<User> findByRoleAndStatus(Role role, UserStatus status);
```

### 6. Service Layer

#### `AuthenticationService.java` — add method signature
**File:** `src/main/java/com/dev001/itviec/service/AuthenticationService.java`

Add:

```java
void registerEmployer(RegisterEmployerRequest request);
```

#### `AuthenticationServiceImpl.java` — implement `registerEmployer`
**File:** `src/main/java/com/dev001/itviec/service/impl/AuthenticationServiceImpl.java`

New dependencies to inject:

```java
private final EmployerRepository employerRepository;
private final CompanyRepository companyRepository;
```

New method:

```java
@Override
@Transactional
public void registerEmployer(RegisterEmployerRequest request) {
    // 1. Check email uniqueness
    if (userRepository.existsByEmail(request.getEmail())) {
        throw new AppException(EMAIL_EXISTED);
    }

    // 2. Generate placeholder password (random UUID, BCrypt-encoded)
    String placeholderPassword = passwordEncoder.encode(UUID.randomUUID().toString());

    // 3. Create User with PENDING_ADMIN_REVIEW
    User user = User.builder()
            .email(request.getEmail())
            .password(placeholderPassword)
            .role(Role.EMPLOYER)
            .status(UserStatus.PENDING_ADMIN_REVIEW)
            .build();
    User savedUser = userRepository.save(user);

    // 4. Create Employer record
    String normalizedFullName = request.getFullName().trim().replaceAll("\\s+", " ");
    Employer employer = Employer.builder()
            .user(savedUser)
            .fullName(normalizedFullName)
            .jobTitle(request.getJobTitle())
            .phoneNumber(request.getPhoneNumber())
            .referralSource(request.getReferralSource())
            .build();
    Employer savedEmployer = employerRepository.save(employer);

    // 5. Create Company stub with registration data
    String slug = Slugify.builder().build()
            .slugify(request.getCompanyName()); // or manual slug
    Company company = Company.builder()
            .employer(savedEmployer)
            .companyName(request.getCompanyName())
            .slug(slug)
            .address(request.getCompanyAddress())
            .website(request.getWebsite())
            .build();
    companyRepository.save(company);

    // 6. Send "thank you, wait for admin review" email (NO activation link)
    emailService.sendHtml(
            savedUser.getEmail(),
            "[ITViec] Đăng ký nhà tuyển dụng thành công",
            "email/employer-registration-pending",
            Map.of(
                "name", normalizedFullName,
                "companyName", request.getCompanyName()
            )
    );
}
```

Update `authenticate()` — add PENDING_ADMIN_REVIEW block:

```java
// After existing PENDING_ACTIVATION check:
if (user.getStatus() == UserStatus.PENDING_ADMIN_REVIEW) {
    throw new AppException(ACCOUNT_PENDING_ADMIN_REVIEW);
}
```

#### `ActivationService.java` — add employer activation methods
**File:** `src/main/java/com/dev001/itviec/service/ActivationService.java`

Add:

```java
void createAndSendEmployerActivation(User user);

void activateEmployer(String token, String password, String confirmPassword);
```

#### `ActivationServiceImpl.java` — implement employer methods
**File:** `src/main/java/com/dev001/itviec/service/impl/ActivationServiceImpl.java`

New dependency:

```java
private final PasswordEncoder passwordEncoder;

@Value("${app.activation.employer-expiry-hours:72}")
private int employerExpiryHours;
```

New methods:

```java
@Override
@Transactional
public void createAndSendEmployerActivation(User user) {
    // Mark any old tokens for this user as used
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

    String activationLink = frontendBaseUrl + "/employer/activate?token=" + tokenValue;

    Map<String, Object> variables = Map.of(
            "name", user.getEmail(),
            "activationLink", activationLink,
            "expiryHours", employerExpiryHours
    );
    emailService.sendHtml(
            user.getEmail(),
            "[ITViec] Thiết lập mật khẩu tài khoản nhà tuyển dụng",
            "email/employer-activation",
            variables
    );
}

@Override
@Transactional
public void activateEmployer(String token, String password, String confirmPassword) {
    // 1. Validate passwords match
    if (!password.equals(confirmPassword)) {
        throw new AppException(PASSWORD_MISMATCH);
    }

    // 2. Find valid SET_PASSWORD token
    ActivationToken found = activationTokenRepository
            .findByTokenAndUsedFalse(token)
            .orElseThrow(() -> new AppException(ACTIVATION_TOKEN_INVALID));

    if (found.getTokenType() != ActivationTokenType.SET_PASSWORD) {
        throw new AppException(ACTIVATION_TOKEN_INVALID);
    }

    if (found.getExpiresAt().isBefore(LocalDateTime.now())) {
        throw new AppException(ACTIVATION_TOKEN_EXPIRED);
    }

    // 3. Set real password and activate
    User user = found.getUser();
    user.setPassword(passwordEncoder.encode(password));
    user.setStatus(UserStatus.ACTIVE);
    userRepository.save(user);

    // 4. Mark token as used
    found.setUsed(true);
    activationTokenRepository.save(found);

    log.info("Employer account activated for user: {}", user.getEmail());
}
```

#### New: `AdminEmployerRegistrationService.java`
**File:** `src/main/java/com/dev001/itviec/service/AdminEmployerRegistrationService.java`

```java
package com.dev001.itviec.service;

import com.dev001.itviec.dto.response.EmployerRegistrationResponse;
import java.util.List;

public interface AdminEmployerRegistrationService {
    List<EmployerRegistrationResponse> getPendingRegistrations();
    void approveRegistration(String userId);
    void rejectRegistration(String userId, String reason);
}
```

#### New: `AdminEmployerRegistrationServiceImpl.java`
**File:** `src/main/java/com/dev001/itviec/service/impl/AdminEmployerRegistrationServiceImpl.java`

```java
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
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.CompanyRepository;
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
    public List<EmployerRegistrationResponse> getPendingRegistrations() {
        List<User> pendingUsers = userRepository.findByRoleAndStatus(
                Role.EMPLOYER, UserStatus.PENDING_ADMIN_REVIEW);

        return pendingUsers.stream().map(user -> {
            Employer employer = employerRepository.findByUser(user)
                    .orElseThrow(() -> new AppException(EMPLOYER_NOT_FOUND));
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
        }).toList();
    }

    @Override
    @Transactional
    public void approveRegistration(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(USER_NOT_FOUND));

        if (user.getStatus() != UserStatus.PENDING_ADMIN_REVIEW) {
            throw new AppException(INVALID_USER_STATUS);
        }

        // Transition: PENDING_ADMIN_REVIEW → PENDING_ACTIVATION
        user.setStatus(UserStatus.PENDING_ACTIVATION);
        userRepository.save(user);

        // Send activation email with SET_PASSWORD token
        activationService.createAndSendEmployerActivation(user);

        log.info("Admin approved employer registration for: {}", user.getEmail());
    }

    @Override
    @Transactional
    public void rejectRegistration(String userId, String reason) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(USER_NOT_FOUND));

        if (user.getStatus() != UserStatus.PENDING_ADMIN_REVIEW) {
            throw new AppException(INVALID_USER_STATUS);
        }

        user.setStatus(UserStatus.DISABLED);
        userRepository.save(user);

        // Send rejection email
        emailService.sendHtml(
                user.getEmail(),
                "[ITViec] Thông báo về đăng ký nhà tuyển dụng",
                "email/employer-registration-rejected",
                Map.of("name", user.getEmail(), "reason", reason != null ? reason : "")
        );

        log.info("Admin rejected employer registration for: {}", user.getEmail());
    }
}
```

#### New: `CompanyProfileService` method (or add to existing `CompanyService`)
**File:** Add to existing `CompanyServiceImpl.java`

```java
public CompanyProfileStatusResponse getCompanyProfileStatus(User currentUser) {
    Employer employer = employerRepository.findByUser(currentUser)
            .orElseThrow(() -> new AppException(EMPLOYER_NOT_FOUND));
    Company company = companyRepository.findByEmployer(employer)
            .orElseThrow(() -> new AppException(COMPANY_NOT_FOUND_BY_EMPLOYER));

    List<String> missing = new ArrayList<>();
    if (company.getCompanyModel() == null) missing.add("companyModel");
    if (company.getIndustry() == null || company.getIndustry().isBlank()) missing.add("industry");
    if (company.getCompanySize() == null) missing.add("companySize");
    if (company.getCountry() == null) missing.add("country");
    if (company.getCompanyIntroduction() == null || company.getCompanyIntroduction().isBlank())
        missing.add("companyIntroduction");

    return CompanyProfileStatusResponse.builder()
            .complete(missing.isEmpty())
            .missingFields(missing)
            .build();
}
```

### 7. Controllers

#### Update `AuthController` (or create route in existing auth controller)
**File:** Existing auth controller or `ActivationController.java`

Add endpoint:

```java
@PostMapping("/register/employers")
public ApiResponse<String> registerEmployer(
        @RequestBody @Valid RegisterEmployerRequest request) {
    authenticationService.registerEmployer(request);
    return ApiResponse.<String>builder()
            .code(1000)
            .result("Employer registration submitted successfully")
            .build();
}

@PostMapping("/activate-employer")
public ApiResponse<String> activateEmployer(
        @RequestBody @Valid EmployerActivateRequest request) {
    activationService.activateEmployer(
            request.getToken(), request.getPassword(), request.getConfirmPassword());
    return ApiResponse.<String>builder()
            .code(1000)
            .result("Employer account activated successfully")
            .build();
}
```

#### New: `AdminEmployerRegistrationController.java`
**File:** `src/main/java/com/dev001/itviec/controller/AdminEmployerRegistrationController.java`

```java
package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.EmployerRegistrationResponse;
import com.dev001.itviec.service.AdminEmployerRegistrationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/employer-registrations")
@PreAuthorize("hasRole('ADMIN')")
public class AdminEmployerRegistrationController {

    private final AdminEmployerRegistrationService service;

    @GetMapping
    public ApiResponse<List<EmployerRegistrationResponse>> getPendingRegistrations() {
        return ApiResponse.<List<EmployerRegistrationResponse>>builder()
                .code(1000)
                .result(service.getPendingRegistrations())
                .build();
    }

    @PostMapping("/{userId}/approve")
    public ApiResponse<String> approve(@PathVariable String userId) {
        service.approveRegistration(userId);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Employer registration approved")
                .build();
    }

    @PostMapping("/{userId}/reject")
    public ApiResponse<String> reject(
            @PathVariable String userId,
            @RequestParam(required = false) String reason) {
        service.rejectRegistration(userId, reason);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Employer registration rejected")
                .build();
    }
}
```

#### Add to existing `CompanyController` or `EmployerController`

```java
@GetMapping("/me/company-profile-status")
public ApiResponse<CompanyProfileStatusResponse> getProfileStatus() {
    User currentUser = getCurrentUser(); // from SecurityContext
    return ApiResponse.<CompanyProfileStatusResponse>builder()
            .code(1000)
            .result(companyService.getCompanyProfileStatus(currentUser))
            .build();
}
```

### 8. Error Codes

**File:** `src/main/java/com/dev001/itviec/exception/ErrorCode.java`

Add after `ACCOUNT_DISABLED(1108, ...)`:

```java
ACCOUNT_PENDING_ADMIN_REVIEW(1109, "Account is pending admin review", HttpStatus.FORBIDDEN),
PASSWORD_MISMATCH(1110, "Passwords do not match", HttpStatus.BAD_REQUEST),
EMPLOYER_REGISTRATION_ALREADY_EXISTS(1111, "Employer registration already exists for this email", HttpStatus.BAD_REQUEST),
```

### 9. Security Config

**File:** `src/main/java/com/dev001/itviec/configuration/SecurityConfig.java`

Add to the public endpoint chain (after existing `.permitAll()` entries):

```java
.requestMatchers(HttpMethod.POST, "/api/v1/auth/register/employers")
.permitAll()
.requestMatchers(HttpMethod.POST, "/api/v1/auth/activate-employer")
.permitAll()
```

Admin endpoints (`/api/v1/admin/**`) are already protected by `.anyRequest().authenticated()` + `@PreAuthorize("hasRole('ADMIN')")` on the controller.

### 10. Email Templates

#### `email/employer-registration-pending.html`
**File:** `src/main/resources/templates/email/employer-registration-pending.html`

Thymeleaf template with variables: `name`, `companyName`.

Content:
- Subject: `[ITViec] Đăng ký nhà tuyển dụng thành công`
- Body: "Xin chào {name}, cảm ơn bạn đã đăng ký tài khoản nhà tuyển dụng cho {companyName}. Đội ngũ ITViec sẽ xem xét và xác minh thông tin công ty trong 1-3 ngày làm việc. Chúng tôi sẽ gửi email thông báo khi quá trình xác minh hoàn tất."
- No CTA button (no activation link at this stage)

#### `email/employer-activation.html`
**File:** `src/main/resources/templates/email/employer-activation.html`

Thymeleaf template with variables: `name`, `activationLink`, `expiryHours`.

Content:
- Subject: `[ITViec] Thiết lập mật khẩu tài khoản nhà tuyển dụng`
- Body: "Tài khoản nhà tuyển dụng của bạn đã được phê duyệt! Nhấn nút bên dưới để thiết lập mật khẩu."
- CTA button: "Thiết lập mật khẩu" → `activationLink`
- Footer: "Link có hiệu lực trong {expiryHours} giờ"

#### `email/employer-registration-rejected.html`
**File:** `src/main/resources/templates/email/employer-registration-rejected.html`

Thymeleaf template with variables: `name`, `reason`.

Content:
- Subject: `[ITViec] Thông báo về đăng ký nhà tuyển dụng`
- Body: "Rất tiếc, đăng ký nhà tuyển dụng của bạn chưa được phê duyệt. {reason}. Vui lòng liên hệ support@itviec.com."

### 11. Application Config

**File:** `application-dev.yaml`

```yaml
app:
  activation:
    employer-expiry-hours: 72
```

### 12. Backend File Summary

| Action | File | Notes |
|--------|------|-------|
| **EDIT** | `enums/UserStatus.java` | Add `PENDING_ADMIN_REVIEW` |
| **NEW** | `enums/ActivationTokenType.java` | `EMAIL_VERIFY`, `SET_PASSWORD` |
| **EDIT** | `entity/activation/ActivationToken.java` | Add `tokenType` field |
| **EDIT** | `entity/employer/Employer.java` | Add `referralSource` field |
| **NEW** | `dto/request/RegisterEmployerRequest.java` | Registration form DTO |
| **NEW** | `dto/request/EmployerActivateRequest.java` | Password setup DTO |
| **NEW** | `dto/response/EmployerRegistrationResponse.java` | Admin list response |
| **NEW** | `dto/response/CompanyProfileStatusResponse.java` | Profile completeness |
| **EDIT** | `repository/UserRepository.java` | Add `findByRoleAndStatus` |
| **EDIT** | `service/AuthenticationService.java` | Add `registerEmployer` signature |
| **EDIT** | `service/impl/AuthenticationServiceImpl.java` | Implement `registerEmployer`, add `PENDING_ADMIN_REVIEW` login block |
| **EDIT** | `service/ActivationService.java` | Add employer activation signatures |
| **EDIT** | `service/impl/ActivationServiceImpl.java` | Implement `createAndSendEmployerActivation`, `activateEmployer` |
| **NEW** | `service/AdminEmployerRegistrationService.java` | Interface |
| **NEW** | `service/impl/AdminEmployerRegistrationServiceImpl.java` | Approve/reject logic |
| **EDIT** | Controller (auth) | Add `POST /register/employers`, `POST /activate-employer` |
| **NEW** | `controller/AdminEmployerRegistrationController.java` | Admin endpoints |
| **EDIT** | `CompanyService` / controller | Add `/me/company-profile-status` |
| **EDIT** | `exception/ErrorCode.java` | Add 3 new error codes |
| **EDIT** | `configuration/SecurityConfig.java` | Add 2 public endpoints |
| **NEW** | `templates/email/employer-registration-pending.html` | Thank-you email |
| **NEW** | `templates/email/employer-activation.html` | Password setup email |
| **NEW** | `templates/email/employer-registration-rejected.html` | Rejection email |
| **EDIT** | `schema.sql` | Alter users status enum, add columns |
| **EDIT** | `application-dev.yaml` | Add `employer-expiry-hours` |

---

## Frontend

### 1. Type Changes

#### `common.types.ts` — add `PENDING_ADMIN_REVIEW` to `UserStatus`
**File:** `src/types/common.types.ts`

```typescript
export const USER_STATUS_VALUES = [
  "PENDING_ACTIVATION",
  "PENDING_ADMIN_REVIEW",  // NEW
  "ACTIVE",
  "DISABLED",
] as const;
export type UserStatus = (typeof USER_STATUS_VALUES)[number];
```

#### `request.types.ts` — add new request types
**File:** `src/types/request.types.ts`

```typescript
export interface RegisterEmployerRequest {
  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  referralSource?: string;
  companyName: string;
  companyAddress: string;
  website?: string;
}

export interface EmployerActivateRequest {
  token: string;
  password: string;
  confirmPassword: string;
}
```

#### `response.types.ts` — add new response types
**File:** `src/types/response.types.ts`

```typescript
export interface EmployerRegistrationResponse {
  userId: string;
  email: string;
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  referralSource?: string;
  companyName: string;
  companyAddress: string;
  website?: string;
  status: UserStatus;
  createdAt: string;
}

export interface CompanyProfileStatusResponse {
  complete: boolean;
  missingFields: string[];
}
```

### 2. API Services

#### `authApi.ts` — add employer registration endpoints
**File:** `src/services/authApi.ts`

```typescript
export const registerEmployerApi = (request: RegisterEmployerRequest) => {
  const url = API_PATH + "/register/employers";
  return apiClient.post<APIResponse<string>>(url, request);
};

export const activateEmployerApi = (request: EmployerActivateRequest) => {
  const url = API_PATH + "/activate-employer";
  return apiClient.post<APIResponse<string>>(url, request);
};
```

#### New: `adminApi.ts` (or add to existing admin service if one exists)
**File:** `src/services/adminApi.ts`

```typescript
import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import type { EmployerRegistrationResponse, APIResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/admin/employer-registrations";

export const getEmployerRegistrationsApi = () => {
  return apiClient.get<APIResponse<EmployerRegistrationResponse[]>>(API_PATH);
};

export const approveEmployerRegistrationApi = (userId: string) => {
  return apiClient.post<APIResponse<string>>(`${API_PATH}/${userId}/approve`);
};

export const rejectEmployerRegistrationApi = (userId: string, reason?: string) => {
  return apiClient.post<APIResponse<string>>(
    `${API_PATH}/${userId}/reject`,
    null,
    { params: { reason } }
  );
};
```

#### Add to `companyApi.ts` or `employerApi.ts`
**File:** `src/services/employerApi.ts`

```typescript
export const getCompanyProfileStatusApi = () => {
  const url = Configs.API_ENDPOINT + "/api/v1/employers/me/company-profile-status";
  return apiClient.get<APIResponse<CompanyProfileStatusResponse>>(url);
};
```

### 3. Pages / Components

#### 3a. Wire `ContactEmployerForm` → `EmployerRegister` page
**File:** `src/pages/Employer/EmployerRegister/index.tsx`

Replace the stub with the actual `ContactEmployerForm` component, wired to call `registerEmployerApi`.

**Changes to `ContactEmployerForm`:**

**File:** `src/components/ContactEmployerForm/index.tsx`

- Change `onFinish` to call `registerEmployerApi` instead of `console.log`
- Map form field names to `RegisterEmployerRequest`:
  - `username` → `fullName`
  - `title` → `jobTitle`
  - `email` → `email`
  - `phoneNumber` → `phoneNumber`
  - `source` → `referralSource`
  - `nameCompany` → `companyName`
  - `companyAddress` → `companyAddress`
  - `companyAddressWebsite` → `website`
- On success: navigate to `/customer/register-success`
- On error: show Swal error with `getApiErrorMessage`
- Add loading state to submit button

#### 3b. New: `EmployerRegisterSuccess` page
**File:** `src/pages/Employer/EmployerRegisterSuccess/index.tsx`

Different from seeker's `RegisterSuccess` — message says:
- "Cảm ơn bạn đã đăng ký! Đội ngũ ITViec sẽ xem xét thông tin trong 1-3 ngày làm việc."
- "Bạn sẽ nhận được email thông báo khi tài khoản được phê duyệt."
- No "resend activation" button (since there's no activation link yet)
- Link back to home page

Use Ant Design `Result` component with `status="success"`.

#### 3c. New: `EmployerActivate` page
**File:** `src/pages/Employer/EmployerActivate/index.tsx`

Route: `/employer/activate?token=xxx`

- On mount: read `?token=` from URL params
- Show password form with two fields: `password`, `confirmPassword`
- Validate: password strength (match backend `@PasswordConstraint`), passwords match
- On submit: call `activateEmployerApi({ token, password, confirmPassword })`
- On success: show `Result` success + "Đăng nhập ngay" button → navigate to `/customer/login`
- On error: show appropriate error message (token invalid/expired)

#### 3d. New: `AdminEmployerRegistrations` page
**File:** `src/pages/Admin/AdminEmployerRegistrations/index.tsx`

- Table with columns: Email, Full Name, Job Title, Phone, Company Name, City, Website, Registered At, Actions
- Actions column: "Approve" button (green) + "Reject" button (red, opens Modal.confirm with optional reason textarea)
- Filter by email, company name
- Loads data from `getEmployerRegistrationsApi()`
- Approve calls `approveEmployerRegistrationApi(userId)` → success toast → remove from list
- Reject calls `rejectEmployerRegistrationApi(userId, reason)` → success toast → remove from list

#### 3e. Employer Dashboard Banner
**File:** `src/pages/Employer/EmployerDashBoard/index.tsx` (update existing)

- On mount: call `getCompanyProfileStatusApi()`
- If `!complete`: show `Alert` banner (Ant Design, type="warning")
  - Message: "Vui lòng hoàn thiện hồ sơ công ty trước khi đăng tin tuyển dụng"
  - Action link: navigate to `/customer/profile`
  - List missing fields in alert description
- If `complete`: hide banner

### 4. Route Changes

#### `EmployerPublicRoute.tsx` — add routes
**File:** `src/routes/EmployerPublicRoute.tsx`

```typescript
import EmployerRegisterSuccess from '@/pages/Employer/EmployerRegisterSuccess';

// Add to children:
{ path: 'register-success', element: <EmployerRegisterSuccess /> },
```

#### `routes/index.tsx` — add employer activate as top-level public route
**File:** `src/routes/index.tsx`

```typescript
import EmployerActivate from '@/pages/Employer/EmployerActivate';

// Add under employer path (before EmployerPublicRoutes):
{
  path: 'employer',
  children: [
    { path: 'activate', element: <EmployerActivate /> },
    // ... existing employer home route
  ],
},
```

#### `AdminPrivateRoute.tsx` — add employer registrations route
**File:** `src/routes/AdminPrivateRoute.tsx`

```typescript
import AdminEmployerRegistrations from '@/pages/Admin/AdminEmployerRegistrations';

// Add to children:
{ path: 'employer-registrations', element: <AdminEmployerRegistrations /> },
```

#### Admin sidebar navigation — add menu item
Add "Employer Registrations" link to the admin layout sidebar pointing to `/admin/employer-registrations`.

### 5. Constants Update

**File:** `src/constants/index.tsx`

Add to `getUserStatusOptions`:

```typescript
export const getUserStatusOptions = (t: TFunction) => [
  { value: "PENDING_ACTIVATION", label: t("common:userStatus.pendingActivation") },
  { value: "PENDING_ADMIN_REVIEW", label: t("common:userStatus.pendingAdminReview") },  // NEW
  { value: "ACTIVE", label: t("common:userStatus.active") },
  { value: "DISABLED", label: t("common:userStatus.disabled") },
];
```

### 6. i18n Keys

#### `public/locales/vi/common.json` — add:
```json
{
  "userStatus": {
    "pendingAdminReview": "Chờ duyệt"
  }
}
```

#### `public/locales/en/common.json` — add:
```json
{
  "userStatus": {
    "pendingAdminReview": "Pending Admin Review"
  }
}
```

#### `public/locales/vi/employer.json` — add:
```json
{
  "register": {
    "successTitle": "Đăng ký thành công!",
    "successMessage": "Đội ngũ ITViec sẽ xem xét thông tin công ty trong 1-3 ngày làm việc. Bạn sẽ nhận được email thông báo khi tài khoản được phê duyệt.",
    "backToHome": "Về trang chủ"
  },
  "activate": {
    "title": "Thiết lập mật khẩu",
    "passwordPlaceholder": "Nhập mật khẩu",
    "confirmPasswordPlaceholder": "Xác nhận mật khẩu",
    "submitBtn": "Xác nhận",
    "successTitle": "Thiết lập mật khẩu thành công!",
    "successMessage": "Bạn có thể đăng nhập và bắt đầu đăng tin tuyển dụng.",
    "loginBtn": "Đăng nhập ngay",
    "passwordMismatch": "Mật khẩu xác nhận không khớp"
  },
  "dashboard": {
    "profileIncomplete": "Vui lòng hoàn thiện hồ sơ công ty trước khi đăng tin tuyển dụng",
    "completeProfile": "Hoàn thiện hồ sơ"
  }
}
```

#### `public/locales/en/employer.json` — add:
```json
{
  "register": {
    "successTitle": "Registration Submitted!",
    "successMessage": "Our team will review your company information within 1-3 business days. You'll receive an email notification once your account is approved.",
    "backToHome": "Back to Home"
  },
  "activate": {
    "title": "Set Your Password",
    "passwordPlaceholder": "Enter password",
    "confirmPasswordPlaceholder": "Confirm password",
    "submitBtn": "Confirm",
    "successTitle": "Password Set Successfully!",
    "successMessage": "You can now log in and start posting jobs.",
    "loginBtn": "Log In Now",
    "passwordMismatch": "Passwords do not match"
  },
  "dashboard": {
    "profileIncomplete": "Please complete your company profile before posting jobs",
    "completeProfile": "Complete Profile"
  }
}
```

#### `public/locales/vi/admin.json` — add:
```json
{
  "employerRegistrations": {
    "title": "Duyệt đăng ký nhà tuyển dụng",
    "columns": {
      "email": "Email",
      "fullName": "Họ và tên",
      "jobTitle": "Chức vụ",
      "phone": "Số điện thoại",
      "companyName": "Tên công ty",
      "companyAddress": "Thành phố",
      "website": "Website",
      "registeredAt": "Ngày đăng ký",
      "actions": "Hành động"
    },
    "approve": "Phê duyệt",
    "reject": "Từ chối",
    "rejectTitle": "Từ chối đăng ký",
    "rejectReason": "Lý do từ chối (tùy chọn)",
    "notifications": {
      "approveSuccess": "Đã phê duyệt đăng ký nhà tuyển dụng",
      "rejectSuccess": "Đã từ chối đăng ký nhà tuyển dụng"
    }
  }
}
```

### 7. Frontend File Summary

| Action | File | Notes |
|--------|------|-------|
| **EDIT** | `types/common.types.ts` | Add `PENDING_ADMIN_REVIEW` |
| **EDIT** | `types/request.types.ts` | Add `RegisterEmployerRequest`, `EmployerActivateRequest` |
| **EDIT** | `types/response.types.ts` | Add `EmployerRegistrationResponse`, `CompanyProfileStatusResponse` |
| **EDIT** | `services/authApi.ts` | Add `registerEmployerApi`, `activateEmployerApi` |
| **NEW** | `services/adminApi.ts` | Admin employer registration APIs |
| **EDIT** | `services/employerApi.ts` | Add `getCompanyProfileStatusApi` |
| **EDIT** | `components/ContactEmployerForm/index.tsx` | Wire to `registerEmployerApi` |
| **EDIT** | `pages/Employer/EmployerRegister/index.tsx` | Replace stub with `ContactEmployerForm` |
| **NEW** | `pages/Employer/EmployerRegisterSuccess/index.tsx` | Success page |
| **NEW** | `pages/Employer/EmployerActivate/index.tsx` | Password setup page |
| **NEW** | `pages/Admin/AdminEmployerRegistrations/index.tsx` | Admin approval page |
| **EDIT** | `pages/Employer/EmployerDashBoard/index.tsx` | Profile completeness banner |
| **EDIT** | `routes/EmployerPublicRoute.tsx` | Add `register-success` route |
| **EDIT** | `routes/index.tsx` | Add `/employer/activate` route |
| **EDIT** | `routes/AdminPrivateRoute.tsx` | Add `employer-registrations` route |
| **EDIT** | `constants/index.tsx` | Add `PENDING_ADMIN_REVIEW` option |
| **EDIT** | `public/locales/vi/common.json` | Add `pendingAdminReview` |
| **EDIT** | `public/locales/en/common.json` | Add `pendingAdminReview` |
| **EDIT** | `public/locales/vi/employer.json` | Add register/activate/dashboard keys |
| **EDIT** | `public/locales/en/employer.json` | Add register/activate/dashboard keys |
| **EDIT** | `public/locales/vi/admin.json` | Add employer registrations keys |
| **EDIT** | `public/locales/en/admin.json` | Add employer registrations keys |
| **EDIT** | Admin layout sidebar | Add navigation link |

---

## Verification

### 1. Unit Tests

**File:** `src/test/java/com/dev001/itviec/service/impl/AuthenticationServiceImplTest.java` (extend)

| # | Test case | Expected |
|---|-----------|----------|
| 1 | `registerEmployer` — happy path | User(PENDING_ADMIN_REVIEW), Employer, Company created; email sent |
| 2 | `registerEmployer` — duplicate email | Throw `EMAIL_EXISTED` |
| 3 | `authenticate` — PENDING_ADMIN_REVIEW user | Throw `ACCOUNT_PENDING_ADMIN_REVIEW` |

**File:** `src/test/java/com/dev001/itviec/service/impl/ActivationServiceImplTest.java` (extend)

| # | Test case | Expected |
|---|-----------|----------|
| 4 | `createAndSendEmployerActivation` — happy path | Token(SET_PASSWORD) saved, email sent with correct template |
| 5 | `activateEmployer` — valid token, matching passwords | User password updated, status → ACTIVE, token used |
| 6 | `activateEmployer` — passwords don't match | Throw `PASSWORD_MISMATCH` |
| 7 | `activateEmployer` — token type is EMAIL_VERIFY | Throw `ACTIVATION_TOKEN_INVALID` |
| 8 | `activateEmployer` — token expired | Throw `ACTIVATION_TOKEN_EXPIRED` |
| 9 | `activateEmployer` — token already used | Throw `ACTIVATION_TOKEN_INVALID` |

**File:** `src/test/java/com/dev001/itviec/service/impl/AdminEmployerRegistrationServiceImplTest.java` (new)

| # | Test case | Expected |
|---|-----------|----------|
| 10 | `getPendingRegistrations` — returns list | Correct DTO mapping |
| 11 | `approveRegistration` — happy path | Status → PENDING_ACTIVATION, activation email sent |
| 12 | `approveRegistration` — wrong status | Throw `INVALID_USER_STATUS` |
| 13 | `rejectRegistration` — happy path | Status → DISABLED, rejection email sent |
| 14 | `rejectRegistration` — wrong status | Throw `INVALID_USER_STATUS` |

### 2. Manual E2E Checklist

| # | Step | How to verify |
|---|------|---------------|
| 1 | Visit `/customer/register` | `ContactEmployerForm` renders with all fields |
| 2 | Fill form, submit | POST `/api/v1/auth/register/employers` → 1000; redirect to success page |
| 3 | Check Mailtrap | "Đăng ký nhà tuyển dụng thành công" email received, no activation link |
| 4 | Try login as employer | Blocked with error `ACCOUNT_PENDING_ADMIN_REVIEW` |
| 5 | Check DB | `users.status = PENDING_ADMIN_REVIEW`, `employers` row exists, `companies` stub exists |
| 6 | Admin panel: `/admin/employer-registrations` | Table shows pending registration |
| 7 | Admin clicks "Approve" | Status → `PENDING_ACTIVATION`; Mailtrap: activation email with password link |
| 8 | Copy activation link, visit `/employer/activate?token=xxx` | Password form renders |
| 9 | Set password (valid) | POST `/api/v1/auth/activate-employer` → 1000; success page |
| 10 | Login as employer | Success; `status = ACTIVE` |
| 11 | Employer dashboard | Profile completeness banner shown if company profile incomplete |
| 12 | Complete company profile | Banner disappears |
| 13 | Admin reject flow | Status → `DISABLED`; rejection email sent; login blocked |
| 14 | Duplicate email registration | Error `EMAIL_EXISTED` |
| 15 | Expired activation token | Error `ACTIVATION_TOKEN_EXPIRED` |

### 3. Validation Commands

| # | Item | Command |
|---|------|---------|
| 1 | Backend compiles | `./mvnw compile` |
| 2 | Backend tests | `./mvnw test` |
| 3 | Targeted test | `./mvnw test -Dtest=AdminEmployerRegistrationServiceImplTest` |
| 4 | Frontend type-check | `npm run type-check` (in `it-viec-frontend`) |
| 5 | Frontend lint | `npm run lint` (in `it-viec-frontend`) |
| 6 | DB schema check | `SHOW CREATE TABLE users` — confirm `PENDING_ADMIN_REVIEW` in enum |
| 7 | DB column check | `DESCRIBE employers` — confirm `referral_source` column |
| 8 | DB column check | `DESCRIBE activation_tokens` — confirm `token_type` column |

---

## Flow Diagrams

### Registration Flow

```
Employer submits form
  │
  ▼
POST /api/v1/auth/register/employers
  ├─ Validate fields
  ├─ Check email uniqueness
  ├─ INSERT users (password=random, role=EMPLOYER, status=PENDING_ADMIN_REVIEW)
  ├─ INSERT employers (fullName, jobTitle, phoneNumber, referralSource)
  ├─ INSERT companies (companyName, address, website, slug)
  ├─ Send "thank you" email (no activation link)
  └─ Return 1000 → FE redirect → /customer/register-success
```

### Admin Approval Flow

```
Admin views /admin/employer-registrations
  │
  ▼
GET /api/v1/admin/employer-registrations
  └─ Returns list of PENDING_ADMIN_REVIEW employer users with details
  │
  ▼
Admin clicks "Approve"
  │
  ▼
POST /api/v1/admin/employer-registrations/{userId}/approve
  ├─ Validate status == PENDING_ADMIN_REVIEW
  ├─ UPDATE users SET status = PENDING_ACTIVATION
  ├─ INSERT activation_tokens (tokenType=SET_PASSWORD, expiresAt=+72h)
  ├─ Send activation email with password setup link
  └─ Return 1000
```

### Password Setup Flow

```
Employer clicks link in email → /employer/activate?token=xxx
  │
  ▼
Enters password + confirm password → Submit
  │
  ▼
POST /api/v1/auth/activate-employer
  ├─ Validate passwords match
  ├─ Find token (SET_PASSWORD, not used, not expired)
  ├─ UPDATE users SET password = BCrypt(password), status = ACTIVE
  ├─ UPDATE activation_tokens SET is_used = true
  └─ Return 1000 → FE shows success → "Đăng nhập ngay" → /customer/login
```

### Status State Machine

```
                    ┌────────────────┐
  Register  ──────►│PENDING_ADMIN   │
  (employer)       │   _REVIEW      │
                    └───────┬────────┘
                            │
                   ┌────────┴────────┐
                   │                 │
              Admin Approve     Admin Reject
                   │                 │
                   ▼                 ▼
           ┌──────────────┐   ┌──────────┐
           │PENDING_      │   │ DISABLED │
           │ ACTIVATION   │   └──────────┘
           └──────┬───────┘
                  │
            Set Password
                  │
                  ▼
           ┌──────────────┐
           │   ACTIVE     │
           └──────────────┘
```
