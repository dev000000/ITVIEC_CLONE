# Email Service — Mailtrap + Spring Boot

## Summary

Tích hợp gửi email vào `it-viec-backend` sử dụng **Mailtrap** làm SMTP sandbox (dev/test) và `spring-boot-starter-mail` + Thymeleaf template.

Mục tiêu:
- Tạo `EmailService` interface + implementation dùng `JavaMailSender`
- Expose 1 REST API `POST /api/v1/emails/send` (admin/internal) để test gửi mail
- Viết unit test (mock) + integration test (GreenMail embedded SMTP)
- Config SMTP theo profile: **dev** → Mailtrap, **test** → GreenMail, **prod** → SMTP thật (SendGrid/SES/Brevo)

Phục vụ cho các feature tiếp theo: xác nhận đăng ký, reset password, thông báo ứng tuyển, mời phỏng vấn, v.v.

---

## Frontend

Không thay đổi frontend trong phase này. API gửi mail chỉ dùng cho backend/admin test.

Các phase tiếp theo (ví dụ: verify email khi đăng ký) sẽ có plan riêng tích hợp UI.

---

## Backend

### 1. Dependencies (`pom.xml`)

```xml
<!-- Email -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>

<!-- HTML email template -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

<!-- Test: embedded SMTP -->
<dependency>
    <groupId>com.icegreen</groupId>
    <artifactId>greenmail-junit5</artifactId>
    <version>2.1.2</version>
    <scope>test</scope>
</dependency>
```

### 2. Config SMTP theo profile

**`application-dev.yaml`** — Mailtrap sandbox:

```yaml
spring:
  mail:
    host: sandbox.smtp.mailtrap.io
    port: 2525
    username: ${MAILTRAP_USERNAME}
    password: ${MAILTRAP_PASSWORD}
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true

app:
  mail:
    from: no-reply@itviec-dev.com
```

**`application-test.yaml`** — GreenMail (embedded, port random):

```yaml
spring:
  mail:
    host: localhost
    port: 3025
    username: test
    password: test

app:
  mail:
    from: no-reply@test.com
```

**`application-prod.yaml`** — SMTP thật (env vars):

```yaml
spring:
  mail:
    host: ${SMTP_HOST}
    port: ${SMTP_PORT}
    username: ${SMTP_USERNAME}
    password: ${SMTP_PASSWORD}
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true

app:
  mail:
    from: ${MAIL_FROM:no-reply@itviec.com}
```

### 3. Code structure

```
src/main/java/com/dev001/itviec/
├── configuration/
│   └── MailConfig.java              # @ConfigurationProperties("app.mail")
├── dto/
│   └── request/
│       └── SendEmailRequest.java    # to, subject, body (plain or template key)
├── service/
│   ├── EmailService.java            # interface
│   └── impl/
│       └── EmailServiceImpl.java    # JavaMailSender + Thymeleaf
├── controller/
│   └── EmailController.java         # POST /api/v1/emails/send
└── exception/
    └── ErrorCode.java               # + EMAIL_SEND_FAILED(1100, ...)
```

### 3.1. `EmailService` interface

```java
public interface EmailService {
    void sendSimple(String to, String subject, String text);
    void sendHtml(String to, String subject, String templateName, Map<String, Object> variables);
    void sendBulk(List<String> recipients, String subject, String templateName, Map<String, Object> variables);
}
```

### 3.2. `EmailServiceImpl`

```java
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${app.mail.from}")
    private String fromAddress;

    @Override
    public void sendSimple(String to, String subject, String text) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(fromAddress);
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(text);
        mailSender.send(msg);
    }

    @Override
    public void sendHtml(String to, String subject, String templateName, Map<String, Object> variables) {
        Context ctx = new Context();
        ctx.setVariables(variables);
        String html = templateEngine.process(templateName, ctx);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        helper.setFrom(fromAddress);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(html, true);
        mailSender.send(mimeMessage);
    }

    @Override
    public void sendBulk(List<String> recipients, String subject, String templateName, Map<String, Object> variables) {
        for (String to : recipients) {
            sendHtml(to, subject, templateName, variables);
        }
    }
}
```

### 3.3. `SendEmailRequest` DTO

```java
@Data
public class SendEmailRequest {
    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID")
    private String to;

    @NotBlank
    private String subject;

    @NotBlank
    private String body;
}
```

### 3.4. `EmailController`

```java
@RestController
@RequestMapping("/api/v1/emails")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> sendEmail(@RequestBody @Valid SendEmailRequest request) {
        emailService.sendSimple(request.getTo(), request.getSubject(), request.getBody());
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Email sent successfully")
                .build();
    }
}
```

### 3.5. ErrorCode

Thêm vào `ErrorCode.java`:

```java
EMAIL_SEND_FAILED(1100, "Failed to send email", HttpStatus.INTERNAL_SERVER_ERROR),
```

### 3.6. Thymeleaf template (mẫu)

```
src/main/resources/templates/
└── email/
    └── welcome.html
```

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<body>
  <h2>Xin chào, <span th:text="${name}">User</span>!</h2>
  <p th:text="${message}">Nội dung email</p>
</body>
</html>
```

### 4. Mailtrap setup

1. Đăng ký tại [mailtrap.io](https://mailtrap.io) (free tier: 100 emails/tháng)
2. Vào **Email Testing → Inboxes → SMTP Settings**
3. Copy `username` và `password` → set vào env:
   ```
   MAILTRAP_USERNAME=xxxxx
   MAILTRAP_PASSWORD=yyyyy
   ```
4. Chạy app với profile `dev` → gửi mail → xem trên web UI Mailtrap

---

## Verification

### 1. Unit test — `EmailServiceImplTest.java`

Mock `JavaMailSender`, verify `.send()` được gọi đúng params:

```java
@ExtendWith(MockitoExtension.class)
class EmailServiceImplTest {

    @Mock JavaMailSender mailSender;
    @Mock SpringTemplateEngine templateEngine;
    @InjectMocks EmailServiceImpl emailService;

    @Test
    void sendSimple_shouldCallMailSender() {
        emailService.sendSimple("user@test.com", "Subject", "Body");
        verify(mailSender).send(any(SimpleMailMessage.class));
    }
}
```

### 2. Integration test — `EmailIntegrationTest.java` (GreenMail)

Chạy embedded SMTP, gửi mail thật qua JavaMailSender, assert mail nhận được:

```java
@SpringBootTest
@ActiveProfiles("test")
class EmailIntegrationTest {

    @RegisterExtension
    static GreenMailExtension greenMail = new GreenMailExtension(
        new ServerSetup(3025, null, "smtp")
    );

    @Autowired EmailService emailService;

    @Test
    void sendSimple_shouldBeReceivedByGreenMail() {
        emailService.sendSimple("recipient@test.com", "Hello", "Test body");

        MimeMessage[] received = greenMail.getReceivedMessages();
        assertThat(received).hasSize(1);
        assertThat(received[0].getSubject()).isEqualTo("Hello");
    }

    @Test
    void sendBulk_shouldDeliverToAllRecipients() {
        List<String> recipients = List.of("a@test.com", "b@test.com", "c@test.com");
        emailService.sendBulk(recipients, "Bulk", "email/welcome", Map.of("name", "Tester", "message", "Hi"));

        assertThat(greenMail.getReceivedMessages()).hasSize(3);
    }
}
```

### 3. Manual test — Mailtrap web UI

1. Start backend profile `dev`
2. Gọi API:
   ```bash
   curl -X POST http://localhost:8081/api/v1/emails/send \
     -H "Content-Type: application/json" \
     -H "Cookie: <admin_jwt_cookie>" \
     -d '{"to":"seeker1@test.com","subject":"Test Email","body":"Hello from ITViec!"}'
   ```
3. Mở Mailtrap inbox → verify email hiển thị đúng

### 4. Checklist

| # | Item | Cách verify |
|---|---|---|
| 1 | `spring-boot-starter-mail` added | `mvn dependency:tree \| grep mail` |
| 2 | SMTP config đúng theo profile | `application-dev.yaml` → Mailtrap, `application-test.yaml` → GreenMail |
| 3 | `POST /api/v1/emails/send` trả `code: 1000` | curl / Postman |
| 4 | Email xuất hiện trên Mailtrap | Mailtrap web UI |
| 5 | Unit test pass | `./mvnw test -pl it-viec-backend -Dtest=EmailServiceImplTest` |
| 6 | Integration test pass (GreenMail) | `./mvnw test -pl it-viec-backend -Dtest=EmailIntegrationTest` |
| 7 | Gửi bulk 5+ recipients thành công | Test + Mailtrap |
| 8 | Error handling: SMTP down → `EMAIL_SEND_FAILED` | Stop Mailtrap → gọi API → expect error 1100 |
