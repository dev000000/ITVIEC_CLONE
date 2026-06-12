# Skill Management — Admin CRUD, Soft Delete & Merge

## Summary

Admin cần quản lý bảng `skills` (hiện chỉ có `id`, `skill_name`). Skill được FK bởi 4 bảng junction/tag:

```
skills ← seeker_skills
skills ← company_skills
skills ← job_skills
skills ← popular_tags (UNIQUE skill_id)
```

**Hard DELETE vi phạm FK** → dùng **soft delete (`DEPRECATED`)** + **merge** để chuyển references sang skill đích.

### Điều chỉnh so với plan gốc (Downloads)

| Plan gốc | Điều chỉnh cho project-itviec |
|----------|-------------------------------|
| Flyway `V3__*.sql` | Sửa trực tiếp `schema.sql` + `data.sql` (`spring.sql.init.mode=always`, không Flyway) |
| `/admin/skills` | `/api/v1/admin/skills` + `ApiResponse<T>` wrapper (`code: 1000`) |
| Custom exceptions + Map body | `AppException(ErrorCode)` + `SkillInUseException` (usageCount trong `ApiResponse.result`) |
| `PageResponse.content` | `PageResponse.data` (+ `totalPages`, `isFirst`, `isLast`) |
| `fetch()` API client | `apiClient` qua `src/services/adminSkillApi.ts` |
| Toast notifications | Swal (pattern Admin pages hiện tại) |
| `SkillController` mới hoàn toàn | Giữ `SkillController` GET public; tách admin sang `AdminSkillController` |
| POST create trên `/api/v1/skills` | Chuyển create sang admin controller only |
| `existsBySkillName` (case-sensitive) | `existsBySkillNameIgnoreCase` |
| Không có JobSkillRepository | Native SQL qua `JdbcTemplate` cho merge + count (không có entity junction) |

### Nguyên tắc

| Rule | Lý do |
|------|-------|
| Không hard DELETE skill | Bảo toàn lịch sử job/seeker/company |
| Sửa tên → UPDATE thẳng | Chuẩn hóa tên toàn hệ thống |
| Xóa skill đang dùng → merge trước | Tránh orphaned references |
| Merge trong 1 `@Transactional` | Atomic |
| Public `GET /api/v1/skills` chỉ trả ACTIVE | Select box không hiện skill deprecated |
| Restore chỉ cho skill deprecated **không merge** | Restore skill đã merge không hoàn tác FK |

---

## Backend

### 1. Schema — `it-viec-backend/src/main/resources/db/schema.sql`

Thay block `CREATE TABLE skills`:

```sql
CREATE TABLE skills (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  skill_name VARCHAR(100) NOT NULL,
  status ENUM('ACTIVE', 'DEPRECATED') NOT NULL DEFAULT 'ACTIVE',
  merged_into_id BIGINT NULL,
  CONSTRAINT fk_skills_merged_into FOREIGN KEY (merged_into_id) REFERENCES skills(id)
);
CREATE INDEX idx_skills_status ON skills(status);
```

`data.sql`: giữ nguyên `INSERT INTO skills (skill_name) VALUES (...)` — cột mới dùng DEFAULT `ACTIVE`.

---

### 2. Enum — `com.dev001.itviec.enums.SkillStatus`

```java
public enum SkillStatus { ACTIVE, DEPRECATED }
```

---

### 3. Entity — `com.dev001.itviec.entity.skill.Skill`

Thêm fields:

```java
@Enumerated(EnumType.STRING)
@Column(nullable = false)
@Builder.Default
SkillStatus status = SkillStatus.ACTIVE;

@Column(name = "merged_into_id")
Long mergedIntoId;
```

---

### 4. Repository — `com.dev001.itviec.repository.SkillRepository`

```java
boolean existsBySkillNameIgnoreCase(String skillName);
boolean existsBySkillNameIgnoreCaseAndIdNot(String skillName, Long id);
List<Skill> findAllByStatusOrderBySkillNameAsc(SkillStatus status);

@Query("""
    SELECT s FROM Skill s
    WHERE (:status IS NULL OR s.status = :status)
      AND (:search IS NULL OR :search = '' OR LOWER(s.skillName) LIKE LOWER(CONCAT('%', :search, '%')))
    ORDER BY s.skillName ASC
    """)
Page<Skill> findAllWithFilter(@Param("status") SkillStatus status, @Param("search") String search, Pageable pageable);

@Query(value = "SELECT COUNT(*) FROM job_skills WHERE skill_id = :skillId", nativeQuery = true)
long countJobUsage(@Param("skillId") Long skillId);

@Query(value = "SELECT COUNT(*) FROM seeker_skills WHERE skill_id = :skillId", nativeQuery = true)
long countSeekerUsage(@Param("skillId") Long skillId);

@Query(value = "SELECT COUNT(*) FROM company_skills WHERE skill_id = :skillId", nativeQuery = true)
long countCompanyUsage(@Param("skillId") Long skillId);
```

**PopularTagRepository** — thêm:

```java
void deleteBySkillId(Long skillId);
```

---

### 5. Error codes — `com.dev001.itviec.exception.ErrorCode`

Thêm (sau `SKILL_NOT_FOUND`):

```java
SKILL_IN_USE(1119, "Skill is in use, merge before delete", HttpStatus.CONFLICT),
SKILL_MERGE_INVALID(1120, "Invalid skill merge operation", HttpStatus.BAD_REQUEST),
SKILL_DEPRECATED(1121, "Skill is deprecated", HttpStatus.BAD_REQUEST),
```

Giữ `SKILL_NAME_EXISTED` (1027, BAD_REQUEST) — nhất quán với `CITY_NAME_EXISTED`.

---

### 6. Exception — `com.dev001.itviec.exception.SkillInUseException`

```java
@Getter
public class SkillInUseException extends AppException {
    private final SkillUsageCountResponse usageCount;

    public SkillInUseException(SkillUsageCountResponse usageCount) {
        super(ErrorCode.SKILL_IN_USE);
        this.usageCount = usageCount;
    }
}
```

**GlobalExceptionHandler** — thêm handler:

```java
@ExceptionHandler(SkillInUseException.class)
ResponseEntity<ApiResponse> handleSkillInUse(SkillInUseException ex) {
    ErrorCode errorCode = ex.getErrorCode();
    return ResponseEntity.status(errorCode.getStatusCode())
        .body(ApiResponse.builder()
            .code(errorCode.getCode())
            .message(errorCode.getMessage())
            .result(ex.getUsageCount())
            .build());
}
```

---

### 7. DTOs

**Request** (`dto/request/`):

- `SkillUpdateRequest` — `@NotBlank skillName`
- `SkillMergeRequest` — `@NotNull Long targetSkillId`

Giữ `SkillCreateRequest` (dùng cho admin create).

**Response** (`dto/response/`):

```java
// SkillUsageCountResponse.java
public class SkillUsageCountResponse {
    long jobs;
    long seekers;
    long companies;
}

// SkillAdminResponse.java — admin list/detail
public class SkillAdminResponse {
    Long id;
    String skillName;
    SkillStatus status;
    Long mergedIntoId;
    String mergedIntoName;  // null nếu không merge
    SkillUsageCountResponse usageCount;
}

// MergeSkillResponse.java
public class MergeSkillResponse {
    String message;
    SkillUsageCountResponse migratedRecords;
    SkillAdminResponse sourceSkill;
    SkillAdminResponse targetSkill;
}
```

**Public `SkillResponse`** giữ `{ id, skillName }` — không breaking change.

---

### 8. Service — `SkillService` / `SkillServiceImpl`

**Public (giữ + sửa):**

- `getAllSkills()` → `findAllByStatusOrderBySkillNameAsc(ACTIVE)` only

**Admin (thêm):**

```java
PageResponse<SkillAdminResponse> getAdminSkills(SkillStatus status, String search, int page, int size);
SkillAdminResponse createSkillAdmin(String skillName);  // hoặc dùng lại createSkill
SkillAdminResponse updateSkill(Long id, String skillName);
SkillAdminResponse deprecateSkill(Long id);
MergeSkillResponse mergeSkill(Long sourceId, Long targetSkillId);
SkillAdminResponse restoreSkill(Long id);
```

**Logic merge** (`@Transactional`, `JdbcTemplate`):

1. Validate: source ≠ target, source ACTIVE, target ACTIVE
2. Count migrated records
3. `INSERT IGNORE INTO job_skills ...` (targetId, sourceId)
4. `INSERT IGNORE INTO seeker_skills ...`
5. `INSERT IGNORE INTO company_skills ...`
6. `DELETE FROM job_skills/seeker_skills/company_skills WHERE skill_id = sourceId`
7. `popularTagRepository.deleteBySkillId(sourceId)`
8. source.status = DEPRECATED, mergedIntoId = targetId

**Deprecate:** throw `SkillInUseException` nếu bất kỳ count > 0.

**Restore:** chỉ khi DEPRECATED và `mergedIntoId IS NULL`; nếu đã merge → `SKILL_MERGE_INVALID`.

**Duplicate:** `existsBySkillNameIgnoreCase` / `AndIdNot` → `AppException(SKILL_NAME_EXISTED)`.

---

### 9. Controllers

**`SkillController`** — `/api/v1/skills`

- `GET` — public, ACTIVE skills only
- **Xóa** `@PostMapping` create (chuyển sang admin)

**`AdminSkillController`** — `/api/v1/admin/skills` — `@PreAuthorize("hasRole('ADMIN')")`

| Method | Path | Action |
|--------|------|--------|
| GET | `/` | Paginated list (`status`, `search`, `page`, `size`) |
| POST | `/` | Create |
| PATCH | `/{id}` | Update name |
| DELETE | `/{id}` | Deprecate (soft delete) |
| POST | `/{id}/merge` | Merge into target |
| PATCH | `/{id}/restore` | Restore (non-merged deprecated only) |

Tất cả trả `ApiResponse<T>` với `.code(1000)`.

---

### 10. Mapper — `SkillMapper`

Thêm mapping `Skill` → `SkillAdminResponse` (manual trong service cũng được vì cần usageCount + mergedIntoName).

---

## Frontend

### 1. Types — `src/types/`

**`response.types.ts`:**

```typescript
export interface SkillUsageCountResponse {
  jobs: number;
  seekers: number;
  companies: number;
}

export interface SkillAdminResponse {
  id: number;
  skillName: string;
  status: 'ACTIVE' | 'DEPRECATED';
  mergedIntoId: number | null;
  mergedIntoName: string | null;
  usageCount: SkillUsageCountResponse;
}

export interface MergeSkillResponse {
  message: string;
  migratedRecords: SkillUsageCountResponse;
  sourceSkill: SkillAdminResponse;
  targetSkill: SkillAdminResponse;
}
```

**`request.types.ts`:**

```typescript
export interface SkillMergeRequest {
  targetSkillId: number;
}
```

Giữ `SkillCreateRequest`, `SkillResponse` (public).

---

### 2. API — `src/services/adminSkillApi.ts`

Dùng `apiClient` + `Configs.API_ENDPOINT + '/api/v1/admin/skills'`.

```typescript
getAdminSkillsApi(params: { status?, search?, page?, size? })
createSkillAdminApi(request: SkillCreateRequest)
updateSkillAdminApi(id, request: SkillUpdateRequest)
deprecateSkillAdminApi(id)  // catch 409, read response.data.result as usageCount
mergeSkillAdminApi(id, request: SkillMergeRequest)
restoreSkillAdminApi(id)
```

Export từ `src/services/index.ts`.

**`skillApi.ts`:** xóa `createSkillApi` (hoặc redirect sang admin — prefer xóa).

---

### 3. Page — `src/pages/Admin/AdminSkills/index.tsx`

Pattern giống `AdminPopularTags` / `AdminUsers`: Ant Design Table, Card, Swal, i18n.

**UI:**
- Header + nút "Thêm skill"
- Filter: search (debounce 300ms), status Select (All / ACTIVE / DEPRECATED)
- Table columns: tên, trạng thái (Tag), usage (`{jobs} jobs · {seekers} seekers · {companies} cos` hoặc `—`), actions
- DEPRECATED + mergedIntoName → badge xám + `→ {mergedIntoName}`
- ACTIVE: inline edit tên (Enter/✓ save, Esc/✗ cancel), nút Xóa
- DEPRECATED (không merge): nút Restore

**Modals:**
- Create skill modal
- Delete confirm → nếu 409 (`code 1119`) auto mở merge dialog với usageCount từ `response.data.result`
- Merge dialog: Select search ACTIVE skills (exclude self), preview counts, confirm

**Files:** `AdminSkills/index.tsx`, `AdminSkills.scss`, import `AdminCommon.scss`

---

### 4. Routing — `src/routes/AdminPrivateRoute.tsx`

```typescript
{ path: "skills", element: <AdminSkills /> }
```

---

### 5. Layout menu — `src/layout/LayoutAdmin/index.tsx`

Thêm MenuItem `link: "skills"`, icon phù hợp (e.g. `FiCpu` hoặc `FiTool`).

---

### 6. i18n — `public/locales/{vi,en}/admin.json`

Namespace `skills`:

- `title`, `addButton`, `searchPlaceholder`
- `filters.all`, `filters.active`, `filters.deprecated`
- `columns.*`, `status.active`, `status.deprecated`, `status.mergedInto`
- `usage.none`, `usage.summary`
- `actions.edit`, `actions.delete`, `actions.restore`, `actions.merge`
- `create.*`, `delete.*`, `merge.*`, `restore.*`
- `notifications.*`

**`common.json` `apiErrors`:**

```json
"1119": "Skill đang được sử dụng, cần merge trước khi xóa",
"1120": "Thao tác merge không hợp lệ",
"1121": "Skill đã bị deprecated"
```

(en tương ứng)

---

## Verification

### Backend tests — `SkillServiceImplTest.java`

- Create duplicate (case-insensitive) → SKILL_NAME_EXISTED
- Deprecate unused → DEPRECATED
- Deprecate in-use → SkillInUseException + usageCount
- Merge valid → source DEPRECATED, FK migrated, duplicate seeker handled
- Merge same id / deprecated source / deprecated target → SKILL_MERGE_INVALID
- Restore non-merged deprecated → ACTIVE
- Restore merged skill → SKILL_MERGE_INVALID

Chạy: `./mvnw test -Dtest=SkillServiceImplTest`

### Frontend

Chạy: `npm run type-check`

### Manual checklist

- [ ] Public skill select (Employer job form, seeker profile) không hiện DEPRECATED
- [ ] Admin list paginate + search + filter status
- [ ] Create / inline edit / deprecate / merge / restore end-to-end
- [ ] 409 delete → merge dialog với usage counts
- [ ] AdminPopularTags vẫn load skills (ACTIVE only)

---

*Plan version 1.1 — adjusted for project-itviec conventions*
