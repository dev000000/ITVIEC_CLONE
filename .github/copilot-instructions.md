# Copilot Instructions — ITviec Clone

## 1. Project Overview

ITviec Clone là ứng dụng tuyển dụng IT (clone itviec.com), gồm 2 phần:

| Module | Stack |
|---|---|
| `it-viec-frontend` | React 19, Vite, TypeScript, Ant Design 5, SCSS, Redux, Zustand, React Router v7 |
| `it-viec-backend` | Spring Boot 3.5.5, Java 17, Spring Security, JWT, JPA, MySQL, AWS S3 |

**Deploy:** Docker Compose cho MySQL (`deploy/docker-compose.yml`). Frontend deploy trên Vercel.

---

## 2. Frontend Rules

### 2.1 Ngôn ngữ & File

- Dự án đang **migrate từ JSX sang TSX**. File mới phải dùng **TypeScript (`.ts` / `.tsx`)**.
- File JSX cũ vẫn tồn tại trong `components/`, `pages/`, `services/` — không refactor trừ khi được yêu cầu.
- Dùng `import type` cho type-only imports (`verbatimModuleSyntax: true`).

### 2.2 Path Alias

- Luôn dùng alias `@/` thay vì đường dẫn tương đối dài:
  ```ts
  import { useUserStore } from '@/store/userStore'   // ✅
  import { useUserStore } from '../../../store/userStore' // ❌
  ```

### 2.3 State Management

- **Zustand** (`src/store/`) — dùng cho state mới (user, seeker, company).
- **Redux** (`src/reducers/`) — state cũ, không thêm reducer mới vào đây.
- Khi tạo feature mới → dùng Zustand store.

### 2.4 API & Services

- **`src/services_new/`** — layer API mới bằng TypeScript, dùng `apiClient.ts` (axios instance).
- **`src/services/`** — layer cũ bằng JSX, chỉ giữ để tương thích, không thêm file mới.
- Khi viết API call mới → tạo trong `services_new/`, typed đầy đủ.
- `apiClient` tự xử lý refresh token khi gặp **HTTP 410** (access token hết hạn).
- API base URL lấy từ `VITE_API_ENDPOINT` (default `http://localhost:8081`).

### 2.5 Types

- **Tất cả types** đặt trong `src/types/`:
  - `common.types.ts` — enums/const synced với backend
  - `request.types.ts` — request payload types
  - `response.types.ts` — response types (bao gồm `APIResponse<T>`, `PageResponse<T>`)
  - `slice.types.ts` — Zustand store types
- **Không dùng `any`** — ESLint sẽ warn. Khai báo type cụ thể.

### 2.6 Styling

- Dùng **SCSS** (`.scss`) cho component styling.
- Biến global trong `src/styles/_variables.scss`.
- **Ant Design 5** cho UI components. Không mix nhiều UI library.
- Không inline style trừ khi thực sự cần.

### 2.7 Routing

- Route config trong `src/routes/index.tsx`.
- Có 2 nhóm route: **JobSeeker** (layout mặc định) và **Employer** (layout riêng).
- Guard: `PrivateRoutes`, `PublicRoutes`, `EmployerPrivateRoute`, `EmployerPublicRoute`.
- Auth check qua `LayoutCheckToken` component.

### 2.8 Component Structure

```
components/
  ComponentName/
    index.jsx (hoặc index.tsx)
    ComponentName.scss
```

### 2.9 ESLint Rules (quan trọng)

- `@typescript-eslint/no-unused-vars` — **error** (biến hoa như `MY_CONST` được bỏ qua).
- `@typescript-eslint/no-explicit-any` — **warn**.
- `react-hooks/rules-of-hooks` — **error**.

---

## 3. Backend Rules

### 3.1 Package Structure

```
com.dev001.itviec
  ├── configuration/   # Security, JWT, CORS, S3, Cookie
  ├── controller/      # REST endpoints
  ├── dto/
  │   ├── request/     # Input DTOs
  │   └── response/    # Output DTOs
  ├── entity/          # JPA entities
  ├── enums/           # Enums (sync với frontend common.types.ts)
  ├── exception/       # Custom exceptions
  ├── mapper/          # MapStruct mappers
  ├── repository/      # Spring Data JPA repositories
  ├── service/         # Interfaces
  │   └── impl/        # Implementations
  └── validator/       # Custom Bean Validation
```

### 3.2 Coding Conventions

- **Lombok**: dùng `@RequiredArgsConstructor`, `@Slf4j`, `@Data`, `@Builder` — không viết constructor/getter/setter thủ công.
- **MapStruct**: dùng cho entity ↔ DTO mapping. Không map thủ công trong service.
- **Spotless**: code format tự động. Chạy `./mvnw spotless:apply` trước khi commit.
- Method trong service trả về DTO, không trả raw entity.

### 3.3 Security

- **JWT**: Access Token ngắn hạn + Refresh Token dài hạn (lưu trong HttpOnly cookie).
- Access token hết hạn → trả **HTTP 410 GONE** (frontend sẽ tự refresh).
- Refresh token hết hạn / invalid → trả **HTTP 401**.
- CORS config trong `SecurityConfig`. Chỉ whitelist domain cần thiết.
- `@EnableMethodSecurity` — dùng `@PreAuthorize` để phân quyền theo role.

### 3.4 Roles

```java
enum Role { ADMIN, EMPLOYER, SEEKER }
```

- **SEEKER**: tìm việc, apply job.
- **EMPLOYER**: đăng tuyển, quản lý ứng viên.
- **ADMIN**: quản trị toàn bộ hệ thống.

### 3.5 API Convention

- Base path: `/api/v1/`
- RESTful: `GET /api/v1/jobs`, `POST /api/v1/jobs`, `PUT /api/v1/jobs/{id}`
- Response wrapper: `APIResponse<T>` với `code`, `message`, `result`.
- Pagination: `PageResponse<T>` với `data`, `page`, `size`, `totalElements`, v.v.

### 3.6 Database

- MySQL 8.x.
- Schema init: `src/main/resources/db/schema.sql`, seed data: `data.sql`.
- `ddl-auto: update` ở dev — không dùng `create-drop` trên production.
- Cấu hình qua biến môi trường trong `.env` (không hardcode credentials).

### 3.7 File Upload

- Upload ảnh/file → **AWS S3** (config trong `S3Config.java`).
- Credentials lấy từ env: `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `AWS_BUCKET_NAME`.

### 3.8 Testing

- Unit test: `src/test/java/` — dùng **Testcontainers** + MySQL container cho integration test.
- Test profile: `application-test.yaml`.

---

## 4. Environment Variables

### Frontend (`.env`)

| Variable | Description |
|---|---|
| `VITE_API_ENDPOINT` | Backend base URL (default `http://localhost:8081`) |
| `VITE_AUTH_MODE` | Auth mode: `JWT` hoặc mock |

### Backend (`.env`)

| Variable | Description |
|---|---|
| `SERVER_PORT` | Port server (default 8080) |
| `DBMS_CONNECTION` | JDBC URL |
| `DBMS_USERNAME` / `DBMS_PASSWORD` | DB credentials |
| `SECRET_KEY` | JWT secret |
| `JWT_ACCESS_EXP_MS` / `JWT_REFRESH_EXP_MS` | Token expiry (ms) |
| `AWS_BUCKET_NAME` / `AWS_REGION_STATIC` / `AWS_ACCESS_KEY` / `AWS_SECRET_KEY` | AWS S3 |

---

## 5. Dev Commands

### Frontend

```bash
cd it-viec-frontend
npm run dev          # Start dev server
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

### Backend

```bash
cd it-viec-backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
./mvnw test
./mvnw spotless:apply   # Format code
```

### Docker (MySQL)

```bash
cd deploy
docker-compose up -d   # Start MySQL
```

---

## 6. Key Constraints

- **Không commit `.env`** — đã gitignore.
- **Không commit `target/`** hay `node_modules/`.
- Frontend path alias `@/` → `src/`. Luôn dùng alias trong file mới.
- Enums ở backend (`com.dev001.itviec.enums`) phải **sync** với `src/types/common.types.ts` ở frontend.
- HTML user content (job description từ TipTap) phải qua **DOMPurify** trước khi render.
