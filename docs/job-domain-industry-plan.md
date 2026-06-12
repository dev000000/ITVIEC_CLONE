# Job Domain & Industry — Implementation Plan

## Summary

Chuẩn hóa **2 taxonomy admin-managed** để mở rộng platform từ IT-only sang đa ngành:

| Resource | Gắn với | Hiện tại | Mục tiêu |
|----------|---------|----------|----------|
| **Job Domain** | `jobs.job_domain_id` | Không có | Select khi employer đăng job; filter tìm việc sau |
| **Industry** | `companies.industry_id` | `industry VARCHAR(100)` free text | Select khi employer cập nhật profile công ty |

Seed ban đầu: **42 giá trị giống ITviec** (danh sách user cung cấp). Hai bảng **tách riêng** để admin có thể bổ sung/sửa từng loại độc lập khi mở rộng sang non-IT.

### Vì sao 2 bảng, không gộp 1 bảng `sectors`?

- **Job domain** mô tả *lĩnh vực công việc đang tuyển* (có thể khác ngành công ty).
- **Industry** mô tả *ngành của công ty* (profile employer).
- Ban đầu trùng 42 giá trị, nhưng về sau có thể diverge (vd. công ty `Staffing and Recruiting` đăng job thuộc `IT Services and IT Consulting`).
- Admin quản lý riêng → UX filter/search rõ ràng hơn khi scale.

> **Ghi chú thiết kế:** Nếu sau này muốn DRY hơn, có thể refactor thành bảng `sectors` + bảng junction `sector_usages(job_domain|industry)` — **không làm ở phase 1** để giữ scope nhỏ.

---

## Phân tích hiện trạng

### Database (`schema.sql`)

```sql
-- companies
industry VARCHAR(100)   -- free text, không FK

-- jobs
-- không có job_domain
```

### Mock data (`data.sql`)

Company `industry` đang là **text tự do tiếng Việt**, không khớp list ITviec:

| Company (mock) | industry hiện tại | Map sang seed EN |
|----------------|-------------------|------------------|
| MB bank | Ngân Hàng | Banking |
| Scandinavian Software Park | Sản Phẩm Phần Mềm và Dịch Vụ Web | Software Products and Web Services |
| ONE Tech Stop | Dịch Vụ và Tư Vấn IT | IT Services and IT Consulting |
| Mcredit | Dịch Vụ Tài Chính | Financial Services |
| TymeX | Ngân Hàng | Banking |
| ANDPAD | Dịch Vụ và Tư Vấn IT | IT Services and IT Consulting |
| … | … | … |

Cần **migration mapping** khi chuyển sang FK — không copy thẳng text cũ.

### Backend

- `Company.industry`: `String` — validate `@NotBlank` ở `CompanyServiceImpl`
- `Job`: không có domain field
- `JobCreateRequest` / `JobUpdateRequest`: không có jobDomain
- Không có API list industry/job domain

### Frontend

- `EmployerProfile`: `<Input />` cho industry
- Job create/edit: **chưa có** job domain field
- `JobSearch`: filter theo city, keyword, experience, jobType, salary — **chưa có** job domain
- Response types: `industry: string`

### Pattern tái sử dụng

Feature **Skill Management** (`docs/skill-management-plan.md`) đã có:

- Bảng master + `status` ACTIVE/DEPRECATED
- Public GET chỉ ACTIVE
- Admin CRUD tại `/api/v1/admin/skills`
- Soft delete + merge khi có FK references

**Job domain / Industry** có thể dùng pattern **đơn giản hơn skill** ở phase 1:

- Soft delete (DEPRECATED) — **bắt buộc** vì có FK
- Merge — **phase 2** (ít phức tạp hơn skill vì mỗi job/company chỉ 1 FK, không junction N-N)
- Phase 1 admin: create / rename / deprecate (block nếu đang dùng, gợi ý chọn thay thế thủ công)

---

## Database

> Project dùng `schema.sql` + `data.sql` trực tiếp (không Flyway). Sửa `schema.sql`, cập nhật `data.sql`, chạy `reset-db.ps1`.

### 1. Bảng `job_domains`

```sql
CREATE TABLE job_domains (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  domain_name VARCHAR(150) NOT NULL,
  status ENUM('ACTIVE', 'DEPRECATED') NOT NULL DEFAULT 'ACTIVE',
  merged_into_id BIGINT NULL,
  CONSTRAINT fk_job_domains_merged_into
    FOREIGN KEY (merged_into_id) REFERENCES job_domains(id),
  CONSTRAINT uk_job_domains_name UNIQUE (domain_name)
);
CREATE INDEX idx_job_domains_status ON job_domains(status);
```

### 2. Bảng `industries`

```sql
CREATE TABLE industries (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  industry_name VARCHAR(150) NOT NULL,
  status ENUM('ACTIVE', 'DEPRECATED') NOT NULL DEFAULT 'ACTIVE',
  merged_into_id BIGINT NULL,
  CONSTRAINT fk_industries_merged_into
    FOREIGN KEY (merged_into_id) REFERENCES industries(id),
  CONSTRAINT uk_industries_name UNIQUE (industry_name)
);
CREATE INDEX idx_industries_status ON industries(status);
```

### 3. Sửa `jobs`

```sql
-- Thêm vào CREATE TABLE jobs:
job_domain_id BIGINT NULL,
CONSTRAINT fk_jobs_job_domain FOREIGN KEY (job_domain_id) REFERENCES job_domains(id)
```

- Nullable ban đầu cho migration; mock jobs gán domain IT phù hợp.
- Sau phase 1 ổn định → có thể `NOT NULL` cho job mới (validate ở service).

### 4. Sửa `companies`

```sql
-- Xóa:
industry VARCHAR(100),

-- Thêm:
industry_id BIGINT NULL,
CONSTRAINT fk_companies_industry FOREIGN KEY (industry_id) REFERENCES industries(id)
```

### 5. Seed data (`data.sql`)

**Thứ tự insert:** `job_domains` → `industries` → update `companies` → update `jobs`

42 giá trị (cùng list cho cả 2 bảng):

```
Blockchain & Web3 Services
Food and Beverage
Tourism and Hospitality Services
Insurance
Consumer Goods
E-commerce
Education and Training
Banking
Game
Government
IT Hardware and Computing
Non-Profit and Social Services
Manufacturing and Engineering
Media, Advertising and Entertainment
Environment
Pharmaceuticals
Real Estate, Property and Construction
Retail and Wholesale
IT Services and IT Consulting
Telecommunication
Transportation, Logistics and Warehouse
Cyber Security
Trading and Commercial
Network and Infrastructure
Software Development Outsourcing
Software Products and Web Services
Agriculture
Sports and Fitness
Apparel and Fashion
Creative and Design
Staffing and Recruiting
Publishing and Printing
Facility Management
Research Services
Healthcare
Materials and Mining
Utilities
Professional Services
Securities & Investment
Financial Services
Emerging Tech R&D
AI Software & Services
```

**Mock companies:** map text cũ → `industry_id` (xem bảng mapping ở trên + bổ sung cho ~9 companies).

**Mock jobs (~14 jobs IT):** gán `job_domain_id` mặc định:

- Dev/QA/PM IT roles → `IT Services and IT Consulting` hoặc `Software Products and Web Services`
- Fintech/banking roles → `Banking` / `Financial Services`
- Có thể vary 2–3 domain để test filter sau này

---

## Backend

### Package layout

```
entity/
  jobdomain/JobDomain.java
  industry/Industry.java
enums/
  TaxonomyStatus.java          -- ACTIVE | DEPRECATED (dùng chung, hoặc reuse SkillStatus)
repository/
  JobDomainRepository.java
  IndustryRepository.java
service/
  JobDomainService.java / impl
  IndustryService.java / impl
controller/
  JobDomainController.java     -- public GET
  IndustryController.java      -- public GET
  AdminJobDomainController.java
  AdminIndustryController.java
```

### Entity fields

Giống `Skill` (rút gọn):

```java
// JobDomain
Long id;
String domainName;
TaxonomyStatus status = ACTIVE;
Long mergedIntoId;

// Industry
Long id;
String industryName;
TaxonomyStatus status = ACTIVE;
Long mergedIntoId;
```

### Entity relations

```java
// Job.java
@ManyToOne(fetch = LAZY)
@JoinColumn(name = "job_domain_id")
JobDomain jobDomain;

// Company.java — thay String industry
@ManyToOne(fetch = LAZY)
@JoinColumn(name = "industry_id")
Industry industry;
```

### Repository methods (mỗi bảng)

```java
List<JobDomain> findAllByStatusOrderByDomainNameAsc(TaxonomyStatus status);
boolean existsByDomainNameIgnoreCase(String name);
boolean existsByDomainNameIgnoreCaseAndIdNot(String name, Long id);
Page<JobDomain> findAllWithFilter(TaxonomyStatus status, String search, Pageable pageable);
long countJobUsage(@Param("id") Long id);   // native: SELECT COUNT(*) FROM jobs WHERE job_domain_id = ?

// Industry tương tự + countCompanyUsage
```

### DTOs

**Public response (select box):**

```java
JobDomainResponse { Long id; String domainName; }
IndustryResponse { Long id; String industryName; }
```

**Admin response (giống SkillAdminResponse):**

```java
JobDomainAdminResponse {
  Long id; String domainName; TaxonomyStatus status;
  Long mergedIntoId; String mergedIntoName;
  long jobCount;
}
IndustryAdminResponse {
  Long id; String industryName; TaxonomyStatus status;
  Long mergedIntoId; String mergedIntoName;
  long companyCount;
}
```

**Request thay đổi:**

```java
// CompanyUpdateRequest — thay String industry
Industry industry;   // hoặc Long industryId — theo pattern Skill hiện tại dùng entity ref

// JobCreateRequest / JobUpdateRequest — thêm
JobDomain jobDomain; // @NotNull ở phase 1b
```

**Response thay đổi:**

```java
// CompanyBriefResponse, CompanyDetailResponse
IndustryResponse industry;  // thay String industry

// JobCardResponse, JobDetailResponse
JobDomainResponse jobDomain;  // thêm field mới
```

### Error codes (thêm vào `ErrorCode.java`)

```java
JOB_DOMAIN_NOT_FOUND(1122, ..., NOT_FOUND),
JOB_DOMAIN_NAME_EXISTED(1123, ..., BAD_REQUEST),
JOB_DOMAIN_IN_USE(1124, ..., CONFLICT),
JOB_DOMAIN_DEPRECATED(1125, ..., BAD_REQUEST),

INDUSTRY_NOT_FOUND(1126, ..., NOT_FOUND),
INDUSTRY_NAME_EXISTED(1127, ..., BAD_REQUEST),
INDUSTRY_IN_USE(1128, ..., CONFLICT),
INDUSTRY_DEPRECATED(1129, ..., BAD_REQUEST),
```

Exception `JobDomainInUseException` / `IndustryInUseException` — pattern `SkillInUseException` (usage count trong `ApiResponse.result`).

### API endpoints

#### Public (select box)

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/v1/job-domains` | Public — ACTIVE only |
| GET | `/api/v1/industries` | Public — ACTIVE only |

Thêm vào `SecurityConfig.PUBLIC_URLS_GET`.

#### Admin CRUD (pattern `/api/v1/admin/skills`)

**Job Domains** — `/api/v1/admin/job-domains`

| Method | Path | Action |
|--------|------|--------|
| GET | `/` | Paginated list (`status`, `search`, `page`, `size`) |
| POST | `/` | Create |
| PATCH | `/{id}` | Rename |
| DELETE | `/{id}` | Deprecate (409 nếu có jobs) |
| PATCH | `/{id}/restore` | Restore (non-merged only) |
| POST | `/{id}/merge` | Phase 2 — migrate `jobs.job_domain_id` |

**Industries** — `/api/v1/admin/industries` — tương tự, usage = companies.

#### Business APIs cập nhật

- `CompanyServiceImpl.updateCompany` — validate `industry` FK ACTIVE
- `JobServiceImpl.create/update` — validate `jobDomain` FK ACTIVE
- `JobServiceImpl.searchJobs` — **phase 2:** thêm param `jobDomainId`
- `CompanyServiceImpl.getAdminCompanies` — **phase 2:** filter `industryId`

### Merge logic (Phase 2 — tùy chọn)

Đơn giản hơn skill (1 FK, không junction):

```sql
UPDATE jobs SET job_domain_id = :targetId WHERE job_domain_id = :sourceId;
-- source → DEPRECATED, merged_into_id = targetId
```

Không cần `INSERT IGNORE` duplicate handling.

### Tests

- `JobDomainServiceImplTest` — duplicate, deprecate unused/in-use, restore
- `IndustryServiceImplTest` — tương tự
- `CompanyServiceImplTest` — update với industry ACTIVE/DEPRECATED
- `JobServiceImplTest` — create job với jobDomain

---

## Frontend

### Types (`response.types.ts`)

```typescript
export interface JobDomainResponse {
  id: number;
  domainName: string;
}

export interface IndustryResponse {
  id: number;
  industryName: string;
}

// Admin types — mirror SkillAdminResponse pattern
export interface JobDomainAdminResponse { ... }
export interface IndustryAdminResponse { ... }
```

### API services

```
src/services/jobDomainApi.ts      — getAllJobDomainsApi()
src/services/industryApi.ts       — getAllIndustriesApi()
src/services/adminJobDomainApi.ts — admin CRUD
src/services/adminIndustryApi.ts  — admin CRUD
```

### Form changes (Phase 1 — ưu tiên)

| Màn hình | Thay đổi |
|----------|----------|
| `EmployerProfile` | `Input industry` → `Select` load từ `getAllIndustriesApi()`, value = `industry.id` |
| Employer job create/edit | Thêm `Form.Item jobDomain` — `Select` từ `getAllJobDomainsApi()` |
| `CardInforEmployer`, `EmployerDetailInfo` | Hiển thị `company.industry.industryName` |
| Job detail / card | Hiển thị `job.jobDomain.domainName` (optional badge) |

**Request payload:** đổi từ `{ industry: "text" }` sang `{ industry: { id: number } }` — khớp pattern `skills: [{ id }]` hiện tại.

### Admin pages (Phase 1b)

Clone pattern `AdminSkills` (đơn giản hơn — không cần merge dialog phase 1):

- `/admin/job-domains` — `AdminJobDomains`
- `/admin/industries` — `AdminIndustries`
- Sidebar menu + i18n namespace `admin.jobDomains`, `admin.industries`

### Job search filter (Phase 2)

- `JobSearch` sidebar: thêm multi-select job domain (giống ITviec checkbox list)
- `searchJobsApi` params: `jobDomainIds?: number[]`
- Backend `JobRepository` spec filter `jobDomain.id IN (...)`

### i18n

- `employer:profile.form.industry` — giữ label
- `employer:jobs.form.jobDomain` — label mới
- `admin.jobDomains.*`, `admin.industries.*`
- `common.apiErrors.1122`–`1129`

---

## Migration checklist (data.sql)

1. [ ] INSERT 42 rows vào `job_domains`
2. [ ] INSERT 42 rows vào `industries`
3. [ ] ALTER companies INSERT: `industry_id` subquery thay `industry` text
4. [ ] ALTER jobs INSERT: thêm `job_domain_id` column + values
5. [ ] Xóa cột `industry` khỏi companies schema
6. [ ] Verify FK constraints pass on reset-db

**Mapping mock companies (draft):**

| industry text (cũ) | industry_name (seed) |
|--------------------|----------------------|
| Ngân Hàng | Banking |
| Sản Phẩm Phần Mềm và Dịch Vụ Web | Software Products and Web Services |
| Dịch Vụ và Tư Vấn IT | IT Services and IT Consulting |
| Dịch Vụ Tài Chính | Financial Services |

*(Cần audit đủ 9 companies trong data.sql trước khi viết SQL)*

---

## Triển khai theo phase

### Phase 1a — Foundation (Backend + DB + public API)

**Scope:** schema, seed, entities, public GET, cập nhật Company/Job entity + DTO mapper

| Task | Files chính |
|------|-------------|
| Schema + seed | `schema.sql`, `data.sql` |
| Entities + repos | `JobDomain`, `Industry`, repositories |
| Public controllers | `JobDomainController`, `IndustryController` |
| Company FK migration | `Company.java`, `CompanyUpdateRequest`, mappers, `CompanyServiceImpl` |
| Job FK | `Job.java`, `JobCreateRequest`, `JobUpdateRequest`, mappers, `JobServiceImpl` |
| SecurityConfig | public URLs |
| Tests | service tests cơ bản |

**Verify:** `./mvnw test`, `reset-db.ps1`

### Phase 1b — Frontend forms

| Task | Files chính |
|------|-------------|
| API + types | `jobDomainApi.ts`, `industryApi.ts`, types |
| Employer profile Select | `EmployerProfile/index.tsx` |
| Job form Select | employer job create/edit pages |
| Display components | `CardInforEmployer`, job cards |

**Verify:** `npm run type-check`, manual employer profile + job create

### Phase 2 — Admin CRUD

| Task | Files chính |
|------|-------------|
| Admin services + controllers | `AdminJobDomainController`, `AdminIndustryController` |
| Admin pages | `AdminJobDomains`, `AdminIndustries` |
| Error handling + i18n | ErrorCode, common.json, admin.json |
| Deprecate in-use flow | 409 → thông báo usage count |

**Verify:** admin CRUD end-to-end, `./mvnw test -Dtest=JobDomainServiceImplTest,IndustryServiceImplTest`

### Phase 3 — Search & filter (mở rộng đa ngành)

| Task | Mô tả |
|------|-------|
| Job search filter | Multi-select job domain trên `JobSearch` |
| Company admin filter | Filter companies theo industry |
| Merge API | Admin merge job domain / industry (optional) |
| `NOT NULL` constraint | Job mới bắt buộc có jobDomain |

---

## Rủi ro & quyết định

| # | Vấn đề | Quyết định |
|---|--------|------------|
| 1 | 42 giá trị trùng nhau ở 2 bảng | Chấp nhận — admin quản lý độc lập, dễ mở rộng |
| 2 | Mock company industry tiếng Việt | Map thủ công sang seed EN khi migrate data.sql |
| 3 | Job cũ không có domain | Nullable FK + gán default IT domain trong seed |
| 4 | Breaking API `industry: string` | Breaking change có kiểm soát — cập nhật FE + BE cùng lúc |
| 5 | Merge phức tạp | Phase 2 — phase 1 chỉ block delete nếu in-use |
| 6 | Slug/code cho taxonomy | Không cần phase 1 — `domain_name`/`industry_name` UNIQUE đủ |

---

## So sánh với Skill Management

| | Skill | Job Domain / Industry |
|---|-------|----------------------|
| FK pattern | N-N junction (job_skills, …) | 1-N đơn giản (job → domain, company → industry) |
| Merge | INSERT IGNORE + delete junction | UPDATE FK trực tiếp |
| Public API | `/api/v1/skills` | `/api/v1/job-domains`, `/api/v1/industries` |
| Admin page | `/admin/skills` (đã có) | `/admin/job-domains`, `/admin/industries` |
| Usage count | jobs + seekers + companies | jobs HOẶC companies (1 loại mỗi resource) |

Có thể **extract shared `TaxonomyService` base** sau phase 2 — không over-engineer phase 1.

---

## Verification

### Backend

```bash
cd it-viec-backend
./mvnw test -Dtest=JobDomainServiceImplTest,IndustryServiceImplTest,CompanyServiceImplTest,JobServiceImplTest
```

### Frontend

```bash
cd it-viec-frontend
npm run type-check
```

### Manual

- [ ] Reset DB thành công, 42 job domains + 42 industries seeded
- [ ] Employer profile: industry là Select, lưu/load đúng
- [ ] Employer tạo job: chọn job domain, hiển thị trên job detail
- [ ] Public GET trả ACTIVE only
- [ ] Admin deprecate domain/industry không dùng → OK
- [ ] Admin deprecate đang có jobs/companies → 409 + usage count

---

*Plan version 1.0 — job domain & industry taxonomy for multi-sector expansion*
