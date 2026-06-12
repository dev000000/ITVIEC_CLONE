# Job Search Filter + Pagination — Implementation Plan

## 1. Summary

Transform the Job Search page from a basic keyword/city search with single-value Select filters into a fully-featured search experience with:

- **Popover checkbox filters** for Experience Level and Working Model (replacing `<Select>` dropdowns)
- **New Job Domain filter** with search input + checkbox list
- **Multi-value filtering** on the backend (multiple experience levels, multiple job types, job domain)
- **Pagination** with Ant Design `<Pagination>` (page size 20, red active page, reset on filter change)
- **UI-only "Filter" button** at the far right of the filter bar

---

## 2. Backend

### 2.1 Service Interface

**File:** `it-viec-backend/src/main/java/com/dev001/itviec/service/JobService.java`

Change `searchJobs` signature:

```java
PageResponse<JobCardResponse> searchJobs(
    int page,
    int size,
    String keyword,
    Long cityId,
    List<JobType> jobTypes,                // was: JobType jobType
    List<ExperienceLevel> experienceLevels, // was: ExperienceLevel experienceLevel
    Long jobDomainId,                       // NEW
    Long salaryMin,
    Long salaryMax,
    SalaryCurrency salaryCurrency);
```

### 2.2 Controller

**File:** `it-viec-backend/src/main/java/com/dev001/itviec/controller/JobController.java`

Update `searchJobs` endpoint to accept `List` params (Spring auto-splits repeated query params or comma-separated values):

```java
@GetMapping("/jobs/search")
public ApiResponse<PageResponse<JobCardResponse>> searchJobs(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,          // default changed 10→20
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) Long cityId,
        @RequestParam(required = false) List<JobType> jobType,
        @RequestParam(required = false) List<ExperienceLevel> experienceLevel,
        @RequestParam(required = false) Long jobDomainId,     // NEW
        @RequestParam(required = false) Long salaryMin,
        @RequestParam(required = false) Long salaryMax,
        @RequestParam(required = false) SalaryCurrency salaryCurrency) {
    return ApiResponse.<PageResponse<JobCardResponse>>builder()
            .code(1000)
            .result(jobService.searchJobs(
                    page, size, keyword, cityId,
                    jobType, experienceLevel, jobDomainId,
                    salaryMin, salaryMax, salaryCurrency))
            .build();
}
```

**Note:** Spring Boot automatically binds repeated query params (`?jobType=ONSITE&jobType=REMOTE`) or comma-separated (`?jobType=ONSITE,REMOTE`) into a `List<Enum>`. No custom converter needed.

### 2.3 Service Implementation

**File:** `it-viec-backend/src/main/java/com/dev001/itviec/service/impl/JobServiceImpl.java`

#### 2.3.1 Update `searchJobs` method signature

```java
@Override
@Transactional(readOnly = true)
public PageResponse<JobCardResponse> searchJobs(
        int page,
        int size,
        String keyword,
        Long cityId,
        List<JobType> jobTypes,
        List<ExperienceLevel> experienceLevels,
        Long jobDomainId,
        Long salaryMin,
        Long salaryMax,
        SalaryCurrency salaryCurrency) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("postedAt"), Sort.Order.desc("id")));
    Page<Job> jobPage = jobRepository.findAll(
            buildPublicJobSearchSpecification(
                    keyword, cityId, jobTypes, experienceLevels, jobDomainId,
                    salaryMin, salaryMax, salaryCurrency),
            pageable);
    // ... same mapping as before
}
```

#### 2.3.2 Update `buildPublicJobSearchSpecification`

```java
Specification<Job> buildPublicJobSearchSpecification(
        String keyword,
        Long cityId,
        List<JobType> jobTypes,
        List<ExperienceLevel> experienceLevels,
        Long jobDomainId,
        Long salaryMin,
        Long salaryMax,
        SalaryCurrency salaryCurrency) {
    return (root, query, cb) -> {
        List<Predicate> predicates = new ArrayList<>();
        Join<Job, Skill> skillJoin = root.join("skills", JoinType.LEFT);

        if (query != null) {
            query.distinct(true);
        }

        predicates.add(cb.equal(root.get("status"), ACTIVE));

        // ... keyword logic stays the same ...

        if (cityId != null) {
            predicates.add(cb.equal(root.get("city").get("id"), cityId));
        }

        // CHANGED: multi-value jobType filter
        if (jobTypes != null && !jobTypes.isEmpty()) {
            predicates.add(root.get("jobType").in(jobTypes));
        }

        // CHANGED: multi-value experienceLevel filter
        if (experienceLevels != null && !experienceLevels.isEmpty()) {
            predicates.add(root.get("experienceLevel").in(experienceLevels));
        }

        // NEW: jobDomainId filter
        if (jobDomainId != null) {
            predicates.add(cb.equal(root.get("jobDomain").get("id"), jobDomainId));
        }

        // ... salary logic stays the same ...

        return cb.and(predicates.toArray(new Predicate[0]));
    };
}
```

### 2.4 No DB Changes Required

The `jobs` table already has `experience_level`, `job_type`, and `job_domain_id` columns. No schema migration needed.

---

## 3. Frontend

### 3.1 Types

**File:** `it-viec-frontend/src/types/request.types.ts`

Update `SearchJobsParams`:

```typescript
export interface SearchJobsParams extends PaginationParams {
  keyword?: string;
  cityId?: number;
  jobType?: JobType | JobType[];          // support array
  experienceLevel?: ExperienceLevel | ExperienceLevel[];  // support array
  jobDomainId?: number;                   // NEW
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
}
```

### 3.2 API Service

**File:** `it-viec-frontend/src/services/jobApi.ts`

The existing `searchJobsApi` already passes `params` to Axios. Axios serializes arrays as repeated params by default (`?jobType=ONSITE&jobType=REMOTE`), which matches Spring's `List<>` binding. **No changes needed** to `searchJobsApi` itself.

However, if Axios uses bracket format by default on the current `apiClient`, add `paramsSerializer` config:

```typescript
export const searchJobsApi = (params?: SearchJobsParams) => {
  const url = `${API_PATH}/jobs/search`;
  return apiClient.get<APIResponse<PageResponse<JobCardResponse>>>(url, {
    params,
    paramsSerializer: (p) => {
      const searchParams = new URLSearchParams();
      Object.entries(p).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, String(v)));
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      return searchParams.toString();
    },
  });
};
```

### 3.3 New Component: `CheckboxPopoverFilter`

**File:** `it-viec-frontend/src/components/CheckboxPopoverFilter/index.tsx`

A reusable Popover component with a checkbox list (used for both Level and Working Model filters).

```typescript
interface CheckboxPopoverFilterProps {
  label: string;                          // e.g. "Level"
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}
```

**Behavior:**
- Renders a pill-shaped button (same style as `SalaryRangeFilter`: `border-radius: 999px`, border, 14px font)
- Active state (any checkbox selected): red border + red text
- Button label shows: base label + count badge if selections > 0, e.g. "Level (2)"
- Popover content: vertical checkbox list (`<Checkbox.Group>` with vertical layout)
- Changes apply immediately (no Apply button — simpler UX matching screenshot)

**SCSS file:** `it-viec-frontend/src/components/CheckboxPopoverFilter/CheckboxPopoverFilter.scss`

Style the trigger button to match `.salary-range-filter` (pill shape, same padding, same active colors).

### 3.4 New Component: `JobDomainFilter`

**File:** `it-viec-frontend/src/components/JobDomainFilter/index.tsx`

A Popover with a search input at the top + checkbox list of job domains below.

```typescript
interface JobDomainFilterProps {
  selectedDomainId?: number;
  onChange: (domainId: number | undefined) => void;
}
```

**Behavior:**
- On mount, calls `getAllJobDomainsApi()` to fetch `JobDomainResponse[]`
- Translates domain names via `getJobDomainLabel(domainName, t)`
- Renders pill-shaped trigger button (same as other filters)
- Popover content:
  - `<Input>` for searching/filtering domain names locally
  - `<Radio.Group>` or `<Checkbox>` list (single-select since backend accepts single `jobDomainId`)
  - "Clear" link to deselect
- Active state: domain selected → red border + domain name as button text

**SCSS file:** `it-viec-frontend/src/components/JobDomainFilter/JobDomainFilter.scss`

### 3.5 JobSearch Page Updates

**File:** `it-viec-frontend/src/pages/Shared/JobSearch/index.tsx`

#### 3.5.1 Update `SearchFilters` interface

```typescript
interface SearchFilters extends SalaryRangeFilterValue {
  experienceLevels: ExperienceLevel[];    // was: experienceLevel?: ExperienceLevel
  jobTypes: JobType[];                    // was: jobType?: JobType
  jobDomainId?: number;                   // NEW
}

const defaultFilters: SearchFilters = {
  experienceLevels: [],
  jobTypes: [],
};
```

#### 3.5.2 Add pagination state

```typescript
const [currentPage, setCurrentPage] = useState(1);
const PAGE_SIZE = 20;
```

#### 3.5.3 Update `fetchJobs` to pass filters + pagination

```typescript
const response = await searchJobsApi({
  page: currentPage - 1,  // backend is 0-indexed
  size: PAGE_SIZE,
  keyword: keywordSegment || undefined,
  cityId: citySegment ? cities.find(c => c.slug === citySegment)?.id : undefined,
  experienceLevel: filters.experienceLevels.length > 0 ? filters.experienceLevels : undefined,
  jobType: filters.jobTypes.length > 0 ? filters.jobTypes : undefined,
  jobDomainId: filters.jobDomainId,
  salaryMin: filters.salaryMin,
  salaryMax: filters.salaryMax,
  salaryCurrency: filters.salaryCurrency,
});
```

#### 3.5.4 Reset page on filter change

```typescript
useEffect(() => {
  setCurrentPage(1);
}, [filters, keywordSegment, citySegment]);
```

Add `currentPage` to the `fetchJobs` useEffect dependency array.

#### 3.5.5 Replace filter UI in JSX

Replace the two `<Select>` components with:

```tsx
<div className="job-search__filter-wrap">
  {/* Experience Level - Popover checkbox */}
  <CheckboxPopoverFilter
    label={t("jobSearch.filters.experienceLevel")}
    options={experienceLevelOptions}
    selectedValues={filters.experienceLevels}
    onChange={(values) =>
      setFilters((prev) => ({ ...prev, experienceLevels: values as ExperienceLevel[] }))
    }
  />

  {/* Working Model - Popover checkbox */}
  <CheckboxPopoverFilter
    label={t("jobSearch.filters.jobType")}
    options={jobTypeOptions}
    selectedValues={filters.jobTypes}
    onChange={(values) =>
      setFilters((prev) => ({ ...prev, jobTypes: values as JobType[] }))
    }
  />

  {/* Salary Range - keep as-is */}
  <SalaryRangeFilter
    value={filters}
    onChange={(salaryFilter) => setFilters((prev) => ({ ...prev, ...salaryFilter }))}
  />

  {/* Job Domain - new */}
  <JobDomainFilter
    selectedDomainId={filters.jobDomainId}
    onChange={(domainId) => setFilters((prev) => ({ ...prev, jobDomainId: domainId }))}
  />

  {/* Filter button - UI only */}
  <button type="button" className="job-search__filter-btn">
    <FiFilter />
    {t("jobSearch.filters.filterButton")}
  </button>
</div>
```

#### 3.5.6 Add Pagination below job list

Inside the left `<Col>` (job list column), after the `.job-search__list-job` div:

```tsx
{totalJobs > PAGE_SIZE && (
  <div className="job-search__pagination">
    <Pagination
      current={currentPage}
      total={totalJobs}
      pageSize={PAGE_SIZE}
      align="center"
      onChange={(page) => setCurrentPage(page)}
      showSizeChanger={false}
    />
  </div>
)}
```

### 3.6 SCSS Updates

**File:** `it-viec-frontend/src/pages/Shared/JobSearch/JobSearch.scss`

Add pagination styles (copy pattern from `AppliedJobs.scss`):

```scss
&__pagination {
  padding: 24px 0;
  li {
    padding: 0 !important;
  }
  .ant-pagination-item {
    border-color: #dedede;
    min-width: 36px;
    height: 36px;
    line-height: 34px;
    border-radius: 4px;
    &-active {
      background-color: #ed1b2f;
      a {
        color: white;
      }
      &:hover {
        border-color: #ed1b2f;
        a {
          color: white;
        }
      }
    }
    &:not(.ant-pagination-item-active):hover {
      background-color: #fff5f5;
      border-color: #ed1b2f;
      a {
        color: #ed1b2f;
      }
    }
  }
}

&__filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #dedede;
  border-radius: 999px;
  background: #fff;
  color: #121212;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    border-color: #ed1b2f;
    color: #ed1b2f;
  }
}
```

Update `&__filter` rule — can be removed or kept as fallback for responsive.

### 3.7 i18n Updates

**File:** `it-viec-frontend/public/locales/en/shared.json`

Add keys inside `"jobSearch.filters"`:

```json
{
  "jobSearch": {
    "filters": {
      "experienceLevel": "Level",
      "jobType": "Working Model",
      "salary": "Salary",
      "jobDomain": "Job Domain",
      "filterButton": "Filter",
      "applySalary": "Apply",
      "clearSalary": "Clear filter",
      "searchDomain": "Search domain...",
      "clearDomain": "Clear",
      "selected": "{{count}} selected"
    }
  }
}
```

**File:** `it-viec-frontend/public/locales/vi/shared.json`

```json
{
  "jobSearch": {
    "filters": {
      "experienceLevel": "Cấp bậc",
      "jobType": "Hình thức",
      "salary": "Mức lương",
      "jobDomain": "Lĩnh vực",
      "filterButton": "Bộ lọc",
      "applySalary": "Áp dụng",
      "clearSalary": "Xóa bộ lọc",
      "searchDomain": "Tìm lĩnh vực...",
      "clearDomain": "Xóa",
      "selected": "{{count}} đã chọn"
    }
  }
}
```

### 3.8 New Imports Required

In `JobSearch/index.tsx`:
- `import { Pagination } from "antd";`
- `import { FiFilter } from "react-icons/fi";`
- `import CheckboxPopoverFilter from "@/components/CheckboxPopoverFilter";`
- `import JobDomainFilter from "@/components/JobDomainFilter";`

Remove: `Select` from antd imports (no longer used in filter section), or keep if used elsewhere.

---

## 4. File Change Summary

| Layer | File | Action |
|-------|------|--------|
| Backend | `service/JobService.java` | Update `searchJobs` signature |
| Backend | `controller/JobController.java` | Change params to `List<>`, add `jobDomainId`, default size→20 |
| Backend | `service/impl/JobServiceImpl.java` | Update `searchJobs` + `buildPublicJobSearchSpecification` |
| Frontend | `src/types/request.types.ts` | Update `SearchJobsParams` |
| Frontend | `src/services/jobApi.ts` | Add `paramsSerializer` to `searchJobsApi` |
| Frontend | `src/components/CheckboxPopoverFilter/index.tsx` | **NEW** |
| Frontend | `src/components/CheckboxPopoverFilter/CheckboxPopoverFilter.scss` | **NEW** |
| Frontend | `src/components/JobDomainFilter/index.tsx` | **NEW** |
| Frontend | `src/components/JobDomainFilter/JobDomainFilter.scss` | **NEW** |
| Frontend | `src/pages/Shared/JobSearch/index.tsx` | Major refactor of filter + add pagination |
| Frontend | `src/pages/Shared/JobSearch/JobSearch.scss` | Add pagination + filter-btn styles |
| Frontend | `public/locales/en/shared.json` | Add filter i18n keys |
| Frontend | `public/locales/vi/shared.json` | Add filter i18n keys |

---

## 5. Verification — Manual Testing Checklist

### Backend
- [ ] `GET /api/v1/jobs/search?page=0&size=20` returns paginated results with `totalElements`
- [ ] `GET /api/v1/jobs/search?experienceLevel=INTERN&experienceLevel=FRESHER` returns jobs matching either level
- [ ] `GET /api/v1/jobs/search?jobType=ONSITE&jobType=REMOTE` returns jobs matching either type
- [ ] `GET /api/v1/jobs/search?jobDomainId=5` returns only jobs in that domain
- [ ] Combined filters work: `?experienceLevel=SENIOR&jobType=REMOTE&jobDomainId=3`
- [ ] Empty filter lists still return all jobs (no server error)
- [ ] Existing salary filter still works alongside new filters
- [ ] `./mvnw test` passes (update `JobServiceImpl` unit tests if they exist)

### Frontend
- [ ] Filter bar renders: Level | Working Model | Salary | Job Domain | Filter (button)
- [ ] Clicking "Level" opens Popover with checkbox list (INTERN, FRESHER, JUNIOR, MID, SENIOR, LEAD, MANAGER)
- [ ] Selecting multiple levels triggers API call with repeated params
- [ ] Level pill shows active state (red border) when checkboxes selected
- [ ] Working Model Popover shows ONSITE, HYBRID, REMOTE, FLEXIBLE checkboxes
- [ ] Salary filter still works as before (slider in Popover)
- [ ] Job Domain Popover loads domains from API, shows search input + list
- [ ] Job Domain search input filters the list locally
- [ ] Selecting a domain updates the pill text and triggers API call with `jobDomainId`
- [ ] Filter button renders with icon, no interaction needed
- [ ] Pagination appears below job list when `totalJobs > 20`
- [ ] Clicking a page number loads that page (API called with `page=N-1`)
- [ ] Changing any filter resets pagination to page 1
- [ ] Changing keyword/city search resets filters AND pagination
- [ ] Red active page styling matches the AppliedJobs pagination
- [ ] Mobile responsive: filters wrap, pagination centered
- [ ] Vietnamese locale shows correct translations
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
