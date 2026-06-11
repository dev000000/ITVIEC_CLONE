# Email Activation on Registration

## Summary

Khi user đăng ký (Seeker hoặc Employer), thay vì kích hoạt tài khoản ngay lập tức (`ACTIVE`), hệ thống sẽ:

1. Tạo user với `status = PENDING_ACTIVATION`
2. Generate activation token → lưu vào bảng `activation_tokens` riêng biệt (tách khỏi bảng `tokens` JWT hiện tại)
3. Gửi email HTML đẹp mắt (Thymeleaf template) chứa link kích hoạt
4. User click link → verify token → chuyển status sang `ACTIVE`
5. Block login nếu `PENDING_ACTIVATION`; hiển thị nút "Gửi lại email" khi login thất bại

**Thiết kế chính:**
- Bảng `activation_tokens` **tách riêng** khỏi bảng `tokens` (JWT) để không ảnh hưởng logic authentication hiện tại
- Token hết hạn sau **24 giờ**; Rate limit gửi lại: **2 phút**
- Dùng `EmailService` + Thymeleaf template đã có sẵn (Mailtrap SMTP)
- Frontend React + Ant Design hiển thị trang activation result + banner sau đăng ký

---

## Frontend

### 1. Trang Activation Result — `/activate`

Route mới `/activate?token=xxx` hiển thị kết quả khi user click link trong email.

**File:** `src/pages/Auth/ActivateAccount/index.tsx`

```tsx
// Khi mount, đọc ?token= từ URL → gọi API GET /api/v1/auth/activate?token=xxx
// 3 trạng thái: loading | success | error (token hết hạn / đã dùng / không hợp lệ)
// Success → nút "Đăng nhập ngay" navigate tới /sign-in
// Error → hiển thị message + nút "Gửi lại email" hoặc "Đăng ký lại"
```

**UI (Ant Design):**
- `Spin` khi loading
- `Result` component: `status="success"` hoặc `status="error"` 
- Responsive, centered card layout

### 2. Banner sau đăng ký thành công

Sau khi `POST /api/v1/auth/register/seekers` trả `code: 1000`:
- Chuyển sang trang `/register-success` hoặc show `Alert` component (Ant Design)
- Message: "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản."
- Có countdown 60s + nút "Gửi lại email" (gọi `/api/v1/auth/resend-activation`)

**File:** `src/pages/Auth/RegisterSuccess/index.tsx`

### 3. Resend trên trang Login

Khi login trả error code `ACCOUNT_NOT_ACTIVATED` (1103):
- Hiển thị `Alert` warning: "Tài khoản chưa được xác thực email"
- Kèm nút/link "Gửi lại email xác thực" → gọi `POST /api/v1/auth/resend-activation`

**File:** Cập nhật `src/pages/Auth/SignIn/index.tsx`

### 4. Route config

```tsx
// src/routes/ — thêm public routes:
{ path: '/activate', element: <ActivateAccount /> }
{ path: '/register-success', element: <RegisterSuccess /> }
```

### 5. API Service

**File:** `src/services/authApi.ts` — thêm:

```typescript
export const activateAccountApi = (token: string) =>
  apiClient.get(`/api/v1/auth/activate?token=${token}`);

export const resendActivationApi = (email: string) =>
  apiClient.post('/api/v1/auth/resend-activation', { email });
```

### 6. Types

**File:** `src/types/request.types.ts` — thêm:
```typescript
export interface ResendActivationRequest {
  email: string;
}
```

---

## Backend

### 1. Database — Bảng `activation_tokens` (tách riêng)

Tạo entity mới, JPA auto DDL (`ddl-auto: update`) sẽ tạo bảng tự động.

**SQL tương đương:**

```sql
CREATE TABLE activation_tokens (
    id          VARCHAR(255) PRIMARY KEY,          -- UUID (theo convention hiện tại)
    user_id     VARCHAR(255) NOT NULL,
    token       VARCHAR(255) UNIQUE NOT NULL,      -- UUID crypto random
    expires_at  TIMESTAMP NOT NULL,                -- NOW() + 24h
    is_used     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_activation_tokens_token ON activation_tokens(token);
CREATE INDEX idx_activation_tokens_user_id ON activation_tokens(user_id);
```

> **Lý do tách riêng:** Bảng `tokens` hiện tại chỉ phục vụ JWT (access + refresh token BEARER). Việc thêm activation token vào đó sẽ ảnh hưởng logic `revokeAllUserTokens()`, `findByUserAndRevokedFalse()` và các query hiện có. Tách riêng đảm bảo zero-impact lên authentication flow.

### 2. Entity — `ActivationToken`

**File:** `src/main/java/com/dev001/itviec/entity/activation/ActivationToken.java`

```java
@Entity
@Table(name = "activation_tokens", indexes = {
    @Index(name = "idx_activation_token", columnList = "token"),
    @Index(name = "idx_activation_user_id", columnList = "user_id")
})
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ActivationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false, unique = true)
    String token;                              // UUID.randomUUID().toString()

    @Column(name = "expires_at", nullable = false)
    LocalDateTime expiresAt;                   // now() + 24h

    @Column(name = "is_used")
    boolean used;                              // default false

    @Column(name = "created_at", updatable = false)
    LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
```

### 3. Repository — `ActivationTokenRepository`

**File:** `src/main/java/com/dev001/itviec/repository/ActivationTokenRepository.java`

```java
public interface ActivationTokenRepository extends JpaRepository<ActivationToken, String> {

    Optional<ActivationToken> findByTokenAndUsedFalse(String token);

    Optional<ActivationToken> findFirstByUserOrderByCreatedAtDesc(User user);

    @Modifying
    @Query("UPDATE ActivationToken a SET a.used = true WHERE a.user = :user AND a.used = false")
    void markAllUsedByUser(@Param("user") User user);
}
```

### 4. Cập nhật `AuthenticationServiceImpl.registerUserSeeker()`

Thay đổi:
- `UserStatus.ACTIVE` → `UserStatus.PENDING_ACTIVATION`
- Sau khi tạo user + seeker → generate activation token → gửi email

```java
@Override
@Transactional
public void registerUserSeeker(RegisterUserSeekerRequest request, HttpServletResponse response) {
    if (userRepository.existsByEmail(request.getEmail())) {
        throw new AppException(EMAIL_EXISTED);
    }
    if (seekerRepository.existsByFullNameIgnoreCase(request.getFullName())) {
        throw new AppException(FULL_NAME_EXISTED);
    }

    String hashedPassword = passwordEncoder.encode(request.getPassword());

    User user = User.builder()
            .email(request.getEmail())
            .password(hashedPassword)
            .role(Role.SEEKER)
            .status(UserStatus.PENDING_ACTIVATION)  // <-- CHANGED
            .build();
    User savedUser = userRepository.save(user);

    String normalizedFullName = request.getFullName().trim().replaceAll("\\s+", " ");
    Seeker seeker = Seeker.builder().user(savedUser).fullName(normalizedFullName).build();
    seekerRepository.save(seeker);

    // Generate + send activation email
    activationService.createAndSendActivation(savedUser);
}
```

### 5. Service — `ActivationService`

**File:** `src/main/java/com/dev001/itviec/service/ActivationService.java`

```java
public interface ActivationService {
    void createAndSendActivation(User user);
    void activate(String token);
    void resendActivation(String email);
}
```

**File:** `src/main/java/com/dev001/itviec/service/impl/ActivationServiceImpl.java`

```java
@Slf4j
@Service
@RequiredArgsConstructor
public class ActivationServiceImpl implements ActivationService {

    private final ActivationTokenRepository activationTokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Value("${app.activation.base-url:http://localhost:5173}")
    private String frontendBaseUrl;

    @Value("${app.activation.expiry-hours:24}")
    private int expiryHours;

    @Value("${app.activation.resend-cooldown-minutes:2}")
    private int resendCooldownMinutes;

    @Override
    @Transactional
    public void createAndSendActivation(User user) {
        String tokenValue = UUID.randomUUID().toString();

        ActivationToken activationToken = ActivationToken.builder()
                .token(tokenValue)
                .expiresAt(LocalDateTime.now().plusHours(expiryHours))
                .used(false)
                .user(user)
                .build();
        activationTokenRepository.save(activationToken);

        String activationLink = frontendBaseUrl + "/activate?token=" + tokenValue;

        Map<String, Object> variables = Map.of(
                "name", user.getEmail(),
                "activationLink", activationLink,
                "expiryHours", expiryHours
        );
        emailService.sendHtml(
                user.getEmail(),
                "[ITViec] Xác thực tài khoản của bạn",
                "email/activation",
                variables
        );
    }

    @Override
    @Transactional
    public void activate(String token) {
        ActivationToken found = activationTokenRepository.findByTokenAndUsedFalse(token)
                .orElseThrow(() -> new AppException(ACTIVATION_TOKEN_INVALID));

        if (found.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new AppException(ACTIVATION_TOKEN_EXPIRED);
        }

        // Activate user
        User user = found.getUser();
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        // Mark token as used
        found.setUsed(true);
        activationTokenRepository.save(found);
    }

    @Override
    @Transactional
    public void resendActivation(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(USER_NOT_FOUND));

        if (user.getStatus() == UserStatus.ACTIVE) {
            throw new AppException(ACCOUNT_ALREADY_ACTIVATED);
        }

        // Rate limit check
        Optional<ActivationToken> latest =
                activationTokenRepository.findFirstByUserOrderByCreatedAtDesc(user);
        if (latest.isPresent()) {
            long minutesSince = ChronoUnit.MINUTES.between(
                    latest.get().getCreatedAt(), LocalDateTime.now());
            if (minutesSince < resendCooldownMinutes) {
                throw new AppException(ACTIVATION_RESEND_TOO_SOON);
            }
        }

        // Mark all old tokens as used
        activationTokenRepository.markAllUsedByUser(user);

        // Create new token and send
        createAndSendActivation(user);
    }
}
```

### 6. Controller — `ActivationController`

**File:** `src/main/java/com/dev001/itviec/controller/ActivationController.java`

```java
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class ActivationController {

    private final ActivationService activationService;

    @GetMapping("/activate")
    public ApiResponse<String> activate(@RequestParam String token) {
        activationService.activate(token);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Account activated successfully")
                .build();
    }

    @PostMapping("/resend-activation")
    public ApiResponse<String> resendActivation(@RequestBody @Valid ResendActivationRequest request) {
        activationService.resendActivation(request.getEmail());
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Activation email sent")
                .build();
    }
}
```

### 7. DTO — `ResendActivationRequest`

**File:** `src/main/java/com/dev001/itviec/dto/request/ResendActivationRequest.java`

```java
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResendActivationRequest {

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID")
    String email;
}
```

### 8. Security — Block login nếu `PENDING_ACTIVATION`

Cập nhật `AuthenticationServiceImpl.authenticate()` — thêm check sau khi xác thực thành công:

```java
// Sau bước authenticate thành công, trước khi cấp token:
if (user.getStatus() == UserStatus.PENDING_ACTIVATION) {
    throw new AppException(ACCOUNT_NOT_ACTIVATED);
}
if (user.getStatus() == UserStatus.DISABLED) {
    throw new AppException(ACCOUNT_DISABLED);
}
```

### 9. Security Config — Thêm public endpoints

Cập nhật `SecurityConfig.java`:

```java
.requestMatchers(HttpMethod.GET, "/api/v1/auth/activate")
.permitAll()
.requestMatchers(HttpMethod.POST, "/api/v1/auth/resend-activation")
.permitAll()
```

### 10. ErrorCode — Thêm mã lỗi mới

```java
ACTIVATION_TOKEN_INVALID(1103, "Activation token is invalid or already used", HttpStatus.BAD_REQUEST),
ACTIVATION_TOKEN_EXPIRED(1104, "Activation token has expired", HttpStatus.BAD_REQUEST),
ACCOUNT_NOT_ACTIVATED(1105, "Account is not activated. Please check your email.", HttpStatus.FORBIDDEN),
ACCOUNT_ALREADY_ACTIVATED(1106, "Account is already activated", HttpStatus.BAD_REQUEST),
ACTIVATION_RESEND_TOO_SOON(1107, "Please wait before requesting a new activation email", HttpStatus.TOO_MANY_REQUESTS),
ACCOUNT_DISABLED(1108, "Account has been disabled", HttpStatus.FORBIDDEN),
```

### 11. Thymeleaf Template — `email/activation.html`

**File:** `src/main/resources/templates/email/activation.html`

Template HTML đẹp mắt với:
- Logo ITViec (hoặc text heading)
- Greeting: "Xin chào, {name}!"
- Body: giải thích cần kích hoạt tài khoản
- CTA button lớn: "Kích hoạt tài khoản" (link href = activationLink)
- Fallback: hiển thị link text nếu button không hoạt động
- Footer: "Link hết hạn sau {expiryHours} giờ", disclaimer

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:0; background-color:#f4f7fa; font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" 
             style="background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="padding:32px 40px 0; text-align:center;">
          <h1 style="color:#ed1b2f; margin:0;">ITViec</h1>
        </td></tr>
        <!-- Content -->
        <tr><td style="padding:24px 40px;">
          <h2 style="color:#333;">Xin chào, <span th:text="${name}">User</span>!</h2>
          <p style="color:#555; line-height:1.6;">
            Cảm ơn bạn đã đăng ký tài khoản trên ITViec. Để hoàn tất đăng ký, 
            vui lòng nhấn nút bên dưới để xác thực email:
          </p>
          <div style="text-align:center; margin:32px 0;">
            <a th:href="${activationLink}" 
               style="background:#ed1b2f; color:#fff; padding:14px 32px; 
                      text-decoration:none; border-radius:6px; font-weight:bold; font-size:16px;">
              Kích hoạt tài khoản
            </a>
          </div>
          <p style="color:#888; font-size:13px;">
            Nếu nút không hoạt động, copy và paste link sau vào trình duyệt:
          </p>
          <p style="word-break:break-all; color:#1890ff; font-size:13px;" th:text="${activationLink}">
            https://...
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:16px 40px 32px; border-top:1px solid #eee;">
          <p style="color:#999; font-size:12px; margin:0;">
            ⏰ Link có hiệu lực trong <span th:text="${expiryHours}">24</span> giờ.
          </p>
          <p style="color:#999; font-size:12px;">
            Nếu bạn không thực hiện đăng ký này, hãy bỏ qua email này.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
```

### 12. Application config — Thêm activation settings

**`application-dev.yaml`:**

```yaml
app:
  mail:
    from: no-reply@itviec-dev.com
  activation:
    base-url: http://localhost:5173
    expiry-hours: 24
    resend-cooldown-minutes: 2
```

**`application-prod.yaml`:**

```yaml
app:
  activation:
    base-url: ${FRONTEND_BASE_URL:https://itviec.com}
    expiry-hours: 24
    resend-cooldown-minutes: 2
```

### 13. Tóm tắt file thay đổi / tạo mới

| Action | File |
|--------|------|
| **NEW** | `entity/activation/ActivationToken.java` |
| **NEW** | `repository/ActivationTokenRepository.java` |
| **NEW** | `service/ActivationService.java` |
| **NEW** | `service/impl/ActivationServiceImpl.java` |
| **NEW** | `controller/ActivationController.java` |
| **NEW** | `dto/request/ResendActivationRequest.java` |
| **NEW** | `resources/templates/email/activation.html` |
| **EDIT** | `service/impl/AuthenticationServiceImpl.java` — register flow + login guard |
| **EDIT** | `configuration/SecurityConfig.java` — thêm public endpoints |
| **EDIT** | `exception/ErrorCode.java` — thêm 6 error codes mới |
| **EDIT** | `application-dev.yaml` — thêm `app.activation.*` |
| **EDIT** | `application-prod.yaml` — thêm `app.activation.*` |

---

## Verification

### 1. Unit Tests

**File:** `src/test/java/com/dev001/itviec/service/impl/ActivationServiceImplTest.java`

| # | Test case | Expected |
|---|-----------|----------|
| 1 | `createAndSendActivation` — happy path | Token saved, `emailService.sendHtml()` called with correct template |
| 2 | `activate` — valid token | User status → `ACTIVE`, token `isUsed = true` |
| 3 | `activate` — token already used | Throw `ACTIVATION_TOKEN_INVALID` |
| 4 | `activate` — token expired | Throw `ACTIVATION_TOKEN_EXPIRED` |
| 5 | `activate` — token not found | Throw `ACTIVATION_TOKEN_INVALID` |
| 6 | `resendActivation` — happy path | Old tokens marked used, new token created, email sent |
| 7 | `resendActivation` — rate limit (< 2 min) | Throw `ACTIVATION_RESEND_TOO_SOON` |
| 8 | `resendActivation` — already active | Throw `ACCOUNT_ALREADY_ACTIVATED` |
| 9 | `resendActivation` — user not found | Throw `USER_NOT_FOUND` |

### 2. Integration Tests

**File:** `src/test/java/com/dev001/itviec/ActivationIntegrationTest.java`

Dùng GreenMail embedded SMTP (đã có setup trong project):

| # | Test case | Expected |
|---|-----------|----------|
| 1 | Register seeker → kiểm tra email gửi | GreenMail nhận 1 email, subject = "[ITViec] Xác thực tài khoản của bạn" |
| 2 | Activation API → user status | `GET /api/v1/auth/activate?token=xxx` → user status = ACTIVE |
| 3 | Login PENDING_ACTIVATION user | 403 với error code 1105 |
| 4 | Resend → new email sent | GreenMail nhận email mới |

### 3. Frontend Tests

| # | Test case | How to verify |
|---|-----------|---------------|
| 1 | Register → redirect to success page | UI hiển thị "Kiểm tra email" message |
| 2 | Click activation link → success page | `/activate?token=valid` → "Kích hoạt thành công" |
| 3 | Expired token → error page | `/activate?token=expired` → "Token đã hết hạn" + resend button |
| 4 | Login pending user → show resend link | Error alert + "Gửi lại email" button |
| 5 | Resend cooldown | Button disabled trong 2 phút |

### 4. Manual E2E Test — Mailtrap

1. Start backend profile `dev` + frontend `npm run dev`
2. Đăng ký tài khoản mới → kiểm tra Mailtrap inbox → email activation đẹp mắt
3. Copy activation link → paste vào browser → confirm redirect + success
4. Login với account vừa activate → success
5. Thử login trước khi activate → hiển thị lỗi + nút gửi lại

### 5. Checklist

| # | Item | Command / Cách verify |
|---|------|----------------------|
| 1 | Entity tạo bảng `activation_tokens` | Check MySQL: `SHOW CREATE TABLE activation_tokens` |
| 2 | Bảng `tokens` (JWT) không bị ảnh hưởng | Login/refresh flow vẫn hoạt động bình thường |
| 3 | Register → status = PENDING_ACTIVATION | Check DB: `SELECT status FROM users WHERE email = ?` |
| 4 | Email gửi thành công (Mailtrap) | Mailtrap web UI |
| 5 | Template HTML render đúng | Email hiển thị button + link |
| 6 | GET `/api/v1/auth/activate?token=xxx` → 1000 | curl / Postman |
| 7 | Login blocked khi PENDING | POST `/api/v1/auth/login` → error 1105 |
| 8 | Resend rate limit | POST 2 lần liên tiếp → error 1107 |
| 9 | Unit tests pass | `./mvnw test -Dtest=ActivationServiceImplTest` |
| 10 | Integration tests pass | `./mvnw test -Dtest=ActivationIntegrationTest` |
| 11 | Frontend type-check pass | `npm run type-check` in `it-viec-frontend` |

### 6. Flow tóm gọn

```
POST /api/v1/auth/register/seekers
  → Validate email + fullName
  → INSERT users (status = PENDING_ACTIVATION)
  → INSERT seekers (fullName)
  → INSERT activation_tokens (token, expires_at = +24h)
  → Send HTML email (Thymeleaf: email/activation.html)
  → Return 1000 (FE redirect → /register-success)

GET /api/v1/auth/activate?token=xxx
  → Find activation_tokens WHERE token = xxx AND is_used = false
  → Validate: not expired
  → UPDATE users SET status = ACTIVE
  → UPDATE activation_tokens SET is_used = true
  → Return 1000 + "Account activated successfully"

POST /api/v1/auth/resend-activation  { "email": "..." }
  → Find user by email
  → Check status != ACTIVE
  → Rate limit: last token created_at > 2 min ago
  → Mark all old activation_tokens as used
  → INSERT new activation_token
  → Send email
  → Return 1000

POST /api/v1/auth/login (existing — add guard)
  → After authenticate success
  → IF user.status == PENDING_ACTIVATION → throw 1105
  → IF user.status == DISABLED → throw 1108
  → Continue normal JWT flow...
```
