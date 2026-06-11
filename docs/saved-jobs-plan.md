# Saved Jobs (Bookmark) Plan

## Summary

- Cho phep seeker luu / bo luu tin tuyen dung va xem lai trong tab "Viec da luu" cua trang `/viec-lam-cua-toi`.
- Mot seeker chi duoc luu toi da **20** tin viec lam; vuot qua thi backend tra ve loi rieng, frontend hien notification roll-back.
- Co the sap xep danh sach "Da luu" theo `expiresAt` tang dan / giam dan.
- Job da `EXPIRED` / `CLOSED` van xuat hien trong danh sach nhung phai disable nut "Ung tuyen" va doi label thanh "Da het han" / "Da dong".
- Nut `FaHeart` o `CardJobHead` va `JobSearchDetail` su dung Optimistic UI cho ca save va unsave, voi 2 luong thong bao:
  - Save thanh cong → `success`, co link "Xem danh sach" → `/viec-lam-cua-toi`.
  - Unsave thanh cong (tu card trong SavedJobs) → `info`, co nut "Hoan tac" chi cho phep hoan tac job vua bo luu cuoi cung.
- Save flow va unsave flow goi 2 endpoint khac nhau, khong dung toggle, de tranh race condition khi user click nhanh va de tinh dung gioi han 20.

## Frontend

### State management

- Tao `useSavedJobsStore` (Zustand, key: `savedJobs`) trong `src/store/savedJobsStore.ts`:
  - `savedJobIds: Set<number>` — cache id job da luu cho seeker hien tai, dung de render trang thai trai tim.
  - `count: number` — so luong da luu, dung cho badge tab "Da luu" trong `MyJobs/index.tsx`.
  - `hydrated: boolean` — danh dau da fetch ids tu BE.
  - `lastUnsavedJob: { id: number; snapshot?: SavedJobItem } | null` — phuc vu nut "Hoan tac"; moi lan unsave moi se ghi de gia tri nay.
  - Actions: `hydrate()`, `addOptimistic(id)`, `removeOptimistic(id, snapshot?)`, `confirm(id)`, `rollback(id)`, `clear()`.
- Logout (`useUserStore`) va doi role se goi `useSavedJobsStore.getState().clear()`.

### API service

- Them `src/services/savedJobApi.ts`:
  - `saveJobApi(jobId: number): Promise<APIResponse<SavedJobResponse>>` → `POST /api/v1/seekers/me/saved-jobs/{jobId}`.
  - `unsaveJobApi(jobId: number): Promise<APIResponse<void>>` → `DELETE /api/v1/seekers/me/saved-jobs/{jobId}`.
  - `getMySavedJobsApi(params?: GetSavedJobsParams): Promise<APIResponse<PageResponse<SavedJobResponse>>>` → `GET /api/v1/seekers/me/saved-jobs?sort=expiresAt,asc&page=&size=`.
  - `getMySavedJobIdsApi(): Promise<APIResponse<number[]>>` → `GET /api/v1/seekers/me/saved-jobs/ids` (dung de hydrate `savedJobIds` mot lan, nhe).
- Cap nhat `src/services/index.ts` re-export.

### Types

- `src/types/response.types.ts`:
  - `SavedJobResponse` — gom `id` (saved row), `savedAt`, va `job: JobCardResponse & { expiresAt: string; status: JobStatus }` (BE bo sung 2 field nay vao `JobCardResponse` khi tra ve trong saved jobs, hoac dung DTO rieng `SavedJobItemResponse`).
  - Khong sua public field cua `JobCardResponse` hien co; them DTO rieng `SavedJobItemResponse` neu can.
- `src/types/request.types.ts`:
  - `GetSavedJobsParams extends PaginationParams { sort?: "expiresAt,asc" | "expiresAt,desc" }`.
- `src/types/common.types.ts`: bo sung `SAVED_JOBS_LIMIT = 20` constant trong `src/constants/index.ts` (khong sua common types neu khong can).

### `FaHeart` button (save / unsave tu job detail)

Ap dung cho ca `it-viec-frontend/src/components/CardJobDetail/CardJobHead/index.tsx` va `it-viec-frontend/src/pages/Shared/JobSearchDetail/index.tsx`:

- Bao logic vao mot component dung chung `SaveJobButton` (`src/components/SaveJobButton/index.tsx`) nhan `{ jobId, jobSnapshot? }`.
- Render:
  - Chua dang nhap → giu hanh vi cu (link `/login`).
  - Da dang nhap, role `SEEKER`:
    - `isSaved = useSavedJobsStore((s) => s.savedJobIds.has(jobId))`.
    - `isSaved` → svg `fill: red; stroke: red` (cap nhat `CardJobHead.scss`: them modifier `--saved`).
    - `!isSaved` → giu style cu (`fill: none; stroke: red`).
- Click handler:
  - Neu chua luu → `addOptimistic(jobId)`, goi `saveJobApi`:
    - thanh cong → `confirm(jobId)`, `notification.success` bang AntD, message: `t("savedJobs.toast.savedTitle")`, description chua link `t("savedJobs.toast.viewList")` tro toi `/viec-lam-cua-toi`.
    - that bai →
      - Neu BE tra `ErrorCode.SAVED_JOBS_LIMIT_EXCEEDED` (1095) → `rollback(jobId)`, `notification.warning` voi message `t("savedJobs.toast.limitTitle")`, description `t("savedJobs.toast.limitDesc", { max: 20 })`.
      - Cac loi khac → `rollback(jobId)`, `notification.error` `t("savedJobs.toast.saveFailTitle")` + button `t("savedJobs.toast.retry")` chi goi lai handler.
  - Neu da luu, click tu Job detail (khong phai card SavedJobs) → khong cho phep o phase 1, hoac chuyen sang flow unsave tuong tu nhung khong push vao `lastUnsavedJob` (chi card SavedJobs moi co Hoan tac). De don gian, phase 1 click trong job detail khi da luu se goi `unsaveJobApi` voi notification.info `t("savedJobs.toast.unsaved")` khong kem Hoan tac.
- `useEffect` mount: neu seeker logged in va `!hydrated`, goi `useSavedJobsStore.hydrate()`.

### `SavedJobs` page (`src/pages/JobSeeker/MyJobs/SavedJobs/index.tsx`)

- Refactor sang fetch chinh chu khong dung outlet context cua `MyJobs` (vi `MyJobs` dang ban voi applications). Day du local state:
  - `savedList: SavedJobItemResponse[]`, `totalSaved: number`, `pagination: { current, pageSize }` (mac dinh `pageSize = 5`), `sort: "asc" | "desc"` (theo `expiresAt`), `isLoading`.
- Fetch trong `useEffect` deps `[pagination.current, pagination.pageSize, sort]` qua `getMySavedJobsApi({ page, size, sort: sort === "asc" ? "expiresAt,asc" : "expiresAt,desc" })`.
- UI tham khao `AppliedJobs/index.tsx`:
  - Notification banner phia tren: `t("savedJobs.notification", { count: totalSaved, max: 20 })` ("Ban co the luu toi da 20 cong viec.").
  - Select sap xep: 2 option `t("savedJobs.sortExpireAsc")` ("Sap het han gan nhat"), `t("savedJobs.sortExpireDesc")` ("Sap het han xa nhat").
  - Render danh sach `CardSavedJob` trong `Row/Col`.
  - `Pagination` AntD giong `AppliedJobs`.
- Empty state giu nguyen `EmptyJobState` khi `totalSaved === 0`.
- Cap nhat `MyJobs/index.tsx` badge "Da luu" doc tu `useSavedJobsStore((s) => s.count)`.

### `CardSavedJob` (`src/components/CardSavedJob/index.tsx` + `.scss`)

Tham khao layout o anh 2 va pattern SCSS cua `CardApplication`:

- Hien thi: logo cong ty (fallback `IMAGE_NOT_FOUND`), `job.title`, `company.companyName`, `city.cityName`, `jobType` (map qua `getJobTypeOptions`), `salary` (an khi chua login — nhung trang SavedJobs require seeker login nen luon hien), `t("savedJobs.postedRelative", { time: getRelativeTime(postedAt) })`, `t("savedJobs.expiresIn", { days })` voi `days = dayjs(expiresAt).diff(dayjs(), "day")`.
- Nut ben phai:
  - Neu `job.status === "ACTIVE"` va `expiresAt > now` va seeker chua ung tuyen: nut "Ung tuyen" link toi `/viec-lam-it/{slug}/job_applications/new`.
  - Neu seeker da ung tuyen: render disabled label `t("savedJobs.alreadyApplied")` ("Da ung tuyen"). Trang thai ung tuyen lay 1 lan tu `getMyApplicationsApi` o `SavedJobs/index.tsx` va truyen xuong qua props (`appliedJobIds: Set<number>`).
  - Neu `job.status === "EXPIRED"` hoac `expiresAt <= now` → label "Da het han" (`t("savedJobs.expired")`), disabled.
  - Neu `job.status === "CLOSED"` → label "Da dong" (`t("savedJobs.closed")`), disabled.
  - Nut `FaHeart` (luon fill red, vi da luu) → handler unsave.
- Click vao body card (khong phai vao nut) → `navigate(`/viec-lam-it/${slug}`)` qua React Router (de mo trang chi tiet trong cung tab); nut ben trong dung `e.stopPropagation()`.
- Snapshot phuc vu undo: truoc khi remove, copy `SavedJobItemResponse` hien tai.

### Unsave + Undo flow

- Click `FaHeart` o `CardSavedJob`:
  - `useSavedJobsStore.removeOptimistic(jobId, snapshot)` → xoa khoi `savedJobIds`, giam `count`, ghi `lastUnsavedJob = { id, snapshot }`, va xoa item khoi local `savedList` cua trang SavedJobs (component goi callback `onLocalRemove(jobId)`).
  - Goi `unsaveJobApi(jobId)`:
    - thanh cong → `notification.info` voi:
      - message: `t("savedJobs.toast.unsavedTitle")` ("Ban da bo luu viec lam.").
      - btn: button `t("savedJobs.toast.undo")` ("Hoan tac"). Khi click → goi `saveJobApi(snapshot.job.id)`:
        - thanh cong → `useSavedJobsStore.addOptimistic(id)` + `confirm(id)`, insert lai snapshot vao `savedList` (ideally re-fetch trang hien tai de dam bao thu tu va pagination chinh xac), `notification.success` re-saved.
        - that bai → notification.error.
      - Notification key dung `key: "saved-jobs-undo"` de moi lan unsave moi se thay the toast cu (chi giu Hoan tac cua cai cuoi cung). `onClose` reset `lastUnsavedJob`.
    - that bai → rollback (insert lai snapshot vao `savedList`, restore `savedJobIds`), `notification.error`.

### i18n

- `public/locales/{vi,en}/jobseeker.json`, namespace `savedJobs`:
  - `notification`, `emptyMessage`, `findJob` (giu cu, them placeholder `{{count}}`, `{{max}}` cho notification).
  - `sortBy`, `sortExpireAsc`, `sortExpireDesc`.
  - `postedRelative`, `expiresIn`, `alreadyApplied`, `apply`, `expired`, `closed`.
  - `toast.savedTitle`, `toast.viewList`, `toast.limitTitle`, `toast.limitDesc`, `toast.saveFailTitle`, `toast.retry`, `toast.unsavedTitle`, `toast.undo`, `toast.unsaved`.

### Routes / guards

- Khong them route moi (`/viec-lam-cua-toi` dang trong `PrivateRoutes` `SEEKER`).
- `RouteDecider` khong can sua.

## Backend

### Schema (`it-viec-backend/src/main/resources/db/schema.sql`)

Them bang moi:

```sql
CREATE TABLE saved_jobs (
  id VARCHAR(255) PRIMARY KEY,
  seeker_id VARCHAR(255) NOT NULL,
  job_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT uk_saved_jobs_seeker_job UNIQUE (seeker_id, job_id),
  CONSTRAINT fk_saved_jobs_seeker FOREIGN KEY (seeker_id) REFERENCES seekers(id),
  CONSTRAINT fk_saved_jobs_job FOREIGN KEY (job_id) REFERENCES jobs(id)
);
CREATE INDEX idx_saved_jobs_seeker ON saved_jobs(seeker_id);
CREATE INDEX idx_saved_jobs_seeker_created_at ON saved_jobs(seeker_id, created_at);
```

`UNIQUE(seeker_id, job_id)` dam bao mot job khong bi luu trung. Khong rang buoc gioi han 20 o DB; check o service layer trong transaction.

### Entity

- `entity/savedjob/SavedJob.java` (extends `BaseEntity`):
  - `@Id @GeneratedValue(strategy = GenerationType.UUID) String id`.
  - `@ManyToOne(LAZY) @JoinColumn(name = "seeker_id") Seeker seeker`.
  - `@ManyToOne(LAZY) @JoinColumn(name = "job_id") Job job`.
  - `@Table(name = "saved_jobs", uniqueConstraints = @UniqueConstraint(columnNames = {"seeker_id", "job_id"}))`.
- Khong sua `Seeker.java` / `Job.java` (tranh thay doi mapping co the anh huong query khac).

### Repository (`SavedJobRepository`)

Methods can thiet:

- `Optional<SavedJob> findBySeekerAndJob(Seeker seeker, Job job)`.
- `boolean existsBySeekerAndJob(Seeker seeker, Job job)`.
- `long countBySeeker(Seeker seeker)`.
- `void deleteBySeekerAndJob(Seeker seeker, Job job)` (return so row xoa de check ton tai).
- `@Query("SELECT sj.job.id FROM SavedJob sj WHERE sj.seeker = :seeker") List<Long> findJobIdsBySeeker(@Param("seeker") Seeker seeker)`.
- `Page<SavedJob> findBySeeker(Seeker seeker, Pageable pageable)` — sort theo `job.expiresAt` truyen vao tu controller.

### DTO

- `dto/response/SavedJobResponse.java` (`@Data @Builder`): `id`, `savedAt` (`createdAt`), `job: SavedJobItemResponse`.
- `dto/response/SavedJobItemResponse.java`: sao chep field tu `JobCardResponse` va them `expiresAt: LocalDateTime`, `status: JobStatus` de FE biet hien thi "Da het han" / "Da dong".
- Khong sua `JobCardResponse` hien co (giu contract job search).

### Service + Impl

- `service/SavedJobService.java`:
  - `SavedJobResponse saveJob(Long jobId)`.
  - `void unsaveJob(Long jobId)`.
  - `PageResponse<SavedJobResponse> getMySavedJobs(int page, int size, String sort)`.
  - `List<Long> getMySavedJobIds()`.
- `service/impl/SavedJobServiceImpl.java`:
  - `@Transactional saveJob`:
    1. `Seeker seeker = seekerService.getSeekerByCookie()`.
    2. `Job job = jobRepository.findById(jobId).orElseThrow(JOB_NOT_FOUND)`. (Cho phep luu ca job EXPIRED / CLOSED? Theo yeu cau: chi nut luu o card detail nen FE chi cho luu khi xem trang, nhung BE nen kiem tra `status != DRAFT`. Job EXPIRED/CLOSED ma user lan dau click luu se bi tu choi → throw `JOB_NOT_SAVABLE` (moi). Alternative: cho luu tat ca tru DRAFT.)
    3. `if (savedJobRepository.existsBySeekerAndJob(seeker, job)) return mapper.toResponse(existing)` (idempotent — tra ve 1000 voi entity hien co).
    4. `long current = savedJobRepository.countBySeeker(seeker); if (current >= 20) throw SAVED_JOBS_LIMIT_EXCEEDED`.
    5. Save va return DTO.
  - `@Transactional unsaveJob`:
    1. Lay seeker, `SavedJob entity = findBySeekerAndJob(...).orElseThrow(SAVED_JOB_NOT_FOUND)`.
    2. `delete(entity)`. Idempotent: neu khong ton tai, tra ve 1000 (FE da optimistic remove).
  - `getMySavedJobs`:
    1. Parse `sort` ("expiresAt,asc" / "expiresAt,desc") thanh `Sort.by(Direction, "job.expiresAt")`. Whitelist chi cho `expiresAt`.
    2. `Pageable pageable = PageRequest.of(page, size, sort)`.
    3. `Page<SavedJob> result = savedJobRepository.findBySeeker(seeker, pageable)`.
    4. Map sang `PageResponse<SavedJobResponse>`.
  - `getMySavedJobIds`: tra `List<Long>`.
- `mapper/SavedJobMapper.java` (Mapstruct hoac thu cong) — map sang `SavedJobItemResponse`, copy `expiresAt`, `status` tu `Job`.

### Controller (`SavedJobController.java`)

`@RequestMapping("/api/v1/seekers/me/saved-jobs")`, `@PreAuthorize("hasRole('SEEKER')")`:

- `POST /{jobId}` → `ApiResponse<SavedJobResponse>` `.code(1000)`.
- `DELETE /{jobId}` → `ApiResponse<Void>` `.code(1000)`.
- `GET /` voi query `page`, `size`, `sort` (default `sort = "expiresAt,asc"`, `size = 5`) → `ApiResponse<PageResponse<SavedJobResponse>>`.
- `GET /ids` → `ApiResponse<List<Long>>`.

### ErrorCode

Bo sung trong `exception/ErrorCode.java`:

- `SAVED_JOBS_LIMIT_EXCEEDED(1095, "You can save up to {max} jobs", HttpStatus.BAD_REQUEST)`.
- `SAVED_JOB_NOT_FOUND(1096, "Saved job not found", HttpStatus.NOT_FOUND)`.
- `JOB_NOT_SAVABLE(1097, "Job is not savable", HttpStatus.BAD_REQUEST)` (dung khi job DRAFT).

### Security / sort whitelist

- Trong service, kiem tra sort param thuoc tap `{"expiresAt,asc", "expiresAt,desc"}`; sai → mac dinh `expiresAt,asc` (tranh sort injection).
- Khong de FE chon trang khac cua seeker → endpoint cua `/seekers/me/...` da rang buoc seeker hien tai.

## Verification

- Backend:
  - `./mvnw test -pl :it-viec-backend -Dtest=SavedJobServiceImplTest` (tao test cho saveJob, unsaveJob, limit 20, idempotent save, sort whitelist).
  - `./mvnw test` chay toan bo de chac chan khong vo cac test cu.
  - Manual qua Postman / curl voi cookie JWT:
    - POST 20 job khac nhau → OK; POST job thu 21 → 1095.
    - POST job da luu → 1000 idempotent.
    - DELETE job chua luu → 1000 idempotent (hoac 1096 tuy lua chon — chot **idempotent** o phase 1).
    - GET co `sort=expiresAt,asc` va `desc` → kiem tra thu tu.
- Frontend:
  - `npm run type-check` va `npm run lint` trong `it-viec-frontend`.
  - `npm run build` xac nhan khong loi.
  - Manual:
    - Click `FaHeart` trong `CardJobHead` va `JobSearchDetail` → icon doi mau ngay, toast hien link "Xem danh sach".
    - Tat mang truoc khi click → trai tim rollback ve khong fill, toast loi "Luu viec lam that bai".
    - Luu 21 tin → tin thu 21 rollback va hien toast limit.
    - Vao `/viec-lam-cua-toi` (tab Da luu), doi sort → thu tu thay doi dung.
    - Click card → mo trang chi tiet job; click "Ung tuyen" → mo form; doi voi job da ung tuyen, nut chuyen sang "Da ung tuyen" va disabled.
    - Click `FaHeart` tren `CardSavedJob` → card bien mat ngay, toast "Ban da bo luu viec lam." Click "Hoan tac" → card xuat hien lai. Click bo luu lien tiep 3 card → toast cuoi cung chi hoan tac card cuoi.
    - Tao job test voi `expiresAt` qua khu → SavedJobs hien "Da het han", nut Apply disabled.
    - Tao job status `CLOSED` → hien "Da dong".
- Neu khong the chay test trong moi truong nay, ghi ro o final response.
