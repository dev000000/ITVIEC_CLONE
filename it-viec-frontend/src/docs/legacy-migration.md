# Legacy Migration Tracker

Tổng hợp tất cả các file `.tsx` đang dùng **service cũ** (`services/`), **actions cũ** (`actions/`), và **Redux reducer cũ** (`reducers/`).  
Mục tiêu: migrate dần sang `services_new/` + Zustand store.

---

## 1. Tổng quan phụ thuộc cũ

| File                                             | `services/`                      | `actions/`        | Redux `useSelector`/`useDispatch`                  |
| ------------------------------------------------ | -------------------------------- | ----------------- | -------------------------------------------------- |
| `layout/LayoutCustomer/index.tsx`                | `EmployerServices`               | `User`, `Company` | `CompanyReducer` ✓                                 |
| `layout/LayoutJobSeeker/index.tsx`               | —                                | —                 | `SeekerReducer` ✓                                  |
| `components/CardJobDetail/CardJobHead/index.tsx` | `Shared`                         | —                 | `CompanyReducer`, `UserReducer`, `SeekerReducer` ✓ |
| `components/TopJobItemEmployer/index.tsx`        | —                                | —                 | `UserReducer` ✓                                    |
| `pages/Shared/JobSearch/index.tsx`               | `Shared`                         | —                 | —                                                  |
| `pages/Shared/JobDetail/index.tsx`               | `Shared`                         | —                 | —                                                  |
| `pages/Shared/JobSearchDetail/index.tsx`         | —                                | —                 | `UserReducer` ✓                                    |
| `pages/JobSeeker/Register/index.tsx`             | `UserServices`, `SeekerServices` | —                 | —                                                  |
| `pages/JobSeeker/MyJobs/index.tsx`               | `SeekerServices`                 | —                 | `SeekerReducer` ✓                                  |
| `pages/JobSeeker/JobApplications/index.tsx`      | `SeekerServices`                 | `Seeker`          | `SeekerReducer`, `UserReducer` ✓                   |
| `pages/JobSeeker/CVProfile/index.tsx`            | `SeekerServices`                 | `Seeker`          | `SeekerReducer` ✓                                  |
| `pages/JobSeeker/CVManager/index.tsx`            | `SeekerServices`                 | `Seeker`          | `SeekerReducer` ✓                                  |
| `pages/JobSeeker/ProfileOverview/index.tsx`      | —                                | —                 | `SeekerReducer` ✓                                  |
| `pages/Employer/EmployerJobDetail/index.tsx`     | `EmployerServices`               | `User`            | `CompanyReducer` ✓                                 |
| `pages/Employer/EmployerProfile/index.tsx`       | `EmployerServices`               | `Company`         | `CompanyReducer` ✓                                 |
| `pages/Employer/EmployerApplications/index.tsx`  | `EmployerServices`               | —                 | `CompanyReducer` ✓                                 |
| `pages/Employer/EmployerJobs/index.tsx`          | `EmployerServices`               | —                 | `CompanyReducer` ✓                                 |

---

## 2. Chi tiết theo từng file

---

### `layout/LayoutCustomer/index.tsx`

**Services cũ:**

```ts
import { getCompanyWithJobsByUserID } from "@/services/EmployerServices";
```

→ Migrate sang: `getMyCompanyApi()` từ `@/services_new/companyApi`

**Actions cũ:**

```ts
import { setLogin } from "@/actions/User";
import { clearCompanyInfo, setCompanyFullInfo } from "@/actions/Company";
```

→ Migrate sang: `useCompanyStore` (`setCompany`, `clearCompany`) + `useUserStore`

**Redux:**

```ts
const company = useSelector((state: any) => state.CompanyReducer);
const dispatch = useDispatch();
```

→ Migrate sang: `useCompanyStore()` từ `@/store/companyStore`

---

### `layout/LayoutJobSeeker/index.tsx`

**Redux (không có services/actions cũ):**

```ts
const seeker = useSelector((state: any) => state.SeekerReducer);
const dispatch = useDispatch(); // có khai báo nhưng cần kiểm tra sử dụng
```

→ Migrate sang: `useSeekerStore()` từ `@/store/seekerStore`

---

### `components/CardJobDetail/CardJobHead/index.tsx`

**Services cũ:**

```ts
import { checkApplication } from "@/services/Shared";
```

→ Chưa có API mới tương đương — cần thêm vào `applicationApi.ts` (e.g. `checkApplicationExistApi`)

**Redux:**

```ts
const company = useSelector((state: RootState) => state.CompanyReducer);
const isLogin = useSelector((state: RootState) => state.UserReducer);
const seeker = useSelector((state: RootState) => state.SeekerReducer);
```

→ Migrate sang: `useCompanyStore`, `useUserStore`, `useSeekerStore`

---

### `components/TopJobItemEmployer/index.tsx`

**Redux:**

```ts
const isLogin = useSelector(
  (state: { UserReducer: LegacyUserState }) => state.UserReducer,
);
```

→ Migrate sang: `useUserStore()` từ `@/store/userStore`

---

### `pages/Shared/JobSearch/index.tsx`

**Services cũ:**

```ts
import { getJobsSearch } from "@/services/Shared";
```

→ Migrate sang: `getAllJobsApi(page, size)` với params tìm kiếm từ `@/services_new/jobApi`  
⚠️ API mới chưa có filter `keyword`/`city` — cần bổ sung hoặc dùng `getJobBySlugApi` tạm thời

---

### `pages/Shared/JobDetail/index.tsx`

**Services cũ:**

```ts
import { getJobDetailByID } from "@/services/Shared";
```

→ Migrate sang: `getJobBySlugApi(slug)` từ `@/services_new/jobApi`

---

### `pages/Shared/JobSearchDetail/index.tsx`

**Redux (không có services cũ):**

```ts
const isLogin = useSelector((state) => state.UserReducer);
```

→ Migrate sang: `useUserStore()` từ `@/store/userStore`

---

### `pages/JobSeeker/Register/index.tsx`

**Services cũ:**

```ts
import { checkExist, register } from "@/services/UserServices";
import { createSeekerDetail } from "@/services/SeekerServices";
```

→ Migrate sang:

- `register` → `registerSeekerApi(request)` từ `@/services_new/authApi`
- `checkExist` → ⚠️ Chưa có API check email tồn tại — cần bổ sung hoặc xử lý qua error response của `registerSeekerApi`
- `createSeekerDetail` → đã được bao gồm trong `registerSeekerApi` (backend tạo seeker detail khi register)

---

### `pages/JobSeeker/MyJobs/index.tsx`

**Services cũ:**

```ts
import {
  getApplicationsBySeekerId,
  getApplicationsBySeekerIdWithPagination,
} from "@/services/SeekerServices";
```

→ Migrate sang: `getMyApplicationsApi()` từ `@/services_new/applicationApi`

**Redux:**

```ts
const seeker = useSelector((state: RootState) => state.SeekerReducer);
```

→ Migrate sang: `useSeekerStore()` từ `@/store/seekerStore`

---

### `pages/JobSeeker/JobApplications/index.tsx`

**Services cũ:**

```ts
import {
  checkApplicationExist,
  getJobDetailBySlug,
  getSeekerInforByUserId,
  postApplication,
} from "@/services/SeekerServices";
```

→ Migrate sang:

- `postApplication` → `applyToJobApi(jobId, request)` từ `@/services_new/applicationApi`
- `getJobDetailBySlug` → `getJobBySlugApi(slug)` từ `@/services_new/jobApi`
- `getSeekerInforByUserId` → `getMyProfileApi()` từ `@/services_new/seekerApi`
- `checkApplicationExist` → ⚠️ Chưa có API tương đương — cần bổ sung

**Actions cũ:**

```ts
import { setSeekerFullInfo } from "@/actions/Seeker";
```

→ Migrate sang: `useSeekerStore().setSeeker(...)` từ `@/store/seekerStore`

**Redux:**

```ts
const seeker = useSelector((state: LegacyRootState) => state.SeekerReducer);
const isLogin = useSelector((state: LegacyRootState) => state.UserReducer);
const dispatch = useDispatch();
```

→ Migrate sang: `useSeekerStore`, `useUserStore`

---

### `pages/JobSeeker/CVProfile/index.tsx`

**Services cũ:**

```ts
import { updateSeekerInfor } from "@/services/SeekerServices";
```

→ Migrate sang: `updateMyProfileApi(request)` từ `@/services_new/seekerApi`

**Actions cũ:**

```ts
import { clearSeekerInfo, setSeekerFullInfo } from "@/actions/Seeker";
```

→ Migrate sang: `useSeekerStore().setSeeker(...)` / `clearSeeker()` từ `@/store/seekerStore`

**Redux:**

```ts
const seeker = useSelector((state: LegacyRootState) => state.SeekerReducer);
const dispatch = useDispatch();
```

→ Migrate sang: `useSeekerStore()` từ `@/store/seekerStore`

---

### `pages/JobSeeker/CVManager/index.tsx`

**Services cũ:**

```ts
import { updateSeekerInfor } from "@/services/SeekerServices";
```

→ Migrate sang: `updateMyProfileApi(request)` từ `@/services_new/seekerApi`

**Actions cũ:**

```ts
import { clearSeekerInfo, setSeekerFullInfo } from "@/actions/Seeker";
```

→ Migrate sang: `useSeekerStore().setSeeker(...)` / `clearSeeker()` từ `@/store/seekerStore`

**Redux:**

```ts
const seeker = useSelector((state: LegacyRootState) => state.SeekerReducer);
const dispatch = useDispatch();
```

→ Migrate sang: `useSeekerStore()` từ `@/store/seekerStore`

---

### `pages/JobSeeker/ProfileOverview/index.tsx`

**Redux (không có services/actions cũ):**

```ts
const seeker = useSelector((state: RootState) => state.SeekerReducer);
```

→ Migrate sang: `useSeekerStore()` từ `@/store/seekerStore`

---

### `pages/Employer/EmployerJobDetail/index.tsx`

**Services cũ:**

```ts
import {
  deleteJob,
  getJobWithCompany,
  getSkills,
  updateJob,
} from "@/services/EmployerServices";
```

→ Migrate sang:

- `getJobWithCompany` → `getJobBySlugApi` hoặc API lấy job theo ID (cần kiểm tra `jobApi`)
- `updateJob` → `updateJobApi(id, request)` từ `@/services_new/jobApi`
- `deleteJob` → `deleteJobApi(id)` từ `@/services_new/jobApi`
- `getSkills` → `getAllSkillsApi()` từ `@/services_new/skillApi`

**Actions cũ:**

```ts
import { setLogin } from "@/actions/User";
```

→ Migrate sang: `useUserStore().setUser(...)` từ `@/store/userStore`

**Redux:**

```ts
const company = useSelector((state: LegacyRootState) => state.CompanyReducer);
const dispatch = useDispatch();
```

→ Migrate sang: `useCompanyStore()` từ `@/store/companyStore`

---

### `pages/Employer/EmployerProfile/index.tsx`

**Services cũ:**

```ts
import { getSkills, updateCompany } from "@/services/EmployerServices";
```

→ Migrate sang:

- `getSkills` → `getAllSkillsApi()` từ `@/services_new/skillApi`
- `updateCompany` → `updateMyCompanyApi(request)` từ `@/services_new/companyApi`

**Actions cũ:**

```ts
import { setCompanyFullInfo } from "@/actions/Company";
```

→ Migrate sang: `useCompanyStore().setCompany(...)` từ `@/store/companyStore`

**Redux:**

```ts
const companyInfor = useSelector(
  (state: LegacyRootState) => state.CompanyReducer,
);
const dispatch = useDispatch();
```

→ Migrate sang: `useCompanyStore()` từ `@/store/companyStore`

---

### `pages/Employer/EmployerApplications/index.tsx`

**Services cũ:**

```ts
import {
  getApplicationsWithJob,
  getApplicationsWithJobPagination,
  updateApplication,
} from "@/services/EmployerServices";
```

→ Migrate sang:

- `getApplicationsWithJob` → `getMyCompanyApplicationsApi()` từ `@/services_new/applicationApi`
- `getApplicationsWithJobPagination` → `getMyCompanyApplicationsApi()` (cần thêm params pagination)
- `updateApplication` → `updateApplicationStatusApi(id, request)` từ `@/services_new/applicationApi`

**Redux:**

```ts
const company = useSelector((state: LegacyRootState) => state.CompanyReducer);
```

→ Migrate sang: `useCompanyStore()` từ `@/store/companyStore`

---

### `pages/Employer/EmployerJobs/index.tsx`

**Services cũ:**

```ts
import { getJobs, getSkills, postJob } from "@/services/EmployerServices";
```

→ Migrate sang:

- `getJobs` → `getMyJobsApi()` từ `@/services_new/jobApi`
- `getSkills` → `getAllSkillsApi()` từ `@/services_new/skillApi`
- `postJob` → `createJobApi(request)` từ `@/services_new/jobApi`

**Redux:**

```ts
const company = useSelector((state: LegacyRootState) => state.CompanyReducer);
```

→ Migrate sang: `useCompanyStore()` từ `@/store/companyStore`

---

## 3. Mapping: API cũ → API mới

| Hàm cũ (`services/`)                      | File cũ            | Hàm mới (`services_new/`)             | Ghi chú                                      |
| ----------------------------------------- | ------------------ | ------------------------------------- | -------------------------------------------- |
| `getCompanyWithJobsByUserID`              | `EmployerServices` | `getMyCompanyApi()`                   | `companyApi.ts`                              |
| `getJobs(companyId)`                      | `EmployerServices` | `getMyJobsApi()`                      | `jobApi.ts`                                  |
| `getJobWithCompany(id)`                   | `EmployerServices` | cần kiểm tra `jobApi`                 | có thể dùng `getJobBySlugApi`                |
| `updateJob(id, data)`                     | `EmployerServices` | `updateJobApi(id, request)`           | `jobApi.ts`                                  |
| `deleteJob(id)`                           | `EmployerServices` | `deleteJobApi(id)`                    | `jobApi.ts`                                  |
| `postJob(data)`                           | `EmployerServices` | `createJobApi(request)`               | `jobApi.ts`                                  |
| `getSkills()`                             | `EmployerServices` | `getAllSkillsApi()`                   | `skillApi.ts`                                |
| `updateCompany(id, data)`                 | `EmployerServices` | `updateMyCompanyApi(request)`         | `companyApi.ts`                              |
| `getApplicationsWithJob(id)`              | `EmployerServices` | `getMyCompanyApplicationsApi()`       | `applicationApi.ts`                          |
| `getApplicationsWithJobPagination`        | `EmployerServices` | `getMyCompanyApplicationsApi()`       | cần thêm pagination params                   |
| `updateApplication(id, data)`             | `EmployerServices` | `updateApplicationStatusApi(id, req)` | `applicationApi.ts`                          |
| `updateSeekerInfor(id, data)`             | `SeekerServices`   | `updateMyProfileApi(request)`         | `seekerApi.ts`                               |
| `getSeekerInforByUserId(userId)`          | `SeekerServices`   | `getMyProfileApi()`                   | `seekerApi.ts`                               |
| `getApplicationsBySeekerId`               | `SeekerServices`   | `getMyApplicationsApi()`              | `applicationApi.ts`                          |
| `getApplicationsBySeekerIdWithPagination` | `SeekerServices`   | `getMyApplicationsApi()`              | cần thêm pagination params                   |
| `postApplication(data)`                   | `SeekerServices`   | `applyToJobApi(jobId, request)`       | `applicationApi.ts`                          |
| `createSeekerDetail(data)`                | `SeekerServices`   | _(included in `registerSeekerApi`)_   | backend tự tạo                               |
| `getJobDetailBySlug(slug)`                | `SeekerServices`   | `getJobBySlugApi(slug)`               | `jobApi.ts`                                  |
| `checkApplicationExist`                   | `SeekerServices`   | ⚠️ **Chưa có**                        | cần bổ sung vào `applicationApi.ts`          |
| `register(data)`                          | `UserServices`     | `registerSeekerApi(request)`          | `authApi.ts`                                 |
| `checkExist(email)`                       | `UserServices`     | ⚠️ **Chưa có**                        | cần bổ sung hoặc dùng error handling         |
| `getJobDetailByID(id)`                    | `Shared`           | `getJobBySlugApi(slug)`               | `jobApi.ts` — đổi từ ID sang slug            |
| `getJobsSearch(keyword, city)`            | `Shared`           | ⚠️ **Chưa có filter**                 | `getAllJobsApi` không có keyword/city filter |
| `checkApplication`                        | `Shared`           | ⚠️ **Chưa có**                        | cần bổ sung vào `applicationApi.ts`          |

---

## 4. Mapping: Redux state → Zustand store

| Redux state cũ                       | Zustand store mới                    | File                   |
| ------------------------------------ | ------------------------------------ | ---------------------- |
| `state.SeekerReducer`                | `useSeekerStore()`                   | `@/store/seekerStore`  |
| `state.CompanyReducer`               | `useCompanyStore()`                  | `@/store/companyStore` |
| `state.UserReducer`                  | `useUserStore()`                     | `@/store/userStore`    |
| `dispatch(setSeekerFullInfo(data))`  | `useSeekerStore().setSeeker(data)`   | `@/store/seekerStore`  |
| `dispatch(clearSeekerInfo())`        | `useSeekerStore().clearSeeker()`     | `@/store/seekerStore`  |
| `dispatch(setCompanyFullInfo(data))` | `useCompanyStore().setCompany(data)` | `@/store/companyStore` |
| `dispatch(clearCompanyInfo())`       | `useCompanyStore().clearCompany()`   | `@/store/companyStore` |
| `dispatch(setLogin(data))`           | `useUserStore().setUser(data)`       | `@/store/userStore`    |

---

## 5. API mới cần bổ sung (gaps)

Các hàm **chưa có** trong `services_new/`, cần thêm trước khi migrate file tương ứng:

| Hàm cần thêm                                | File thêm vào                  | Dùng trong                                         |
| ------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| `checkApplicationExistApi(jobId, seekerId)` | `applicationApi.ts`            | `JobApplications`, `CardJobHead`                   |
| `getJobByIdApi(id)`                         | `jobApi.ts`                    | `EmployerJobDetail` (đang dùng ID không phải slug) |
| `getAllJobsWithFilterApi(keyword, city)`    | `jobApi.ts`                    | `JobSearch`                                        |
| `checkEmailExistApi(email)`                 | `authApi.ts` hoặc `userApi.ts` | `Register`                                         |

---

## 6. Thứ tự migrate đề xuất

**Ưu tiên đơn giản (Redux-only, không cần đổi API):**

1. `layout/LayoutJobSeeker/index.tsx` — chỉ đổi Redux → `useSeekerStore`
2. `pages/Shared/JobSearchDetail/index.tsx` — chỉ đổi Redux → `useUserStore`
3. `pages/JobSeeker/ProfileOverview/index.tsx` — chỉ đổi Redux → `useSeekerStore`
4. `components/TopJobItemEmployer/index.tsx` — chỉ đổi Redux → `useUserStore`

**Trung bình (có API, API mới đã sẵn):** 5. `pages/JobSeeker/CVProfile/index.tsx` — `updateMyProfileApi` + `useSeekerStore` 6. `pages/JobSeeker/CVManager/index.tsx` — `updateMyProfileApi` + `useSeekerStore` 7. `pages/JobSeeker/MyJobs/index.tsx` — `getMyApplicationsApi` + `useSeekerStore` 8. `pages/Employer/EmployerJobs/index.tsx` — `getMyJobsApi`, `createJobApi`, `getAllSkillsApi` + `useCompanyStore` 9. `pages/Employer/EmployerProfile/index.tsx` — `updateMyCompanyApi`, `getAllSkillsApi` + `useCompanyStore` 10. `pages/Employer/EmployerApplications/index.tsx` — `getMyCompanyApplicationsApi`, `updateApplicationStatusApi` + `useCompanyStore` 11. `layout/LayoutCustomer/index.tsx` — `getMyCompanyApi` + `useCompanyStore`, `useUserStore`

**Phụ thuộc vào API cần bổ sung trước:** 12. `pages/JobSeeker/Register/index.tsx` — cần `checkEmailExistApi` trước 13. `pages/JobSeeker/JobApplications/index.tsx` — cần `checkApplicationExistApi` trước 14. `components/CardJobDetail/CardJobHead/index.tsx` — cần `checkApplicationExistApi` trước 15. `pages/Shared/JobSearch/index.tsx` — cần `getAllJobsWithFilterApi` trước 16. `pages/Shared/JobDetail/index.tsx` — đổi từ ID → slug lookup 17. `pages/Employer/EmployerJobDetail/index.tsx` — cần `getJobByIdApi` hoặc refactor sang slug
