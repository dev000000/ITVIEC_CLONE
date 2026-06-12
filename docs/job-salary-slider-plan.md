# Job Salary Slider — Remove Legacy Fields & Slider UI

## Summary

Remove the legacy `salary` (VARCHAR) and `salary_negotiable` (BOOLEAN) columns from the `jobs` table and their corresponding Java/TypeScript fields. "Negotiable" is now represented by `salary_min IS NULL AND salary_max IS NULL` — no dedicated flag column. The employer form replaces two `InputNumber` fields with an Ant Design **Slider (range)** on the same row as a currency `Select`, keeping a "Thương lượng" checkbox that nulls all three salary fields when checked.

### Columns retained (nullable)

| Column | Type | Null → meaning |
|---|---|---|
| `salary_min` | `BIGINT` | NULL = negotiable |
| `salary_max` | `BIGINT` | NULL = negotiable |
| `salary_currency` | `ENUM('VND','USD')` | NULL when min/max NULL |

### Rule: "negotiable" ≡ `salary_min IS NULL AND salary_max IS NULL`

---

## Backend

### 1. Schema — `it-viec-backend/src/main/resources/db/schema.sql`

**Drop columns** in the `jobs` CREATE TABLE (lines 200, 204):

```sql
-- REMOVE these two lines:
salary VARCHAR(100),
salary_negotiable BOOLEAN NOT NULL DEFAULT FALSE,
```

Resulting `jobs` salary section:

```sql
salary_min BIGINT,
salary_max BIGINT,
salary_currency ENUM('VND', 'USD'),
```

No migration file needed — the project uses `spring.sql.init.mode=always` with `schema.sql` + `data.sql` for dev reset.

---

### 2. Entity — `com.dev001.itviec.entity.job.Job`

**File:** `it-viec-backend/src/main/java/com/dev001/itviec/entity/job/Job.java`

Remove:

```java
// DELETE lines 63-64
@Column(columnDefinition = "VARCHAR(100)")
String salary;

// DELETE lines 76-78
@Column(name = "salary_negotiable", nullable = false)
@Builder.Default
Boolean salaryNegotiable = false;
```

Keep `salaryMin`, `salaryMax`, `salaryCurrency` unchanged.

Add a derived helper (optional, avoids scattered null checks):

```java
@Transient
public boolean isNegotiable() {
    return salaryMin == null && salaryMax == null;
}
```

---

### 3. DTOs

#### 3a. Request DTOs

**`com.dev001.itviec.dto.request.JobCreateRequest`**
(`it-viec-backend/src/main/java/com/dev001/itviec/dto/request/JobCreateRequest.java`)

Remove:

```java
/** @deprecated Legacy text field; use structured salary fields instead */
String salary;            // line 48-49

Boolean salaryNegotiable; // line 50
```

Keep `salaryMin`, `salaryMax`, `salaryCurrency`.

**`com.dev001.itviec.dto.request.JobUpdateRequest`**
(`it-viec-backend/src/main/java/com/dev001/itviec/dto/request/JobUpdateRequest.java`)

Same removals: delete `salary` (lines 48-49) and `salaryNegotiable` (line 50).

#### 3b. Response DTOs

**`com.dev001.itviec.dto.response.JobDetailResponse`**
(`it-viec-backend/src/main/java/com/dev001/itviec/dto/response/JobDetailResponse.java`)

Remove:

```java
String salary;            // line 27
Boolean salaryNegotiable; // line 28
```

**`com.dev001.itviec.dto.response.JobCardResponse`**
(`it-viec-backend/src/main/java/com/dev001/itviec/dto/response/JobCardResponse.java`)

Remove:

```java
String salary;            // line 23
Boolean salaryNegotiable; // line 24
```

**`com.dev001.itviec.dto.response.SavedJobItemResponse`**
(`it-viec-backend/src/main/java/com/dev001/itviec/dto/response/SavedJobItemResponse.java`)

Remove:

```java
String salary;            // line 22
```

Add structured salary fields that were missing from this DTO:

```java
Long salaryMin;
Long salaryMax;
SalaryCurrency salaryCurrency;
```

(Import `com.dev001.itviec.enums.SalaryCurrency`.)

---

### 4. Mapper — `com.dev001.itviec.mapper.JobMapper`

**File:** `it-viec-backend/src/main/java/com/dev001/itviec/mapper/JobMapper.java`

No changes needed — MapStruct auto-maps matching field names. Removed fields will simply be excluded from generation. Regenerate by running `./mvnw compile`.

**`com.dev001.itviec.mapper.SavedJobMapper`**
(`it-viec-backend/src/main/java/com/dev001/itviec/mapper/SavedJobMapper.java`)

No changes needed — the new `salaryMin`/`salaryMax`/`salaryCurrency` fields added to `SavedJobItemResponse` match `Job` entity fields by name and will auto-map.

---

### 5. Service — `com.dev001.itviec.service.impl.JobServiceImpl`

**File:** `it-viec-backend/src/main/java/com/dev001/itviec/service/impl/JobServiceImpl.java`

#### 5a. `applySalaryFields` (lines 355-386) — new signature & logic

```java
private void applySalaryFields(Job job, Long salaryMin, Long salaryMax, SalaryCurrency salaryCurrency) {
    // All null → negotiable
    if (salaryMin == null && salaryMax == null && salaryCurrency == null) {
        job.setSalaryMin(null);
        job.setSalaryMax(null);
        job.setSalaryCurrency(null);
        return;
    }

    // Partial null → validation error
    if (salaryMin == null) {
        throw new AppException(ErrorCode.SALARY_MIN_REQUIRED);
    }
    if (salaryMax == null) {
        throw new AppException(ErrorCode.SALARY_MAX_REQUIRED);
    }
    if (salaryCurrency == null) {
        throw new AppException(ErrorCode.SALARY_CURRENCY_REQUIRED);
    }
    if (salaryMin > salaryMax) {
        throw new AppException(ErrorCode.SALARY_RANGE_INVALID);
    }

    job.setSalaryMin(salaryMin);
    job.setSalaryMax(salaryMax);
    job.setSalaryCurrency(salaryCurrency);
}
```

#### 5b. Call sites — remove `salaryNegotiable` argument

**`createJob` (line 97-102):**

```java
// BEFORE
applySalaryFields(job, request.getSalaryNegotiable(), request.getSalaryMin(), ...);
// AFTER
applySalaryFields(job, request.getSalaryMin(), request.getSalaryMax(), request.getSalaryCurrency());
```

Also remove `.salary(null)` from the builder (line 88).

**`updateJob` (line 209-214):**

```java
// BEFORE
applySalaryFields(job, request.getSalaryNegotiable(), ...);
// AFTER
applySalaryFields(job, request.getSalaryMin(), request.getSalaryMax(), request.getSalaryCurrency());
```

#### 5c. `buildPublicJobSearchSpecification` — salary filter (lines 342-349)

Replace:

```java
// BEFORE (lines 342-349)
if (salaryCurrency != null && salaryMin != null && salaryMax != null) {
    predicates.add(cb.equal(root.get("salaryCurrency"), salaryCurrency));
    predicates.add(cb.isFalse(root.get("salaryNegotiable")));  // ← DELETE
    predicates.add(cb.isNotNull(root.get("salaryMin")));
    predicates.add(cb.isNotNull(root.get("salaryMax")));
    predicates.add(cb.lessThanOrEqualTo(root.get("salaryMin"), salaryMax));
    predicates.add(cb.greaterThanOrEqualTo(root.get("salaryMax"), salaryMin));
}
```

With:

```java
if (salaryCurrency != null && salaryMin != null && salaryMax != null) {
    predicates.add(cb.equal(root.get("salaryCurrency"), salaryCurrency));
    predicates.add(cb.isNotNull(root.get("salaryMin")));
    predicates.add(cb.isNotNull(root.get("salaryMax")));
    predicates.add(cb.lessThanOrEqualTo(root.get("salaryMin"), salaryMax));
    predicates.add(cb.greaterThanOrEqualTo(root.get("salaryMax"), salaryMin));
}
```

(Only one line removed: `cb.isFalse(root.get("salaryNegotiable"))`)

---

### 6. Error codes — `com.dev001.itviec.exception.ErrorCode`

**File:** `it-viec-backend/src/main/java/com/dev001/itviec/exception/ErrorCode.java`

Remove `SALARY_REQUIRED(1065, ...)` (line 83) — it referenced the old text `salary` field. Keep all four remaining salary codes:

| Code | Enum | Kept? |
|---|---|---|
| 1065 | `SALARY_REQUIRED` | **Remove** — legacy text field |
| 1112 | `SALARY_RANGE_INVALID` | Keep |
| 1113 | `SALARY_CURRENCY_REQUIRED` | Keep |
| 1114 | `SALARY_MIN_REQUIRED` | Keep |
| 1115 | `SALARY_MAX_REQUIRED` | Keep |

---

### 7. Controller

**File:** `it-viec-backend/src/main/java/com/dev001/itviec/controller/JobController.java`

No signature changes needed — the controller passes request DTOs through. Verify no direct field access to `salary` or `salaryNegotiable`.

---

### 8. Seed data — `it-viec-backend/src/main/resources/db/data.sql`

#### 8a. Column list change

Every `INSERT INTO jobs (...)` must remove the `salary` column and add `salary_min, salary_max, salary_currency`.

**Before (first INSERT, line 1229):**

```sql
INSERT INTO jobs (
    company_id, title, slug, job_reason, job_description,
    job_requirements, why_join_us, location, city_id,
    salary,
    job_type, experience_level, posted_at, expires_at, status
)
```

**After:**

```sql
INSERT INTO jobs (
    company_id, title, slug, job_reason, job_description,
    job_requirements, why_join_us, location, city_id,
    salary_min, salary_max, salary_currency,
    job_type, experience_level, posted_at, expires_at, status
)
```

#### 8b. Value transformation rules

| Old `salary` text | → `salary_min` | → `salary_max` | → `salary_currency` |
|---|---|---|---|
| `'20-30m'` | `20000000` | `30000000` | `'VND'` |
| `'10m-20m'` | `10000000` | `20000000` | `'VND'` |
| `'1000 - 2000 USD'` | `1000` | `2000` | `'USD'` |
| `'2,000 - 3,000 USD'` | `2000` | `3000` | `'USD'` |
| `'Cạnh tranh dựa trên năng lực'` | `NULL` | `NULL` | `NULL` |
| `'You''ll love it'` | `NULL` | `NULL` | `NULL` |
| `'Thương lượng'` (if any) | `NULL` | `NULL` | `NULL` |

**Example row transformations:**

Job #1 (Test Manager, MB): `'20-30m'` → `20000000, 30000000, 'VND'`

Job #2 (Java Fullstack, MB): `'1000 - 2000 USD'` → `1000, 2000, 'USD'`

Job #3 (Python Backend, MB): `'Cạnh tranh dựa trên năng lực'` → `NULL, NULL, NULL`

Job #4 (Fullstack SE, MB): `'2,000 - 3,000 USD'` → `2000, 3000, 'USD'`

Job #5 (Data Analyst, MB): `'10m-20m'` → `10000000, 20000000, 'VND'`

Job #6 (Viedoc, SSP): `'You''ll love it'` → `NULL, NULL, NULL`

Job #7-29 (all use `salary` column with text): Apply same parsing logic. Most later jobs use the `salary` keyword in the column list — parse each value individually.

#### 8c. Strategy

1. For each `INSERT INTO jobs` block, replace the column name `salary` → `salary_min, salary_max, salary_currency` in the column list.
2. In the VALUES clause, replace each text `'...'` with the three structured values.
3. Run a full data reset after changes (`reset-db.ps1` or equivalent).

---

### 9. Security / Config

No changes. Salary fields are not part of auth, CORS, or security config.

---

## Frontend

### 1. Types

#### 1a. `it-viec-frontend/src/types/response.types.ts`

**`JobSalaryResponse` (lines 171-177):** Remove `salary` and `salaryNegotiable`:

```typescript
// BEFORE
export interface JobSalaryResponse {
  salary?: string | null;
  salaryNegotiable?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: SalaryCurrency | null;
}

// AFTER
export interface JobSalaryResponse {
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: SalaryCurrency | null;
}
```

No other changes needed — `JobCardResponse`, `JobDetailResponse`, `SavedJobItemResponse` all extend `JobSalaryResponse` and inherit the removal.

#### 1b. `it-viec-frontend/src/types/request.types.ts`

**`JobSalaryRequest` (lines 123-130):** Remove `salaryNegotiable` and `salary`:

```typescript
// BEFORE
export interface JobSalaryRequest {
  salaryNegotiable?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
  /** @deprecated legacy text salary */
  salary?: string;
}

// AFTER
export interface JobSalaryRequest {
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
}
```

`JobCreateRequest` and `JobUpdateRequest` extend this — no further changes.

---

### 2. Utility — `it-viec-frontend/src/utils/formatSalary.ts`

#### 2a. `SalaryDisplayJob` interface (lines 3-9)

Remove `salary` and `salaryNegotiable`:

```typescript
// BEFORE
export interface SalaryDisplayJob {
  salary?: string | null;
  salaryNegotiable?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: SalaryCurrency | null;
}

// AFTER
export interface SalaryDisplayJob {
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: SalaryCurrency | null;
}
```

#### 2b. `formatJobSalary` function (lines 63-78)

```typescript
// BEFORE
export function formatJobSalary(job: SalaryDisplayJob, negotiableLabel: string): string {
  if (job.salaryNegotiable) {
    return negotiableLabel;
  }
  if (job.salaryMin != null && job.salaryMax != null && job.salaryCurrency) {
    return formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryCurrency);
  }
  return job.salary?.trim() || negotiableLabel;
}

// AFTER
export function formatJobSalary(job: SalaryDisplayJob, negotiableLabel: string): string {
  if (job.salaryMin != null && job.salaryMax != null && job.salaryCurrency) {
    return formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryCurrency);
  }
  return negotiableLabel;
}
```

---

### 3. API service

**File:** `it-viec-frontend/src/services/jobApi.ts`

No changes needed — the service passes request objects through `apiClient`. The type changes propagate automatically.

---

### 4. Components

#### 4a. `SalaryFormFields` — **Major rewrite**

**File:** `it-viec-frontend/src/components/SalaryFormFields/index.tsx`

Replace the current two `InputNumber` fields with a **Slider (range)** + **currency Select** on the same row, reusing `SALARY_RANGE_LIMITS` from `formatSalary.ts`.

```tsx
import { Checkbox, Col, Form, Row, Select, Slider } from "antd";
import { useTranslation } from "react-i18next";
import { SALARY_CURRENCY_VALUES, type SalaryCurrency } from "@/types/common.types";
import {
  formatSalaryRangeForFilter,
  SALARY_RANGE_LIMITS,
} from "@/utils/formatSalary";

const SalaryFormFields = () => {
  const { t } = useTranslation("employer");
  const form = Form.useFormInstance();

  // Watch the negotiable checkbox (stored as salaryNegotiable in form state only)
  const negotiable = Form.useWatch<boolean>("salaryNegotiable");

  const currencyOptions = SALARY_CURRENCY_VALUES.map((value) => ({
    value,
    label: t(`jobs.form.salaryCurrency.${value}`),
  }));

  const handleNegotiableChange = (checked: boolean) => {
    if (checked) {
      form.setFieldsValue({
        salaryMin: undefined,
        salaryMax: undefined,
        salaryCurrency: undefined,
      });
    } else {
      form.setFieldsValue({ salaryCurrency: "VND" });
    }
  };

  const renderSlider = (currency: SalaryCurrency) => {
    const limits = SALARY_RANGE_LIMITS[currency];
    const salaryMin = Form.useWatch<number>("salaryMin") ?? limits.min;
    const salaryMax = Form.useWatch<number>("salaryMax") ?? limits.max;

    return (
      <>
        <div style={{ textAlign: "center", fontWeight: 500, marginBottom: 4 }}>
          {formatSalaryRangeForFilter(salaryMin, salaryMax, currency)}
        </div>
        <Form.Item noStyle name="__salaryRange">
          <Slider
            range
            min={limits.min}
            max={limits.max}
            step={limits.step}
            value={[salaryMin, salaryMax]}
            onChange={([min, max]: number[]) => {
              form.setFieldsValue({ salaryMin: min, salaryMax: max });
            }}
          />
        </Form.Item>
        {/* Hidden fields to carry the actual form values */}
        <Form.Item name="salaryMin" hidden><input /></Form.Item>
        <Form.Item name="salaryMax" hidden><input /></Form.Item>
      </>
    );
  };

  return (
    <>
      <Form.Item name="salaryNegotiable" valuePropName="checked">
        <Checkbox onChange={(e) => handleNegotiableChange(e.target.checked)}>
          {t("jobs.form.salaryNegotiable")}
        </Checkbox>
      </Form.Item>
      {!negotiable && (
        <Row gutter={12} align="middle">
          <Col span={6}>
            <Form.Item
              label={t("jobs.form.salaryCurrencyLabel")}
              name="salaryCurrency"
              rules={[{ required: true, message: t("jobs.form.salaryCurrencyRequired") }]}
            >
              <Select options={currencyOptions} />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              noStyle
              shouldUpdate={(prev, curr) => prev.salaryCurrency !== curr.salaryCurrency}
            >
              {({ getFieldValue }) =>
                renderSlider(getFieldValue("salaryCurrency") || "VND")
              }
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SalaryFormFields;
```

**Key design notes:**

- `salaryNegotiable` stays as a **form-only** field (not sent to API); the `onFinish` handlers strip it and send `salaryMin=undefined, salaryMax=undefined, salaryCurrency=undefined` when checked.
- The `Slider` syncs its range to hidden `salaryMin` / `salaryMax` form fields via `form.setFieldsValue`.
- `formatSalaryRangeForFilter` is reused from `SalaryRangeFilter` to display the live range above the slider.
- `SALARY_RANGE_LIMITS` provides `min/max/step` per currency (same as `SalaryRangeFilter`).

#### 4b. Display components — no code changes needed

These components all call `formatJobSalary(job, t("card.negotiable"))` which will work with the new logic (null min/max → negotiable label):

| Component | File |
|---|---|
| `CardJob` | `src/components/CardJob/index.tsx` |
| `CardJobHead` | `src/components/CardJobDetail/CardJobHead/index.tsx` |
| `CardSavedJob` | `src/components/CardSavedJob/index.tsx` |
| `TopJobItemHome` | `src/components/TopJobItemHome/index.tsx` |
| `TopJobItemEmployer` | `src/components/TopJobItemEmployer/index.tsx` |
| `CardApplication` | `src/components/CardApplication/index.tsx` |

Verify: if `CardApplication` has a local `salaryNegotiable` prop in its interface definition (line 23), remove that property.

---

### 5. Employer pages

#### 5a. `EmployerJobs` — `it-viec-frontend/src/pages/Employer/EmployerJobs/index.tsx`

**`JobsFormValues` interface (lines 50-57):** Remove `salaryNegotiable`:

```typescript
// BEFORE
interface JobsFormValues extends Omit<JobCreateRequest, "city" | "skills"> {
  city: number;
  skills: number[];
  salaryNegotiable?: boolean;  // ← REMOVE
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
}

// AFTER
interface JobsFormValues extends Omit<JobCreateRequest, "city" | "skills"> {
  city: number;
  skills: number[];
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
}
```

**`onFinish` (lines 167-178):** Rewrite salary mapping:

```typescript
// BEFORE
const data: JobCreateRequest = {
  ...values,
  // ...
  salaryNegotiable: Boolean(values.salaryNegotiable),
  salaryMin: values.salaryNegotiable ? undefined : values.salaryMin,
  salaryMax: values.salaryNegotiable ? undefined : values.salaryMax,
  salaryCurrency: values.salaryNegotiable ? undefined : values.salaryCurrency,
};

// AFTER — salaryNegotiable is form-only; when checked, min/max/currency are already undefined
const { salaryNegotiable: _neg, ...rest } = values;
const data: JobCreateRequest = {
  ...rest,
  city: cities.find((city) => city.id === values.city) || null!,
  skills: skills.filter((skill) => values.skills.includes(skill.id)),
  postedAt: values.postedAt ? dayjs(values.postedAt).format("YYYY-MM-DDTHH:mm:ss") : undefined!,
  expiresAt: values.expiresAt ? dayjs(values.expiresAt).format("YYYY-MM-DDTHH:mm:ss") : undefined!,
  salaryMin: _neg ? undefined : values.salaryMin,
  salaryMax: _neg ? undefined : values.salaryMax,
  salaryCurrency: _neg ? undefined : values.salaryCurrency,
};
```

**`initialValues` (line 227-231):** Remove `salaryNegotiable: true` → the "negotiable" checkbox defaults unchecked; or keep as `salaryNegotiable: true` (form-only, not sent to API).

#### 5b. `EmployerJobDetail` — `it-viec-frontend/src/pages/Employer/EmployerJobDetail/index.tsx`

**`JobsFormValues` interface (lines 43-50):** Same removal of `salaryNegotiable`.

**`form.setFieldsValue` on edit load (lines 122-143):**

```typescript
// BEFORE
salaryNegotiable: jobInfo.salaryNegotiable ?? false,

// AFTER — derive from null check
salaryNegotiable: jobInfo.salaryMin == null && jobInfo.salaryMax == null,
```

**`onFinish` (lines 199-210):** Same pattern as EmployerJobs — strip `salaryNegotiable` from the payload, conditionally null salary fields.

#### 5c. Admin pages

**File:** `it-viec-frontend/src/pages/Admin/AdminJobs/index.tsx`

Check for `salaryNegotiable` usage; likely only displays via `formatJobSalary` which is already handled. Verify and remove any direct references.

**File:** `it-viec-frontend/src/pages/Shared/JobSearchDetail/index.tsx`

Same verification — uses `formatJobSalary` for display. No changes expected.

**File:** `it-viec-frontend/src/pages/JobSeeker/MyJobs/index.tsx`

Same — uses `CardSavedJob` which calls `formatJobSalary`. No changes.

---

### 6. i18n keys

**Files:**
- `it-viec-frontend/public/locales/en/employer.json`
- `it-viec-frontend/public/locales/vi/employer.json`

#### Keep (used by Slider UI)

```json
"salaryNegotiable": "Negotiable / Thương lượng",
"salaryCurrencyLabel": "Currency / Loại tiền tệ",
"salaryCurrencyRequired": "...",
"salaryCurrency": { "VND": "VND", "USD": "USD" }
```

#### Remove (no longer used by new Slider UI)

```json
"salary": "...",
"salaryPlaceholder": "...",
"salaryRequired": "...",
"salaryMin": "...",
"salaryMax": "...",
"salaryMinPlaceholder": "...",
"salaryMaxPlaceholder": "...",
"salaryMinRequired": "...",
"salaryMaxRequired": "..."
```

#### Add (new slider label)

```json
// en/employer.json
"salaryRange": "Salary Range"

// vi/employer.json
"salaryRange": "Khoảng lương"
```

---

### 7. Routes

No route changes.

---

## Verification

### Unit tests (Backend)

| Test | Class / method | Assertion |
|---|---|---|
| Create job with salary range | `JobServiceImplTest.createJob_withSalaryRange` | salaryMin/max/currency saved; no salary/salaryNegotiable field |
| Create job negotiable (all null) | `JobServiceImplTest.createJob_negotiable` | min/max/currency all null |
| Create job partial null → error | `JobServiceImplTest.createJob_partialNull` | throws `SALARY_MIN_REQUIRED` or `SALARY_MAX_REQUIRED` |
| Create job min > max → error | `JobServiceImplTest.createJob_invalidRange` | throws `SALARY_RANGE_INVALID` |
| Update job salary → negotiable | `JobServiceImplTest.updateJob_toNegotiable` | sets all three to null |
| Search with salary filter | `JobServiceImplTest.searchJobs_salaryFilter` | matches jobs where min/max overlap range |
| Mapper excludes removed fields | `JobMapperTest` | `JobDetailResponse` has no salary/salaryNegotiable |

### Integration tests

| Test | Endpoint | Expected |
|---|---|---|
| POST `/api/v1/employer/jobs` | Body with `salaryMin: 20000000, salaryMax: 30000000, salaryCurrency: "VND"` | 200, job created with correct salary |
| POST `/api/v1/employer/jobs` | Body without salary fields | 200, job created with null salary (negotiable) |
| POST `/api/v1/employer/jobs` | Body with `salaryMin` but no `salaryMax` | 400, error `SALARY_MAX_REQUIRED` |
| GET `/api/v1/jobs/search?salaryMin=10000000&salaryMax=50000000&salaryCurrency=VND` | Filters correctly | Only returns jobs with overlapping range |
| GET `/api/v1/jobs/{slug}` | Response shape | No `salary` or `salaryNegotiable` in JSON |

### Manual checklist

- [ ] Run `reset-db.ps1` → DB recreated with new schema + seed data
- [ ] All 29 seed jobs load without errors
- [ ] Employer: create a new job with salary slider → verify API payload has `salaryMin/salaryMax/salaryCurrency`, no `salary`/`salaryNegotiable`
- [ ] Employer: check "Thương lượng" checkbox → verify API payload has all three salary fields as null/undefined
- [ ] Employer: edit existing job → slider loads with correct range from API
- [ ] Employer: edit → toggle negotiable on/off → verify correct save
- [ ] Job search: filter by salary range → returns correct results (excludes negotiable jobs)
- [ ] Job detail page: salary displays correctly (range or "Thương lượng")
- [ ] Saved jobs page: salary displays correctly
- [ ] Application cards: salary displays correctly
- [ ] Admin jobs page: no broken columns
- [ ] Frontend: `npm run type-check` passes
- [ ] Frontend: `npm run lint` passes
- [ ] Backend: `./mvnw compile` passes (MapStruct regeneration)
- [ ] Backend: `./mvnw test` passes

---

## File change summary

### Backend (8 files)

| File | Action |
|---|---|
| `resources/db/schema.sql` | Remove `salary`, `salary_negotiable` columns |
| `resources/db/data.sql` | Rewrite all INSERT column lists + values |
| `entity/job/Job.java` | Remove `salary`, `salaryNegotiable` fields |
| `dto/request/JobCreateRequest.java` | Remove `salary`, `salaryNegotiable` |
| `dto/request/JobUpdateRequest.java` | Remove `salary`, `salaryNegotiable` |
| `dto/response/JobDetailResponse.java` | Remove `salary`, `salaryNegotiable` |
| `dto/response/JobCardResponse.java` | Remove `salary`, `salaryNegotiable` |
| `dto/response/SavedJobItemResponse.java` | Remove `salary`; add `salaryMin`, `salaryMax`, `salaryCurrency` |
| `exception/ErrorCode.java` | Remove `SALARY_REQUIRED` enum value |
| `service/impl/JobServiceImpl.java` | Refactor `applySalaryFields`, update call sites, update search spec |

### Frontend (9+ files)

| File | Action |
|---|---|
| `types/response.types.ts` | Remove `salary`, `salaryNegotiable` from `JobSalaryResponse` |
| `types/request.types.ts` | Remove `salaryNegotiable`, `salary` from `JobSalaryRequest` |
| `utils/formatSalary.ts` | Remove `salary`, `salaryNegotiable` from `SalaryDisplayJob`; simplify `formatJobSalary` |
| `components/SalaryFormFields/index.tsx` | Rewrite: Slider + currency Select |
| `pages/Employer/EmployerJobs/index.tsx` | Update `JobsFormValues`, `onFinish`, `initialValues` |
| `pages/Employer/EmployerJobDetail/index.tsx` | Update `JobsFormValues`, `onFinish`, `form.setFieldsValue` |
| `components/CardApplication/index.tsx` | Remove local `salaryNegotiable` prop if present |
| `public/locales/en/employer.json` | Remove obsolete keys, add `salaryRange` |
| `public/locales/vi/employer.json` | Remove obsolete keys, add `salaryRange` |
