# Full Project Review - 2026-06-06

## Tong quan

Project hien tai da vuot khoi pham vi "frontend demo" ban dau va dang o giai doan full-stack that su:

- `it-viec-frontend`: React 19 + Vite + TypeScript + Ant Design + Sass + Zustand + i18n
- `it-viec-backend`: Spring Boot 3 + Java 17 + Spring Security + JPA + MySQL + S3
- `database`: `json-server` mock service cho local/demo data
- `docs`: da co nhieu implementation plan va review notes cho admin, seeker, search

Mat bang chung cua repo la kha tot: da co route phan quyen seeker/employer/admin, backend co tich hop auth bang cookie JWT, frontend/backend da bat dau tach theo service layer va DTO layer ro hon. Tuy nhien, repo van co mot so diem nghen o build quality, security hygiene, test reliability va tinh dong bo giua cac lop.

## Cac loi va rui ro da duoc xac minh

### 1. Backend test pipeline dang fail ngay tu dau

Da chay:

- `.\mvnw.cmd test`

Ket qua:

- Build fail truoc khi vao test logic vi `spotless:check` bao `7` file Java chua dung format.
- Nhung file vi pham nam trong `service/impl` va `test` moi them.

Tac dong:

- CI backend se fail ngay ca khi logic dung.
- Team kho phan biet loi format va loi business/test that su.

Muc do uu tien: `High`

### 2. Backend context test bi cau hinh sai profile test

Da chay tiep:

- `.\mvnw.cmd "-Dspotless.check.skip=true" test`

Ket qua:

- Cac test unit/controller moi chay qua.
- `IdentifyApplicationTests` fail khi load Spring context.
- Nguyen nhan da xac minh: `src/test/resources/application-test.yaml` dung H2 va `org.h2.Driver`, nhung `IdentifyApplicationTests` khong kich hoat profile `test`, dan den Spring fallback ve config mac dinh va dung MySQL driver cho H2 URL.

Tac dong:

- Test "context loads" dang khong con dang tin.
- Pipeline co the qua duoc test don vi nhung van fail integration smoke test.

Muc do uu tien: `High`

### 3. Frontend co so luong dependency vulnerability dang ke

Da chay:

- `npm audit --omit=dev` trong `it-viec-frontend`

Ket qua:

- `12` vulnerabilities, gom:
  - `critical`: `swiper`
  - `high`: `axios`, `react-router`, `immutable`, `linkifyjs`, `picomatch`
  - `moderate`: `dompurify`, `follow-redirects`, `markdown-it`

Tac dong:

- Rui ro bao mat tu third-party libs dang khong nho.
- Mot so package lien quan truc tiep den HTTP, routing va render HTML, nen anh huong blast radius kha rong.

Muc do uu tien: `High`

### 4. Mock database service cung co dependency loi thoi va lo hong

Da chay:

- `npm audit --omit=dev` trong `database`

Ket qua:

- `8` vulnerabilities trong chuoi dependency cua `json-server`, bao gom `lodash`, `path-to-regexp`, `qs`, `on-headers`.

Tac dong:

- Moi truong mock local van la mot phan cua DX; dependency qua cu de gay han che khi nang cap Node hoac mo rong mock API.

Muc do uu tien: `High`

### 5. API endpoint mac dinh giua frontend va backend dang lech cong

Da doc:

- `it-viec-frontend/src/configurations/appConfig.ts`
- `it-viec-backend/src/main/resources/application-dev.yaml`

Ket qua:

- Frontend default `VITE_API_ENDPOINT` la `http://localhost:8081`
- Backend dev default `server.port` la `8080`

Tac dong:

- Clone repo va chay local theo default rat de gap tinh trang frontend goi sai backend.
- Onboarding cho nguoi moi se ton thoi gian debug cau hinh khong can thiet.

Muc do uu tien: `Medium`

### 6. Backend default config chua an toan cho moi truong that

Da doc:

- `it-viec-backend/src/main/resources/application.yaml`
- `it-viec-backend/src/main/resources/application-dev.yaml`
- `it-viec-backend/src/main/resources/application-prod.yaml`

Ket qua:

- `spring.jpa.hibernate.ddl-auto: update`
- `show-sql: true`
- CORS hard-code `http://localhost:5173` trong `SecurityConfig`

Tac dong:

- `ddl-auto:update` khong phu hop cho quy trinh release nghiem tuc.
- `show-sql` gay on ao log va co the lo du lieu nhay cam trong runtime.
- CORS hard-code lam deployment sang domain khac kho mo rong.

Muc do uu tien: `Medium`

### 7. Frontend auth dang o giai doan chuyen tiep, chua don sach hoan toan

Da doc:

- `it-viec-frontend/src/services/apiClient.ts`
- `it-viec-frontend/src/helpers/localStorage.ts`
- `it-viec-frontend/src/layout/LayoutCheckToken/index.tsx`

Ket qua:

- Auth runtime chinh dang dua vao `HttpOnly cookie` + refresh token flow.
- Tuy nhien van con helper `localStorage` de luu `token`, `id`, `userType`, `companyId`.
- Trong codebase van con nhieu noi doc truc tiep `localStorage`.

Tac dong:

- De tao ra mental model khong thong nhat: auth bang cookie hay local storage?
- Lam tang rui ro bug session, logout, stale state, va migration do dang.

Muc do uu tien: `Medium`

### 8. Render HTML giua cac man hinh chua duoc chuan hoa cung mot cach

Da doc:

- `CardJobDetail/CardJobContent`
- `pages/Shared/JobSearchDetail`
- `pages/Admin/AdminJobs`
- `pages/Shared/EmployerDetailInfo`

Ket qua:

- Mot so noi co `DOMPurify.sanitize(...)`
- Mot so noi dung `dangerouslySetInnerHTML` can duoc review lai de dam bao tat ca rich text deu qua mot duong sanitize thong nhat

Tac dong:

- Rich text la du lieu den tu backend/editor, nen can mot contract render ro rang.
- Neu sanitize khong dong nhat, sau nay rat de phat sinh XSS hoac regressions hiem.

Muc do uu tien: `Medium`

### 9. Repo hygiene chua sach, de commit nham generated artifacts

Da doc/kiem tra:

- `.gitignore`
- `git ls-files database/node_modules`
- `git status --short`

Ket qua:

- `database/node_modules` dang bi track trong git
- `.gitignore` chua ignore `database/node_modules/`
- `it-viec-frontend/.vite/` dang xuat hien trong worktree va cung chua duoc ignore

Tac dong:

- Repo nang hon can thiet
- De sinh noise trong diff va merge request
- Lam giam chat luong review vi generated files chen vao thay doi that

Muc do uu tien: `Medium`

### 10. Frontend lint pass nhung warning con kha nhieu

Da chay:

- `npm run lint`

Ket qua:

- Khong co error
- Co `109` warnings
- Nhom warning chinh:
  - `react-refresh/only-export-components` o khu vuc TipTap JSX
  - `unused eslint-disable`
  - `react-hooks/exhaustive-deps`
  - mot vai `console.log`

Tac dong:

- Chua gay fail build ngay, nhung warning density cao lam giam gia tri cua lint signal.
- Ve lau dai team se quen tay bo qua ca warning tot lan warning xau.

Muc do uu tien: `Low`

## Diem can cai thien

### Backend

- Tach ro `application.yaml` cho base/shared config va profile-specific config cho `dev`, `test`, `prod`.
- Dua schema management ve migration ro rang hon thay vi phu thuoc `ddl-auto:update`.
- Hoan thien test strategy:
  - unit test cho service/repository query logic
  - controller security test
  - it nhat mot smoke integration test dung profile `test`
- Dong bo style Java truoc khi merge de Spotless that su co gia tri.
- Review lai CORS va cookie policy de phu hop local/dev/prod.

### Frontend

- Chot mot auth model duy nhat: cookie-based session la huong dang dung, phan local storage nen duoc don sach hoac chi giu metadata that can.
- Chuan hoa rich text rendering thong qua helper sanitize chung.
- Giam kich thuoc va complexity cua cac page lon nhu:
  - `AdminJobs`
  - `JobSearch`
  - `CVProfile`
- Rut warning lint ve muc chap nhan duoc de moi warning moi deu dang chu y.
- Lam ro boundary giua data fetching, state store, va UI rendering.

### Repo va quy trinh

- Cap nhat `.gitignore` cho generated/cache/dependency folders.
- Bo tracking khoi `database/node_modules`.
- Viet huong dan startup local ngắn gon va dung port thuc te.
- Them CI steps ro rang:
  - frontend: `type-check`, `lint`, `build`
  - backend: `spotless:check`, `test`

### Security va dependency management

- Lap ke hoach nang cap dependency theo dot, uu tien:
  - `axios`
  - `react-router-dom`
  - `swiper`
  - `dompurify`
- Review lai package o mock service neu `json-server` chi dung tam thoi; can nhac thay bang fixture hoac lightweight mock setup sach hon.

## Diem manh hien tai

- Kien truc backend da co phan lop controller/service/repository/DTO kha ro.
- Frontend da co route guards cho seeker/employer/admin va co huong tach role flow tot hon truoc.
- i18n duoc dua vao he thong kha day du cho `en` va `vi`.
- Search jobs, admin portal, popular tags, seeker avatar/CV flow da bat dau thanh cac vertical feature ro rang.
- Team da co thoi quen viet plan/review docs trong `docs`, day la nen tang tot de nang maturity cua repo.

## Tinh nang co the mo rong tiep

### 1. Job seeker experience

- Saved jobs API + UI that su
- Recently viewed jobs tracking
- Profile completeness score
- CV parsing de goi y skill/job title/desire locations
- Notification khi job phu hop profile

### 2. Employer experience

- Employer registration/onboarding day du thay vi placeholder
- Dashboard metrics cho application funnel
- Bulk actions cho jobs va applications
- Email template/notification khi ung vien nop CV

### 3. Admin capabilities

- Audit log cho thao tac admin
- Search/filter manh hon cho users/jobs/companies
- Soft delete restore flow
- Moderation queue cho company profile/job content

### 4. Search va recommendation

- Popular tags ranking dua tren click/search analytics
- Search suggestion theo history va behavioral signals
- Job recommendation theo skill, city, experience level
- SEO/structured metadata tot hon cho trang job/company

### 5. Platform engineering

- CI/CD co cache va quality gates ro rang
- Environment validation khi boot app
- Observability co ban: request logging, error tracking, health checks, metrics
- Test data seeding strategy ro hon cho dev/demo/test

## Kiem tra da thuc hien

Da duoc xac minh bang command trong workspace:

- Frontend `npm run type-check`: `pass`
- Frontend `npm run lint`: `pass` voi `109 warnings`
- Backend `.\mvnw.cmd test`: `fail` do Spotless format violations
- Backend `.\mvnw.cmd "-Dspotless.check.skip=true" test`: test unit moi them pass, nhung `IdentifyApplicationTests` fail do test datasource/profile mismatch
- Frontend `npm audit --omit=dev`: `12 vulnerabilities`
- Database `npm audit --omit=dev`: `8 vulnerabilities`

## Thu tu uu tien de xu ly

### Dot 1 - unblock build va repo hygiene

- Sua Spotless violations
- Sua `IdentifyApplicationTests` de dung profile `test`
- Ignore va don generated/dependency artifacts trong repo
- Dong bo default API endpoint local

### Dot 2 - hardening

- Ngan warning lint xuong muc kiem soat duoc
- Chuan hoa auth cookie flow va bo di local storage legacy
- Review sanitize rich text
- Chuyen dần schema management sang migration

### Dot 3 - nang cap nen tang

- Nang cap cac dependency co lo hong uu tien cao
- Them CI pipeline ro rang
- Mo rong coverage test theo business flow

### Dot 4 - mo rong san pham

- Saved jobs
- Recently viewed
- Employer onboarding
- Admin audit log
- Recommendation/search analytics

## Ket luan

Day la mot repo co momentum rat ro: tinh nang dang ra nhanh, full-stack da noi duoc voi nhau, va huong di san pham da ro hon nhieu so voi mot project demo thong thuong. Diem can uu tien luc nay khong phai viet them tinh nang ngay lap tuc, ma la lam chac nen mong:

- build phai xanh on dinh
- test phai dang tin
- config phai dong bo
- dependency va repo hygiene phai sach

Neu xu ly tot 4 nhom do, project se de nang cap nhanh hon va review/merge cung bot dau dau hon rat nhieu.
