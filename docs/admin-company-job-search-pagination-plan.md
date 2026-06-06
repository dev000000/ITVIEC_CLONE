# Admin Company/Job Search & Pagination - Implementation Plan

## 1. Phan tich hien trang

### Backend - Luong hien tai

| Layer | File | Mo ta |
|-------|------|-------|
| **Controller** | `JobController.java` | Da co `GET /api/v1/admin/jobs` cho admin, nhan filter `title`, `companyName`, `status`, `jobType`, `cityId`, nhung dang tra ve `List<JobDetailResponse>` va chua co `page`, `size`, `postedAt` |
| **Service** | `JobService.java`, `JobServiceImpl.java` | Admin jobs da dung `Specification<Job>` de filter ket hop, phu hop de mo rong them pagination va date range |
| **Repository** | `JobRepository.java` | Da ke thua `JpaSpecificationExecutor<Job>` va override `findAll(Specification<Job> spec)` dang `List`, nhung chua co paged overload ro rang |
| **Controller** | `CompanyController.java` | Hien chi co public APIs va employer self-service APIs, chua co admin company listing API |
| **Service** | `CompanyService.java`, `CompanyServiceImpl.java` | Dang phuc vu public company list, company detail, employer update/get my company; chua co admin search/filter/pagination flow |
| **Repository** | `CompanyRepository.java` | Chua ke thua `JpaSpecificationExecutor<Company>`, hien chu yeu co query public `findAllCompaniesWithJobCountActive(...)` |
| **Pagination DTO** | `PageResponse.java` | Da ton tai va dang duoc dung cho public jobs va employer applications, co the tai su dung cho admin APIs |

### Van de hien tai

- Admin khong co API company list voi search/filter/pagination.
- Admin jobs list chua phan trang nen khong phu hop cho bang du lieu lon trong dashboard.
- Contract search/filter giua company va job chua dong nhat.
- `postedAt` la field quan trong cua `Job`, nhung admin jobs API chua ho tro filter theo ngay dang bai.

---

## 2. Thiet ke API de xuat

### 2.1 Admin Companies API

| Thuoc tinh | Gia tri |
|------------|---------|
| **Method** | `GET` |
| **Path** | `/api/v1/admin/companies` |
| **Auth** | `hasRole('ADMIN')` |
| **Response** | `ApiResponse<PageResponse<CompanyBriefResponse>>` |
| **Sort mac dinh** | `companyName ASC`, fallback `id ASC` |

#### Query params

- `page`: mac dinh `0`
- `size`: mac dinh `10`
- `companyName`: tim kiem gan dung theo `company.companyName`
- `companyModel`: loc theo enum `CompanyModel`
- `countryId`: loc theo `company.country.id`
- `companySize`: loc theo enum `CompanySize`

---

### 2.2 Admin Jobs API

| Thuoc tinh | Gia tri |
|------------|---------|
| **Method** | `GET` |
| **Path** | `/api/v1/admin/jobs` |
| **Auth** | `hasRole('ADMIN')` |
| **Response** | `ApiResponse<PageResponse<JobDetailResponse>>` |
| **Sort mac dinh** | `postedAt DESC`, fallback `id DESC` |

#### Query params

- `page`: mac dinh `0`
- `size`: mac dinh `10`
- `title`: tim kiem gan dung theo `job.title`
- `companyName`: tim kiem gan dung theo `job.company.companyName`
- `cityId`: loc theo `job.city.id`
- `status`: loc theo enum `JobStatus`
- `jobType`: loc theo enum `JobType`
- `postedAtFrom`: ngay bat dau
- `postedAtTo`: ngay ket thuc

#### Quy uoc filter `postedAt`

- Dinh dang nhan vao: `yyyy-MM-dd`
- `postedAtFrom` ap dung tu dau ngay: `postedAtFrom.atStartOfDay()`
- `postedAtTo` ap dung den cuoi ngay: `postedAtTo.atTime(23, 59, 59, 999999999)`
- Ca hai moc deu inclusive

---

## 3. Proposed Changes

### 3.1 Company backend

#### [NEW] Admin company list endpoint

**Controller**

- Them `AdminCompanyController`
- Dat `@RequestMapping("/api/v1/admin/companies")`
- Su dung `@GetMapping`
- Su dung `@PreAuthorize("hasRole('ADMIN')")`
- Khong dua admin route vao `CompanyController` hien tai de tranh tron public/employer/admin responsibilities

**Service**

- Them method moi trong `CompanyService`:

```java
PageResponse<CompanyBriefResponse> getAdminCompanies(
        int page,
        int size,
        String companyName,
        CompanyModel companyModel,
        Long countryId,
        CompanySize companySize);
```

**Repository**

- Cap nhat `CompanyRepository` ke thua them `JpaSpecificationExecutor<Company>`
- Them paged overload dung `EntityGraph` de tranh N+1 khi map `country`

```java
@Override
@EntityGraph(attributePaths = {"country"})
Page<Company> findAll(Specification<Company> spec, Pageable pageable);
```

**ServiceImpl**

- Them `buildAdminCompanySpecification(...)`
- Cac predicate can co:
  - `companyName like lower(...)`
  - `companyModel == ...`
  - `country.id == ...`
  - `companySize == ...`
- Tao `PageRequest.of(page, size, Sort.by(...))`
- Map `Page<Company>` sang `PageResponse<CompanyBriefResponse>`

---

### 3.2 Job backend

#### [MODIFY] `GET /api/v1/admin/jobs`

**Controller**

- Doi method signature de nhan them:
  - `page`
  - `size`
  - `postedAtFrom`
  - `postedAtTo`
- Doi kieu tra ve:

```java
ApiResponse<PageResponse<JobDetailResponse>>
```

**Service**

- Cap nhat method trong `JobService`:

```java
PageResponse<JobDetailResponse> getAdminJobs(
        int page,
        int size,
        String title,
        String companyName,
        JobStatus status,
        JobType jobType,
        Long cityId,
        LocalDate postedAtFrom,
        LocalDate postedAtTo);
```

**Repository**

- Them paged overload trong `JobRepository`:

```java
@Override
@EntityGraph(attributePaths = {"company", "company.country", "city", "skills"})
Page<Job> findAll(Specification<Job> spec, Pageable pageable);
```

**ServiceImpl**

- Giu huong dung `Specification<Job>`
- Refactor `buildJobFilterSpecification(...)` de nhan them:
  - `postedAtFrom`
  - `postedAtTo`
- Logic filter `postedAt`:
  - neu co `postedAtFrom`: `postedAt >= postedAtFrom.atStartOfDay()`
  - neu co `postedAtTo`: `postedAt <= postedAtTo.atTime(23, 59, 59, 999999999)`
- Chuyen order mac dinh tu trong `Specification` ra `PageRequest` de pagination ro rang va tranh side effect khi tai su dung spec
- Map `Page<Job>` sang `PageResponse<JobDetailResponse>`

---

### 3.3 Validation va contract

- Giu dung enum names hien co cua backend:
  - `CompanyModel`
  - `CompanySize`
  - `JobStatus`
  - `JobType`
- Khong tao DTO request rieng cho filter GET; dung `@RequestParam`
- Neu can validation nhe:
  - `page >= 0`
  - `size > 0`
- Khong thay doi `PageResponse<T>` hien tai
- Chap nhan semantics hien tai cua repo:
  - `size` trong response la so phan tu thuc te cua page hien tai, khong phai requested page size

---

### 3.4 Test can them/cap nhat

#### Controller annotation tests

- Them test cho admin company endpoint co `@PreAuthorize("hasRole('ADMIN')")`
- Cap nhat test admin jobs de phan anh method signature moi

#### Service tests

**`JobServiceImplTest`**

- admin jobs tra `PageResponse`
- filter ket hop `title + companyName + status + cityId`
- filter `postedAtFrom` only
- filter `postedAtTo` only
- filter `postedAtFrom + postedAtTo`

**`CompanyServiceImplTest`**

- admin companies tra `PageResponse`
- search theo `companyName`
- filter theo `companyModel`
- filter theo `countryId`
- filter theo `companySize`
- filter ket hop nhieu dieu kien

---

## 4. Test Plan

### Automated checks

- Backend:
  - `mvn test -Dtest=JobServiceImplTest,JobControllerAdminAnnotationsTest`
  - bo sung test class cho company admin API roi chay targeted test class tuong ung
- Neu can compile/test rong hon:
  - `mvn test`

### Manual verification

- `GET /api/v1/admin/companies?page=0&size=10`
  - tra dung metadata page
- `GET /api/v1/admin/companies?...&companyName=abc&companyModel=PRODUCT&countryId=1&companySize=SIZE_11_50`
  - search + filter ket hop dung
- `GET /api/v1/admin/jobs?page=0&size=10`
  - tra page dau, sort dung theo `postedAt DESC`
- `GET /api/v1/admin/jobs?...&title=java&companyName=it&cityId=1&status=ACTIVE&postedAtFrom=2026-06-01&postedAtTo=2026-06-30`
  - loc ket hop dung
- page vuot pham vi:
  - `data=[]`
  - `totalElements`, `totalPages`, `page` van hop le

---

## 5. Assumptions

- Chap nhan breaking change co kiem soat cho `GET /api/v1/admin/jobs`: tu `List<JobDetailResponse>` sang `PageResponse<JobDetailResponse>`
- Admin company list dung `CompanyBriefResponse`, khong tao admin-specific response moi o v1
- Khong them filter `status` cho company vi entity `Company` hien khong co field `status`
- Khong them cac filter job khac ngoai `title`, `companyName`, `cityId`, `status`, `jobType`, `postedAtFrom`, `postedAtTo` trong pha nay
- Khong thay doi public company/job APIs va khong thay doi database schema
