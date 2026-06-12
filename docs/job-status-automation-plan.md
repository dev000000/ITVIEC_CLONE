# Job Status Automation — Implementation Plan

> Generated from `docs/job-status-automation-spec.md`.
> Pre-requisite work already merged: public seeker APIs (`searchJobs`, `getJobCards`, `getJobBySlug`) filter `status = ACTIVE AND posted_at <= NOW() AND (expires_at IS NULL OR expires_at > NOW())`; `JobRepository.findPublicVisibleBySlug` added.

---

## 1 Summary

Implement a formal state machine for jobs: **DRAFT → ACTIVE → CLOSED / EXPIRED**, with a **repost** path from CLOSED/EXPIRED back to ACTIVE. Three new employer PATCH endpoints (`publish`, `close`, `repost`), an hourly Spring `@Scheduled` task for auto-expiry, two new DB columns (`published_at`, `closed_at`), two new indexes, new error codes, an optional `effectiveStatus` computed field in responses, and full frontend UX for employer job actions.

### State Diagram

```
          publish
  DRAFT ──────────► ACTIVE
                       │
              close ┌──┴──┐ auto-expire
                    ▼     ▼
                 CLOSED  EXPIRED
                    │     │
                    └──┬──┘ repost
                       ▼
                     ACTIVE
```

No transition back to DRAFT from any state.

---

## 2 Backend

### 2.1 Schema Changes

**File:** `it-viec-backend/src/main/resources/db/schema.sql`

Add two columns to `jobs` table and two indexes:

```sql
-- New columns (run as migration, not inline in CREATE TABLE)
ALTER TABLE jobs
  ADD COLUMN published_at DATETIME NULL AFTER expires_at,
  ADD COLUMN closed_at    DATETIME NULL AFTER published_at;

-- Indexes for scheduler and visibility queries
CREATE INDEX idx_jobs_status_expires ON jobs(status, expires_at);
CREATE INDEX idx_jobs_status_posted  ON jobs(status, posted_at);
```

Also update the `CREATE TABLE jobs` block in `schema.sql` to include these columns for fresh setups.

### 2.2 Entity Changes

**File:** `com.dev001.itviec.entity.job.Job`

```java
// Add after expiresAt field:
@Column(name = "published_at", columnDefinition = "DATETIME")
LocalDateTime publishedAt;

@Column(name = "closed_at", columnDefinition = "DATETIME")
LocalDateTime closedAt;
```

Change default status from `ACTIVE` to `DRAFT`:

```java
@Builder.Default
JobStatus status = JobStatus.DRAFT;
```

### 2.3 Enum — No Changes

**File:** `com.dev001.itviec.enums.JobStatus`

Already has `ACTIVE`, `CLOSED`, `DRAFT`, `EXPIRED`. No changes needed.

### 2.4 Repository Changes

**File:** `com.dev001.itviec.repository.JobRepository`

Add these query methods:

```java
/**
 * Find all ACTIVE jobs whose expires_at is non-null and <= now.
 * Used by the hourly scheduler to auto-expire jobs.
 */
@Modifying
@Query("UPDATE Job j SET j.status = com.dev001.itviec.enums.JobStatus.EXPIRED, "
     + "j.updatedAt = :now "
     + "WHERE j.status = com.dev001.itviec.enums.JobStatus.ACTIVE "
     + "AND j.expiresAt IS NOT NULL AND j.expiresAt <= :now")
int expireOverdueJobs(@Param("now") LocalDateTime now);

/**
 * Find a job owned by a specific company.
 * Already exists: findByIdAndCompany(Long id, Company company)
 */
```

### 2.5 Error Codes

**File:** `com.dev001.itviec.exception.ErrorCode`

Add the following entries (continuing from existing max code 1132):

```java
// --- Job Status Automation (section 11 of spec) ---
JOB_NOT_PUBLISHABLE(1200, "Job can only be published from DRAFT status", HttpStatus.BAD_REQUEST),
JOB_NOT_CLOSABLE(1201, "Job can only be closed from ACTIVE status", HttpStatus.BAD_REQUEST),
JOB_NOT_REPOSTABLE(1202, "Job can only be reposted from CLOSED or EXPIRED status", HttpStatus.BAD_REQUEST),
JOB_POSTED_AT_MUST_BE_FUTURE(1203, "posted_at must be now or in the future", HttpStatus.BAD_REQUEST),
JOB_EXPIRES_AT_MUST_BE_AFTER_POSTED(1204, "expires_at must be after posted_at", HttpStatus.BAD_REQUEST),
JOB_EXPIRES_AT_STILL_IN_PAST(1205, "expires_at is still in the past; provide a future date to repost", HttpStatus.BAD_REQUEST),
JOB_ALREADY_ACTIVE(1206, "Job is already in ACTIVE status", HttpStatus.BAD_REQUEST),
JOB_TRANSITION_NOT_ALLOWED(1207, "Invalid job status transition", HttpStatus.BAD_REQUEST),
```

### 2.6 Service Interface

**File:** `com.dev001.itviec.service.JobService`

Add these method signatures:

```java
/** DRAFT → ACTIVE (employer). Optional overrides for postedAt/expiresAt. */
JobDetailResponse publishJob(Long jobId, JobPublishRequest request);

/** ACTIVE → CLOSED (employer). */
JobDetailResponse closeJob(Long jobId);

/** CLOSED/EXPIRED → ACTIVE (employer). Requires new postedAt/expiresAt. */
JobDetailResponse repostJob(Long jobId, JobRepostRequest request);

/** System: expire all overdue ACTIVE jobs. Returns count expired. */
int expireOverdueJobs();

/** Admin: manually expire a single job. */
JobDetailResponse expireJobByAdmin(Long jobId);
```

### 2.7 Service Implementation

**File:** `com.dev001.itviec.service.impl.JobServiceImpl`

#### 2.7.1 `publishJob(Long jobId, JobPublishRequest request)`

```java
@Transactional
public JobDetailResponse publishJob(Long jobId, JobPublishRequest request) {
    Company company = getCurrentEmployerCompany();
    Job job = jobRepository.findByIdAndCompany(jobId, company)
            .orElseThrow(() -> new AppException(JOB_NOT_FOUND));

    if (job.getStatus() != JobStatus.DRAFT) {
        throw new AppException(ErrorCode.JOB_NOT_PUBLISHABLE);
    }

    LocalDateTime now = LocalDateTime.now();

    // posted_at: use override or default to NOW
    LocalDateTime postedAt = request.getPostedAt() != null
            ? request.getPostedAt() : now;

    // Validate: posted_at must be >= NOW (truncated to minutes for tolerance)
    if (postedAt.isBefore(now.minusMinutes(1))) {
        throw new AppException(ErrorCode.JOB_POSTED_AT_MUST_BE_FUTURE);
    }

    // expires_at: use override or keep existing
    LocalDateTime expiresAt = request.getExpiresAt() != null
            ? request.getExpiresAt() : job.getExpiresAt();

    if (expiresAt != null && !expiresAt.isAfter(postedAt)) {
        throw new AppException(ErrorCode.JOB_EXPIRES_AT_MUST_BE_AFTER_POSTED);
    }

    job.setStatus(JobStatus.ACTIVE);
    job.setPostedAt(postedAt);
    job.setExpiresAt(expiresAt);
    job.setPublishedAt(now);
    job.setClosedAt(null);

    return jobMapper.toJobDetailResponse(jobRepository.save(job));
}
```

#### 2.7.2 `closeJob(Long jobId)`

```java
@Transactional
public JobDetailResponse closeJob(Long jobId) {
    Company company = getCurrentEmployerCompany();
    Job job = jobRepository.findByIdAndCompany(jobId, company)
            .orElseThrow(() -> new AppException(JOB_NOT_FOUND));

    if (job.getStatus() != JobStatus.ACTIVE) {
        throw new AppException(ErrorCode.JOB_NOT_CLOSABLE);
    }

    job.setStatus(JobStatus.CLOSED);
    job.setClosedAt(LocalDateTime.now());

    return jobMapper.toJobDetailResponse(jobRepository.save(job));
}
```

#### 2.7.3 `repostJob(Long jobId, JobRepostRequest request)`

```java
@Transactional
public JobDetailResponse repostJob(Long jobId, JobRepostRequest request) {
    Company company = getCurrentEmployerCompany();
    Job job = jobRepository.findByIdAndCompany(jobId, company)
            .orElseThrow(() -> new AppException(JOB_NOT_FOUND));

    if (job.getStatus() != JobStatus.CLOSED && job.getStatus() != JobStatus.EXPIRED) {
        throw new AppException(ErrorCode.JOB_NOT_REPOSTABLE);
    }

    LocalDateTime now = LocalDateTime.now();
    LocalDateTime postedAt = request.getPostedAt();
    LocalDateTime expiresAt = request.getExpiresAt();

    if (postedAt.isBefore(now.minusMinutes(1))) {
        throw new AppException(ErrorCode.JOB_POSTED_AT_MUST_BE_FUTURE);
    }
    if (expiresAt != null && !expiresAt.isAfter(postedAt)) {
        throw new AppException(ErrorCode.JOB_EXPIRES_AT_MUST_BE_AFTER_POSTED);
    }
    if (expiresAt != null && !expiresAt.isAfter(now)) {
        throw new AppException(ErrorCode.JOB_EXPIRES_AT_STILL_IN_PAST);
    }

    job.setStatus(JobStatus.ACTIVE);
    job.setPostedAt(postedAt);
    job.setExpiresAt(expiresAt);
    job.setPublishedAt(now);
    job.setClosedAt(null);

    return jobMapper.toJobDetailResponse(jobRepository.save(job));
}
```

#### 2.7.4 `expireOverdueJobs()`

```java
@Transactional
public int expireOverdueJobs() {
    int count = jobRepository.expireOverdueJobs(LocalDateTime.now());
    if (count > 0) {
        log.info("Auto-expired {} overdue jobs", count);
    }
    return count;
}
```

#### 2.7.5 `expireJobByAdmin(Long jobId)`

```java
@Transactional
public JobDetailResponse expireJobByAdmin(Long jobId) {
    Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new AppException(JOB_NOT_FOUND));

    if (job.getStatus() != JobStatus.ACTIVE) {
        throw new AppException(ErrorCode.JOB_NOT_CLOSABLE);
    }

    job.setStatus(JobStatus.EXPIRED);
    job.setClosedAt(LocalDateTime.now());

    return jobMapper.toJobDetailResponse(jobRepository.save(job));
}
```

#### 2.7.6 Modify `createJob`

Update `createJob` to enforce: when `status = DRAFT`, `postedAt` is not set to now automatically. When `status = ACTIVE`, apply publish validation. Keep existing `deleteJobByCurrentEmployer` behavior (sets CLOSED) but also set `closedAt = now`.

```java
// In createJob:
if (request.getStatus() == JobStatus.DRAFT) {
    // DRAFT: postedAt/expiresAt are optional, stored as-is
    job.setPostedAt(request.getPostedAt());
} else if (request.getStatus() == JobStatus.ACTIVE) {
    // Immediate publish: apply validation
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime postedAt = request.getPostedAt() != null ? request.getPostedAt() : now;
    job.setPostedAt(postedAt);
    job.setPublishedAt(now);
} else {
    throw new AppException(ErrorCode.JOB_TRANSITION_NOT_ALLOWED);
}
```

#### 2.7.7 Modify `deleteJobByCurrentEmployer` / `deleteJobByAdmin`

Add `closedAt` timestamp:

```java
job.setStatus(CLOSED);
job.setClosedAt(LocalDateTime.now());
```

### 2.8 New DTO Classes

#### 2.8.1 `JobPublishRequest`

**File:** `com.dev001.itviec.dto.request.JobPublishRequest`

```java
package com.dev001.itviec.dto.request;

import java.time.LocalDateTime;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobPublishRequest {
    LocalDateTime postedAt;   // optional override, defaults to NOW
    LocalDateTime expiresAt;  // optional override, keeps existing if null
}
```

#### 2.8.2 `JobRepostRequest`

**File:** `com.dev001.itviec.dto.request.JobRepostRequest`

```java
package com.dev001.itviec.dto.request;

import java.time.LocalDateTime;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobRepostRequest {
    @NotNull(message = "POSTED_AT_REQUIRED")
    LocalDateTime postedAt;

    LocalDateTime expiresAt;
}
```

#### 2.8.3 Update `JobDetailResponse`

**File:** `com.dev001.itviec.dto.response.JobDetailResponse`

Add fields:

```java
LocalDateTime publishedAt;
LocalDateTime closedAt;
String effectiveStatus;  // optional computed: "ACTIVE", "SCHEDULED", "ACTIVE_VISIBLE"
```

### 2.9 Mapper Updates

**File:** `com.dev001.itviec.mapper.JobMapper`

Add a default method (or configure MapStruct `@AfterMapping`) for `effectiveStatus`:

```java
@AfterMapping
default void computeEffectiveStatus(Job job, @MappingTarget JobDetailResponse.JobDetailResponseBuilder response) {
    if (job.getStatus() == JobStatus.ACTIVE) {
        LocalDateTime now = LocalDateTime.now();
        if (job.getPostedAt() != null && job.getPostedAt().isAfter(now)) {
            response.effectiveStatus("SCHEDULED");
        } else if (job.getExpiresAt() != null && !job.getExpiresAt().isAfter(now)) {
            response.effectiveStatus("EXPIRED_PENDING");
        } else {
            response.effectiveStatus("ACTIVE_VISIBLE");
        }
    } else {
        response.effectiveStatus(job.getStatus().name());
    }
}
```

### 2.10 Controller Endpoints

**File:** `com.dev001.itviec.controller.JobController`

Add these endpoints inside the existing controller:

```java
// --- Employer Job Status Actions ---

@PatchMapping("/companies/me/jobs/{id}/publish")
@PreAuthorize("hasRole('EMPLOYER')")
public ApiResponse<JobDetailResponse> publishJob(
        @PathVariable Long id,
        @RequestBody(required = false) @Valid JobPublishRequest request) {
    if (request == null) request = new JobPublishRequest();
    return ApiResponse.<JobDetailResponse>builder()
            .code(1000)
            .result(jobService.publishJob(id, request))
            .build();
}

@PatchMapping("/companies/me/jobs/{id}/close")
@PreAuthorize("hasRole('EMPLOYER')")
public ApiResponse<JobDetailResponse> closeJob(@PathVariable Long id) {
    return ApiResponse.<JobDetailResponse>builder()
            .code(1000)
            .result(jobService.closeJob(id))
            .build();
}

@PatchMapping("/companies/me/jobs/{id}/repost")
@PreAuthorize("hasRole('EMPLOYER')")
public ApiResponse<JobDetailResponse> repostJob(
        @PathVariable Long id,
        @RequestBody @Valid JobRepostRequest request) {
    return ApiResponse.<JobDetailResponse>builder()
            .code(1000)
            .result(jobService.repostJob(id, request))
            .build();
}

// --- Admin Manual Expire ---

@PatchMapping("/admin/jobs/{id}/expire")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<JobDetailResponse> expireJobByAdmin(@PathVariable Long id) {
    return ApiResponse.<JobDetailResponse>builder()
            .code(1000)
            .result(jobService.expireJobByAdmin(id))
            .build();
}
```

### 2.11 Scheduled Task

**New file:** `com.dev001.itviec.scheduler.JobExpiryScheduler`

```java
package com.dev001.itviec.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.dev001.itviec.service.JobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JobExpiryScheduler {

    private final JobService jobService;

    /** Runs every hour at minute 0. Expires all ACTIVE jobs past their expires_at. */
    @Scheduled(cron = "0 0 * * * *")
    public void expireOverdueJobs() {
        log.info("Running scheduled job expiry check...");
        int count = jobService.expireOverdueJobs();
        log.info("Scheduled job expiry complete. Expired {} jobs.", count);
    }
}
```

### 2.12 Configuration

**File:** `com.dev001.itviec.ItviecApplication` (or a dedicated `@Configuration` class)

Ensure `@EnableScheduling` is present on the main application class or a config class:

```java
@SpringBootApplication
@EnableScheduling
public class ItviecApplication { ... }
```

### 2.13 Security Config

**File:** `com.dev001.itviec.configuration.SecurityConfig`

No changes needed. The new PATCH endpoints (`/companies/me/jobs/{id}/publish`, `/close`, `/repost`) require authentication (they are not in `PUBLIC_URLS_GET`) and use `@PreAuthorize("hasRole('EMPLOYER')")` at the method level. Same for the admin expire endpoint.

---

## 3 Frontend

### 3.1 Types

#### 3.1.1 `response.types.ts`

**File:** `it-viec-frontend/src/types/response.types.ts`

Update `JobDetailResponse`:

```typescript
export interface JobDetailResponse extends JobSalaryResponse {
  // ... existing fields ...
  publishedAt: string;       // new — LocalDateTime ISO string
  closedAt: string;          // new — LocalDateTime ISO string
  effectiveStatus: string;   // new — "ACTIVE_VISIBLE" | "SCHEDULED" | "EXPIRED_PENDING" | status name
}
```

#### 3.1.2 `request.types.ts`

**File:** `it-viec-frontend/src/types/request.types.ts`

Add:

```typescript
export interface JobPublishRequest {
  postedAt?: IsoDateTimeString;
  expiresAt?: IsoDateTimeString;
}

export interface JobRepostRequest {
  postedAt: IsoDateTimeString;
  expiresAt?: IsoDateTimeString;
}
```

### 3.2 API Service

**File:** `it-viec-frontend/src/services/jobApi.ts`

Add these functions (before the default export):

```typescript
import type { JobPublishRequest, JobRepostRequest } from "@/types/request.types";

/**
 * Publish a DRAFT job → ACTIVE.
 * PATCH /api/v1/companies/me/jobs/:id/publish
 */
export const publishJobApi = (
  id: number | string,
  request?: JobPublishRequest,
) => {
  const url = `${API_PATH}/companies/me/jobs/${id}/publish`;
  return apiClient.patch<APIResponse<JobDetailResponse>>(url, request ?? {});
};

/**
 * Close an ACTIVE job → CLOSED.
 * PATCH /api/v1/companies/me/jobs/:id/close
 */
export const closeJobApi = (id: number | string) => {
  const url = `${API_PATH}/companies/me/jobs/${id}/close`;
  return apiClient.patch<APIResponse<JobDetailResponse>>(url);
};

/**
 * Repost a CLOSED/EXPIRED job → ACTIVE.
 * PATCH /api/v1/companies/me/jobs/:id/repost
 */
export const repostJobApi = (
  id: number | string,
  request: JobRepostRequest,
) => {
  const url = `${API_PATH}/companies/me/jobs/${id}/repost`;
  return apiClient.patch<APIResponse<JobDetailResponse>>(url, request);
};

/**
 * Admin: manually expire an ACTIVE job → EXPIRED.
 * PATCH /api/v1/admin/jobs/:id/expire
 */
export const expireAdminJobApi = (id: number | string) => {
  const url = `${API_PATH}/admin/jobs/${id}/expire`;
  return apiClient.patch<APIResponse<JobDetailResponse>>(url);
};
```

Update the default export to include the new functions:

```typescript
export default {
  // ... existing ...
  publishJobApi,
  closeJobApi,
  repostJobApi,
  expireAdminJobApi,
};
```

### 3.3 Pages / Components

#### 3.3.1 `EmployerJobDetail` — Status Action Buttons

**File:** `it-viec-frontend/src/pages/Employer/EmployerJobDetail/index.tsx`

Add conditional action buttons based on `job.status`:

| Current Status | Visible Actions |
|---|---|
| `DRAFT` | **Publish**, Edit, Delete |
| `ACTIVE` | **Close**, Edit |
| `CLOSED` | **Repost**, Edit |
| `EXPIRED` | **Repost**, Edit |

Implementation approach:

1. Import new API functions: `publishJobApi`, `closeJobApi`, `repostJobApi`.
2. Add handler functions:

```typescript
const handlePublish = async () => {
  const result = await Swal.fire({
    title: t("employer:jobs.notifications.publishConfirmTitle"),
    text: t("employer:jobs.notifications.publishConfirmText"),
    icon: "question",
    showCancelButton: true,
    confirmButtonText: t("employer:jobs.notifications.publishConfirmButton"),
  });
  if (result.isConfirmed) {
    try {
      const { data } = await publishJobApi(id!);
      setJob(data.result);
      Swal.fire({ title: t("employer:jobs.notifications.publishSuccess"), icon: "success" });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("employer:jobs.notifications.oops"), text: getApiErrorMessage(error, t) });
    }
  }
};

const handleClose = async () => {
  const result = await Swal.fire({
    title: t("employer:jobs.notifications.closeConfirmTitle"),
    text: t("employer:jobs.notifications.closeConfirmText"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: t("employer:jobs.notifications.closeConfirmButton"),
  });
  if (result.isConfirmed) {
    try {
      const { data } = await closeJobApi(id!);
      setJob(data.result);
      Swal.fire({ title: t("employer:jobs.notifications.closeSuccess"), icon: "success" });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("employer:jobs.notifications.oops"), text: getApiErrorMessage(error, t) });
    }
  }
};

const handleRepost = async () => {
  // Open a modal/dialog to collect new postedAt and expiresAt
  // Then call repostJobApi(id, { postedAt, expiresAt })
};
```

3. Render buttons conditionally:

```tsx
<div className="employer-job__button-wrap">
  {job?.status === "DRAFT" && (
    <ButtonAction text={t("employer:jobs.publish")} icon={<MdPublish />} handle={handlePublish} />
  )}
  {job?.status === "ACTIVE" && (
    <ButtonAction text={t("employer:jobs.close")} icon={<MdClose />} handle={handleClose} />
  )}
  {(job?.status === "CLOSED" || job?.status === "EXPIRED") && (
    <ButtonAction text={t("employer:jobs.repost")} icon={<MdRefresh />} handle={handleRepost} />
  )}
  {(job?.status === "DRAFT" || job?.status === "ACTIVE") && (
    <ButtonAction text={t("employer:jobs.edit")} icon={<TbEdit />} handle={handleEdit} />
  )}
  {job?.status === "DRAFT" && (
    <ButtonAction text={t("employer:jobs.delete")} icon={<RiDeleteBin5Line />} handle={handleDelete} />
  )}
</div>
```

4. Add a **Repost Modal** component (or inline modal) that collects new `postedAt` and `expiresAt` with DatePicker, validates (both future, expiresAt > postedAt), and calls `repostJobApi`.

#### 3.3.2 `EmployerJobs` — Status Badge & Quick Actions

**File:** `it-viec-frontend/src/pages/Employer/EmployerJobs/index.tsx`

- Display status badge (color-coded) on each `TopJobItemEmployer` card.
- Consider adding a quick "Publish" button on DRAFT cards directly in the list.
- The `TopJobItemEmployer` component should show `effectiveStatus` if available (e.g., "Scheduled" for future-posted ACTIVE jobs).

#### 3.3.3 `EmployerJobs` — Create Job Default Status

Update the create job form to default status to `DRAFT` instead of allowing arbitrary selection. The employer should create as DRAFT, then publish separately. Alternatively, keep ACTIVE/DRAFT options but enforce validation.

#### 3.3.4 Status Badge Component (optional, recommended)

**New file:** `it-viec-frontend/src/components/JobStatusBadge/index.tsx`

```typescript
import { Tag } from "antd";
import { useTranslation } from "react-i18next";

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "default",
  ACTIVE: "success",
  ACTIVE_VISIBLE: "success",
  SCHEDULED: "processing",
  CLOSED: "error",
  EXPIRED: "warning",
};

interface Props {
  status: string;
  effectiveStatus?: string;
}

const JobStatusBadge = ({ status, effectiveStatus }: Props) => {
  const { t } = useTranslation();
  const displayStatus = effectiveStatus || status;
  const color = STATUS_COLORS[displayStatus] || "default";
  const label = t(`employer:jobs.status.${displayStatus.toLowerCase()}`, displayStatus);
  return <Tag color={color}>{label}</Tag>;
};

export default JobStatusBadge;
```

### 3.4 Routes

**File:** `it-viec-frontend/src/routes/EmployerPrivateRoute.tsx`

No route changes needed. Existing routes:
- `/employer/job` → `EmployerJobs`
- `/employer/job/:id` → `EmployerJobDetail`

### 3.5 i18n Keys

#### 3.5.1 English — `public/locales/en/employer.json`

Add under `"jobs"`:

```json
{
  "jobs": {
    "publish": "Publish Job",
    "close": "Close Job",
    "repost": "Repost Job",
    "status": {
      "active": "Active",
      "closed": "Closed",
      "draft": "Draft",
      "expired": "Expired",
      "scheduled": "Scheduled",
      "active_visible": "Active"
    },
    "notifications": {
      "publishConfirmTitle": "Publish this job?",
      "publishConfirmText": "This job will become visible to seekers based on its start date.",
      "publishConfirmButton": "Yes, publish",
      "publishSuccess": "Job published successfully!",
      "closeConfirmTitle": "Close this job?",
      "closeConfirmText": "This job will no longer be visible to seekers.",
      "closeConfirmButton": "Yes, close it",
      "closeSuccess": "Job closed successfully!",
      "repostConfirmTitle": "Repost this job?",
      "repostConfirmText": "Please set a new start and end date.",
      "repostConfirmButton": "Repost",
      "repostSuccess": "Job reposted successfully!",
      "repostFail": "Failed to repost job!"
    },
    "repostModal": {
      "title": "Repost Job",
      "postedAt": "New Start Date",
      "expiresAt": "New End Date",
      "postedAtRequired": "Please select a start date",
      "expiresAtRequired": "Please select an end date",
      "submit": "Repost"
    }
  }
}
```

#### 3.5.2 Vietnamese — `public/locales/vi/employer.json`

Add under `"jobs"`:

```json
{
  "jobs": {
    "publish": "Đăng tuyển",
    "close": "Đóng việc",
    "repost": "Đăng lại",
    "status": {
      "active": "Đang tuyển",
      "closed": "Đã đóng",
      "draft": "Nháp",
      "expired": "Hết hạn",
      "scheduled": "Đã lên lịch",
      "active_visible": "Đang tuyển"
    },
    "notifications": {
      "publishConfirmTitle": "Đăng tuyển công việc này?",
      "publishConfirmText": "Công việc sẽ hiển thị cho ứng viên dựa trên ngày bắt đầu.",
      "publishConfirmButton": "Đăng tuyển",
      "publishSuccess": "Đăng tuyển thành công!",
      "closeConfirmTitle": "Đóng công việc này?",
      "closeConfirmText": "Công việc sẽ không còn hiển thị cho ứng viên.",
      "closeConfirmButton": "Đóng",
      "closeSuccess": "Đã đóng công việc!",
      "repostConfirmTitle": "Đăng lại công việc này?",
      "repostConfirmText": "Vui lòng chọn ngày bắt đầu và kết thúc mới.",
      "repostConfirmButton": "Đăng lại",
      "repostSuccess": "Đăng lại thành công!",
      "repostFail": "Đăng lại thất bại!"
    },
    "repostModal": {
      "title": "Đăng lại việc làm",
      "postedAt": "Ngày bắt đầu mới",
      "expiresAt": "Ngày kết thúc mới",
      "postedAtRequired": "Vui lòng chọn ngày bắt đầu",
      "expiresAtRequired": "Vui lòng chọn ngày kết thúc",
      "submit": "Đăng lại"
    }
  }
}
```

---

## 4 Verification

### 4.1 Unit Tests

**Package:** `com.dev001.itviec.service.impl` (test)

#### 4.1.1 `JobServiceImplTest` — State Transitions

| Test | Setup | Action | Expected |
|------|-------|--------|----------|
| `publishJob_fromDraft_succeeds` | Job status=DRAFT | `publishJob(id, {})` | status=ACTIVE, publishedAt=now, postedAt=now |
| `publishJob_fromDraft_withFuturePostedAt` | Job status=DRAFT | `publishJob(id, {postedAt=+7d})` | status=ACTIVE, postedAt=+7d (scheduled) |
| `publishJob_fromActive_throws` | Job status=ACTIVE | `publishJob(id, {})` | `AppException(JOB_NOT_PUBLISHABLE)` |
| `publishJob_fromClosed_throws` | Job status=CLOSED | `publishJob(id, {})` | `AppException(JOB_NOT_PUBLISHABLE)` |
| `publishJob_fromExpired_throws` | Job status=EXPIRED | `publishJob(id, {})` | `AppException(JOB_NOT_PUBLISHABLE)` |
| `publishJob_pastPostedAt_throws` | Job status=DRAFT | `publishJob(id, {postedAt=yesterday})` | `AppException(JOB_POSTED_AT_MUST_BE_FUTURE)` |
| `publishJob_expiresBeforePosted_throws` | Job status=DRAFT | `publishJob(id, {postedAt=+7d, expiresAt=+3d})` | `AppException(JOB_EXPIRES_AT_MUST_BE_AFTER_POSTED)` |
| `closeJob_fromActive_succeeds` | Job status=ACTIVE | `closeJob(id)` | status=CLOSED, closedAt=now |
| `closeJob_fromDraft_throws` | Job status=DRAFT | `closeJob(id)` | `AppException(JOB_NOT_CLOSABLE)` |
| `closeJob_fromClosed_throws` | Job status=CLOSED | `closeJob(id)` | `AppException(JOB_NOT_CLOSABLE)` |
| `repostJob_fromClosed_succeeds` | Job status=CLOSED | `repostJob(id, {postedAt=now, expiresAt=+30d})` | status=ACTIVE, publishedAt=now, closedAt=null |
| `repostJob_fromExpired_succeeds` | Job status=EXPIRED | `repostJob(id, {postedAt=now, expiresAt=+30d})` | status=ACTIVE |
| `repostJob_fromActive_throws` | Job status=ACTIVE | `repostJob(id, {...})` | `AppException(JOB_NOT_REPOSTABLE)` |
| `repostJob_fromDraft_throws` | Job status=DRAFT | `repostJob(id, {...})` | `AppException(JOB_NOT_REPOSTABLE)` |
| `repostJob_pastExpiresAt_throws` | Job status=CLOSED | `repostJob(id, {postedAt=now, expiresAt=yesterday})` | `AppException(JOB_EXPIRES_AT_STILL_IN_PAST)` |
| `repostJob_pastPostedAt_throws` | Job status=CLOSED | `repostJob(id, {postedAt=yesterday, expiresAt=+30d})` | `AppException(JOB_POSTED_AT_MUST_BE_FUTURE)` |

#### 4.1.2 `JobExpirySchedulerTest`

| Test | Setup | Expected |
|------|-------|----------|
| `expireOverdueJobs_expiresMatchingJobs` | 3 ACTIVE jobs: one expired, one future, one null expiresAt | 1 expired, 2 untouched |
| `expireOverdueJobs_noMatches_returnsZero` | No ACTIVE jobs with past expiresAt | returns 0 |
| `expireOverdueJobs_ignoresNonActiveStatuses` | DRAFT job with past expiresAt | 0 expired |

### 4.2 Integration Tests

**Package:** `com.dev001.itviec.controller` (test)

| Test | Method | Endpoint | Expected |
|------|--------|----------|----------|
| `publishJob_201` | PATCH | `/api/v1/companies/me/jobs/{id}/publish` | 200, status=ACTIVE |
| `publishJob_wrongState_400` | PATCH | same | 400, code=1200 |
| `closeJob_200` | PATCH | `/api/v1/companies/me/jobs/{id}/close` | 200, status=CLOSED |
| `repostJob_200` | PATCH | `/api/v1/companies/me/jobs/{id}/repost` | 200, status=ACTIVE |
| `repostJob_pastExpires_400` | PATCH | same | 400, code=1205 |
| `publishJob_otherEmployer_404` | PATCH | wrong employer's job | 404 |
| `adminExpire_200` | PATCH | `/api/v1/admin/jobs/{id}/expire` | 200, status=EXPIRED |
| `seekerCannotSeeScheduledJob` | GET | `/api/v1/jobs/slug/{slug}` | 404 (posted_at in future) |
| `seekerCannotSeeExpiredJob` | GET | `/api/v1/jobs/slug/{slug}` | 404 (expired) |

### 4.3 Manual Checklist

- [ ] Create a DRAFT job → verify it does NOT appear in public `/api/v1/jobs` or search
- [ ] Publish DRAFT job with default dates → verify it appears immediately in public search
- [ ] Publish DRAFT job with future `postedAt` → verify it does NOT appear in public search until that time
- [ ] Close an ACTIVE job → verify it disappears from public search
- [ ] Repost a CLOSED job with new dates → verify it reappears in public search
- [ ] Repost an EXPIRED job → verify it reappears
- [ ] Wait for scheduler to run (or trigger manually) → verify ACTIVE jobs past `expires_at` become EXPIRED
- [ ] Admin manually expires a job → verify it changes to EXPIRED
- [ ] Frontend: DRAFT job shows "Publish" button, ACTIVE shows "Close", CLOSED/EXPIRED shows "Repost"
- [ ] Frontend: Repost modal validates dates correctly
- [ ] Frontend: Status badges display correct colors and labels in both EN and VI
- [ ] Error messages display correctly for invalid transitions
- [ ] Existing `updateJob` (PUT) still works; verify status field is honored only within allowed values

---

## 5 File Change Summary

### Backend — New Files

| File | Type |
|------|------|
| `com.dev001.itviec.dto.request.JobPublishRequest` | DTO |
| `com.dev001.itviec.dto.request.JobRepostRequest` | DTO |
| `com.dev001.itviec.scheduler.JobExpiryScheduler` | Scheduler |

### Backend — Modified Files

| File | Changes |
|------|---------|
| `schema.sql` | Add `published_at`, `closed_at` columns + 2 indexes |
| `Job.java` | Add `publishedAt`, `closedAt` fields; change default status to DRAFT |
| `JobRepository.java` | Add `expireOverdueJobs` bulk update query |
| `ErrorCode.java` | Add 8 new error codes (1200–1207) |
| `JobService.java` | Add `publishJob`, `closeJob`, `repostJob`, `expireOverdueJobs`, `expireJobByAdmin` |
| `JobServiceImpl.java` | Implement new methods; modify `createJob`, `deleteJobByCurrentEmployer`, `deleteJobByAdmin` |
| `JobController.java` | Add 4 new endpoints (3 employer + 1 admin) |
| `JobDetailResponse.java` | Add `publishedAt`, `closedAt`, `effectiveStatus` |
| `JobMapper.java` | Add `@AfterMapping` for `effectiveStatus` |
| `ItviecApplication.java` | Add `@EnableScheduling` |

### Frontend — New Files

| File | Type |
|------|------|
| `src/components/JobStatusBadge/index.tsx` | Component (optional) |

### Frontend — Modified Files

| File | Changes |
|------|---------|
| `src/types/response.types.ts` | Add `publishedAt`, `closedAt`, `effectiveStatus` to `JobDetailResponse` |
| `src/types/request.types.ts` | Add `JobPublishRequest`, `JobRepostRequest` |
| `src/services/jobApi.ts` | Add `publishJobApi`, `closeJobApi`, `repostJobApi`, `expireAdminJobApi` |
| `src/pages/Employer/EmployerJobDetail/index.tsx` | Conditional action buttons, publish/close/repost handlers, repost modal |
| `src/pages/Employer/EmployerJobs/index.tsx` | Status badge on cards, optional quick-publish for DRAFT |
| `public/locales/en/employer.json` | Add publish/close/repost i18n keys |
| `public/locales/vi/employer.json` | Add publish/close/repost i18n keys |
