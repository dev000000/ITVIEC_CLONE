---
description: "Use when creating or modifying Java backend files: controllers, services, entities, DTOs, mappers, repositories, security config, or tests. Covers Lombok, MapStruct, Spring Security JWT rules, REST API conventions, role-based authorization, and Spotless formatting."
applyTo: "it-viec-backend/src/**/*.java"
---

# Backend Development Guidelines

## Package Structure

```
com.dev001.itviec
  ├── configuration/   # Security, JWT, CORS, S3, Cookie
  ├── controller/      # REST endpoints (@RestController)
  ├── dto/
  │   ├── request/     # Input DTOs
  │   └── response/    # Output DTOs
  ├── entity/          # JPA entities
  ├── enums/           # Enums — keep in sync with frontend common.types.ts
  ├── exception/       # Custom exceptions
  ├── mapper/          # MapStruct mappers
  ├── repository/      # Spring Data JPA repositories
  ├── service/         # Service interfaces
  │   └── impl/        # Service implementations
  └── validator/       # Custom Bean Validation annotations
```

## Coding Conventions

- **Lombok**: Use `@RequiredArgsConstructor`, `@Slf4j`, `@Data`, `@Builder`. Do NOT write manual constructors, getters, or setters.
- **MapStruct**: Use for all entity ↔ DTO mapping. Never map fields manually inside service methods.
- **Spotless**: Run `./mvnw spotless:apply` before committing. Format is enforced.
- Service methods must return DTOs — never return raw JPA entities.

## Security & JWT

- Access Token: short-lived. Expired → return **HTTP 410 GONE** (frontend auto-refreshes).
- Refresh Token: long-lived, stored in **HttpOnly cookie**. Invalid/expired → return **HTTP 401**.
- Use `@PreAuthorize` (enabled via `@EnableMethodSecurity`) for role-based endpoint protection.
- CORS: whitelist only required domains in `SecurityConfig`. Never use wildcard `*` in production.

## Roles

```java
enum Role { ADMIN, EMPLOYER, SEEKER }
```

- `SEEKER` — job search and apply
- `EMPLOYER` — post jobs, manage applicants
- `ADMIN` — full system administration

## API Convention

- Base path: `/api/v1/`
- RESTful: `GET /api/v1/jobs`, `POST /api/v1/jobs`, `PUT /api/v1/jobs/{id}`
- Always wrap responses in `APIResponse<T>` (`code`, `message`, `result`).
- Paginated responses use `PageResponse<T>` (`data`, `page`, `size`, `totalElements`).

## Database

- `ddl-auto: update` in dev. Never use `create-drop` in production.
- Credentials via `.env` environment variables — never hardcode in source.
- Schema: `src/main/resources/db/schema.sql`, seed data: `data.sql`.

## File Upload

- All file/image uploads go to **AWS S3** via `S3Config.java`.
- Use env vars: `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `AWS_BUCKET_NAME`, `AWS_REGION_STATIC`.

## Testing

- Integration tests use **Testcontainers** with a real MySQL container.
- Test profile: `application-test.yaml`.
- Place tests under `src/test/java/`.
