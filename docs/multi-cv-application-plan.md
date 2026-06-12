# Multi-CV cho Seeker & Bảo toàn CV trong Application

## Summary

Chuyển hệ thống CV từ mô hình **1 CV / seeker** sang **tối đa 3 CV**, thêm khái niệm **CV chính** (phục vụ tìm kiếm CV sau này), và giải quyết bài toán **bảo toàn CV trong application** khi seeker xóa/thay CV.

**Phương án lưu trữ (khuyến nghị):** Tách bảng `cv_files` lưu blob thực tế. `SeekerCv` là bảng liên kết seeker ↔ cv_file (max 3). `Application` tham chiếu `cv_file_id` — khi seeker xóa CV trong profile, file vẫn tồn tại nếu còn application tham chiếu.

**Business rules:**

| Case | Xử lý |
|------|-------|
| Upload CV đầu tiên | Tạo `CvFile` + `SeekerCv`, auto `isPrimary = true` |
| Upload CV thứ 2, 3 | Tạo mới, `isPrimary = false`; FE cho chọn CV chính |
| Upload khi đã có 3 CV | `SEEKER_CV_LIMIT_REACHED` (400) |
| Đổi CV chính | `PUT /api/v1/seekers/me/cvs/{cvId}/primary` |
| Xóa CV | Xóa `SeekerCv`; nếu là CV chính → promote CV còn lại mới nhất; `CvFile` giữ nếu còn `Application` tham chiếu |
| Ứng tuyển | Chọn CV có sẵn (`cvId`) hoặc upload mới (`cvFile`); lưu `Application.cvFileId` |

---

## Backend

### Entities

**Tạo mới** `com.dev001.itviec.entity.cvfile.CvFile`:

```java
@Entity @Table(name = "cv_files")
class CvFile extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.UUID) String id;
    @Column(name = "file_name", nullable = false) String fileName;
    @Column(name = "content_type", nullable = false) String contentType;
    long size;
    @Lob @Basic(fetch = FetchType.LAZY) @Column(name = "cv_data", columnDefinition = "LONGBLOB") byte[] data;
}
```

**Sửa** `entity/seeker/SeekerCv.java`:
- `@OneToOne` → `@ManyToOne` seeker (bỏ `unique = true` trên `seeker_id`)
- Thêm `@ManyToOne CvFile cvFile` (`cv_file_id`)
- Thêm `boolean isPrimary` (default false)
- Bỏ trường `data`, `fileName`, `contentType`, `size` (chuyển sang `CvFile`)

**Sửa** `entity/seeker/Seeker.java`:
- Thêm `@ManyToOne SeekerCv primaryCv` hoặc `String primaryCvId` (nullable)
- Giữ `cvUrl` — compute từ CV chính để backward-compatible

**Sửa** `entity/application/Application.java`:
- Thêm `@ManyToOne CvFile cvFile` (`cv_file_id`, nullable cho dữ liệu cũ)
- Giữ `resumeUrl` trong giai đoạn chuyển đổi

### SQL Migration (`src/main/resources/db/migration/` hoặc `schema.sql`)

```sql
CREATE TABLE cv_files (
    id VARCHAR(255) PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    cv_data LONGBLOB NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Migrate existing seeker_cvs data → cv_files, then alter seeker_cvs
ALTER TABLE seeker_cvs DROP INDEX seeker_id; -- remove UNIQUE
ALTER TABLE seeker_cvs ADD COLUMN cv_file_id VARCHAR(255);
ALTER TABLE seeker_cvs ADD COLUMN is_primary BOOLEAN DEFAULT FALSE;
-- (data migration script: copy blob to cv_files, link back)

ALTER TABLE seekers ADD COLUMN primary_cv_id VARCHAR(255) NULL;
ALTER TABLE applications ADD COLUMN cv_file_id VARCHAR(255) NULL;
```

### Repositories

**Tạo** `CvFileRepository`:
- `JpaRepository<CvFile, String>`
- `Optional<CvFile> findById(String id)` (default)

**Sửa** `SeekerCvRepository`:
```java
List<SeekerCv> findBySeekerIdOrderByUpdatedAtDesc(String seekerId);
long countBySeekerId(String seekerId);
Optional<SeekerCv> findByIdAndSeekerId(String id, String seekerId);
Optional<SeekerCv> findBySeekerIdAndIsPrimaryTrue(String seekerId);
void deleteByIdAndSeekerId(String id, String seekerId);
```

**Tạo** `ApplicationRepository` query (nếu cần cleanup):
```java
boolean existsByCvFileId(String cvFileId);
```

### DTOs

**Sửa** `SeekerCvMetadataResponse`:
```java
String id;          // SeekerCv.id
String cvFileId;    // CvFile.id
String fileName;
String contentType;
long size;
boolean isPrimary;
LocalDateTime updatedAt;
```

**Sửa** `ApplicationResponse` / `ApplicationCreateResponse`:
- Thêm `String cvFileId`
- `resumePreviewUrl` → `/api/v1/cv-files/{cvFileId}/preview`

**Sửa** `ApplicationRequest` (optional part trong multipart):
- Thêm `@RequestPart(value = "cvId", required = false) String cvId` ở controller

### Error Codes (`ErrorCode.java`)

| Code | Enum | HTTP |
|------|------|------|
| 1083 | `SEEKER_CV_LIMIT_REACHED` | 400 — Đã có tối đa 3 CV |
| 1084 | `SEEKER_CV_NOT_OWNED` | 403 — CV không thuộc seeker |
| 1085 | `SEEKER_CV_PRIMARY_REQUIRED` | 400 — Phải có ít nhất 1 CV chính khi còn CV |

### Service — `SeekerService` / `SeekerServiceImpl`

| Method | Mô tả |
|--------|-------|
| `uploadMyCv(MultipartFile)` | `countBySeekerId < 3` → tạo `CvFile` + `SeekerCv`; auto primary nếu count == 0 |
| `getMyCvsMetadata()` | `List<SeekerCvMetadataResponse>` |
| `deleteMyCv(String cvId)` | Xóa `SeekerCv`; promote primary; cleanup `CvFile` nếu orphan |
| `setPrimaryCv(String cvId)` | Set `isPrimary` cho cvId, unset các CV khác |
| `getCvFileContent(String cvFileId)` | Download/preview blob |
| `getCvBySeekerCvId(String cvId)` | Preview CV của seeker (own) |

**Helper `cleanupOrphanCvFile(String cvFileId)`:**
- Nếu không còn `SeekerCv` và không còn `Application` tham chiếu → `cvFileRepository.deleteById`

**`buildCvUrl` / `buildCvPreviewUrl`:** đổi sang dùng `cvFileId`:
- `/api/v1/cv-files/{cvFileId}`
- `/api/v1/cv-files/{cvFileId}/preview`

### Service — `ApplicationServiceImpl.applyToJob`

```java
// Priority: cvFile (upload mới) > cvId (chọn có sẵn) > primary CV
if (cvFile != null && !cvFile.isEmpty()) {
    CvFile file = seekerService.uploadCvFileForApplication(cvFile); // không check limit 3? hoặc check limit
    application.setCvFile(file);
} else if (cvId != null) {
    SeekerCv cv = seekerCvRepository.findByIdAndSeekerId(cvId, seeker.getId())
        .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_OWNED));
    application.setCvFile(cv.getCvFile());
} else {
    SeekerCv primary = seekerCvRepository.findBySeekerIdAndIsPrimaryTrue(seeker.getId())
        .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_REQUIRED));
    application.setCvFile(primary.getCvFile());
}
application.setResumeUrl(buildCvUrl(application.getCvFile().getId()));
```

**Upload CV khi apply:** Nếu đã có 3 CV và upload mới → vẫn cho phép (CV apply-only, không thêm vào profile) HOẶC từ chối — **quyết định: upload khi apply tạo `CvFile` mới nhưng KHÔNG tạo `SeekerCv` nếu đã đủ 3** (chỉ dùng cho application đó).

### Controller — `SeekerController`

| Method | Path | Mô tả |
|--------|------|-------|
| `GET` | `/me/cvs` | List metadata (thay `/me/cv/metadata`) |
| `POST` | `/me/cv` | Upload (giữ path cũ) |
| `DELETE` | `/me/cvs/{cvId}` | Xóa CV cụ thể |
| `PUT` | `/me/cvs/{cvId}/primary` | Đặt CV chính |
| `GET` | `/me/cvs/{cvId}/preview` | Preview CV cụ thể |

**Tạo** `CvFileController` (`/api/v1/cv-files`):
| Method | Path | Role |
|--------|------|------|
| `GET` | `/{cvFileId}` | EMPLOYER, ADMIN — download |
| `GET` | `/{cvFileId}/preview` | EMPLOYER, ADMIN — inline preview |

**Security:** Thêm `/api/v1/cv-files/**` vào config nếu cần.

### Mapper — `ApplicationMapper`

```java
@AfterMapping
default void setResumePreviewUrl(Application app, @MappingTarget ApplicationResponse res) {
    if (app.getCvFile() != null) {
        res.setCvFileId(app.getCvFile().getId());
        res.setResumePreviewUrl("/api/v1/cv-files/" + app.getCvFile().getId() + "/preview");
    }
}
```

### Data Migration Script

`src/main/resources/db/migration/Vxxx__multi_cv.sql`:
1. Tạo `cv_files`
2. Với mỗi row `seeker_cvs` cũ: insert `cv_files`, update `seeker_cvs.cv_file_id`, set `is_primary = true`
3. Update `seekers.primary_cv_id`
4. Với mỗi `applications` có `resume_url`: map sang `cv_file_id` từ seeker's primary CV (best effort)

---

## Frontend

### Types

**Sửa** `src/types/seekerCv.types.ts`:
```typescript
export interface SeekerCvMetadataResponse {
  id: string;
  cvFileId: string;
  fileName: string;
  contentType: string;
  size: number;
  isPrimary: boolean;
  updatedAt: string;
}
```

**Sửa** `src/types/response.types.ts` — `ApplicationResponse`:
```typescript
cvFileId?: string;
resumePreviewUrl?: string; // /api/v1/cv-files/{id}/preview
```

### API Service — `seekerCvApi.ts`

| Function | Method | URL |
|----------|--------|-----|
| `getMyCvsMetadataApi()` | GET | `/api/v1/seekers/me/cvs` |
| `uploadMyCvApi(file)` | POST | `/api/v1/seekers/me/cv` |
| `deleteMyCvApi(cvId)` | DELETE | `/api/v1/seekers/me/cvs/{cvId}` |
| `setPrimaryCvApi(cvId)` | PUT | `/api/v1/seekers/me/cvs/{cvId}/primary` |
| `getCvPreviewUrl(cvId)` | — | `/api/v1/seekers/me/cvs/{cvId}/preview` |

**Giữ backward-compat:** `getMyCvMetadataApi` có thể wrap `getMyCvsMetadataApi` lấy primary.

### API Service — `applicationApi.ts`

```typescript
export const applyToJobApi = (
  jobId: number,
  request: ApplicationRequest,
  options?: { cvFile?: File | null; cvId?: string | null }
) => {
  // formData: request, cvFile?, cvId?
};
```

### Pages / Components

**`CVManager/index.tsx`:**
- State: `cvs: SeekerCvMetadataResponse[]` thay `cvMetadata` đơn
- UI: list tối đa 3 card CV (fileName, updatedAt, badge "CV chính", preview, delete, set primary)
- Upload button disabled + thông báo khi `cvs.length >= 3`
- Xóa CV chính → refresh list (backend auto-promote)

**`JobApplications/index.tsx`:**
- Fetch `getMyCvsMetadataApi()` thay `getMyCvMetadataApi()`
- CV mode: `select` (chọn từ list) | `upload` (file mới)
- Radio/dropdown hiển thị danh sách CV; default = CV chính (`isPrimary`)
- Submit: gửi `cvId` hoặc `cvFile`
- Nếu chưa có CV → bắt buộc upload

**`ProfileOverview/index.tsx`:**
- Hiển thị CV chính từ list (hoặc count "X CV đã tải lên")

**Employer `EmployerApplications`:**
- Preview dùng `resumePreviewUrl` từ response (đã trỏ `cv-files`)

### i18n (`public/locales/{vi,en}/jobseeker.json`)

Thêm keys:
- `cvManager.primaryCV` — "CV chính" / "Primary CV"
- `cvManager.setPrimary` — "Đặt làm CV chính"
- `cvManager.limitReached` — "Bạn đã tải tối đa 3 CV"
- `cvManager.cvCount` — "{{count}}/3 CV"
- `cvManager.selectCV` — "Chọn CV"
- `jobApplications.selectCvLabel` — "Chọn CV ứng tuyển"
- `jobApplications.useExistingCv` — "Dùng CV có sẵn"
- `jobApplications.uploadNewCv` — "Tải CV mới"

### Routes

Không đổi route hiện tại.

---

## Verification

### Backend
```bash
cd it-viec-backend && ./mvnw test
```
Targeted tests (nên thêm):
- `SeekerCvServiceTest` — upload limit 3, auto primary, delete promote
- `ApplicationServiceTest` — apply với cvId, cvFile, snapshot cvFileId

### Frontend
```bash
cd it-viec-frontend && npm run type-check
```

### Manual Checklist

- [ ] Upload CV đầu tiên → auto primary, hiển thị badge
- [ ] Upload CV thứ 2, 3 → list 3 card, có thể đổi primary
- [ ] Upload CV thứ 4 → thông báo lỗi
- [ ] Xóa CV không phải primary → list cập nhật
- [ ] Xóa CV primary → CV còn lại được promote
- [ ] Ứng tuyển chọn CV có sẵn → employer xem đúng CV đó
- [ ] Ứng tuyển upload CV mới → employer xem CV mới
- [ ] Seeker xóa CV đã dùng ứng tuyển → employer vẫn xem được CV trong application
- [ ] ProfileOverview hiển thị CV chính
