# Backend Review - it-viec-backend

Ngay review: 2026-06-06

## Pham vi da xem

- `controller`
- `service` va `service/impl`
- `repository`
- `entity`
- `configuration`
- `dto`
- `src/test`

## Nhan xet tong quan

Codebase backend dang di dung huong ve mat tach lop `controller -> service -> repository`, co su dung validation, Spring Security, MapStruct va mot so unit test co ban. Tuy nhien hien tai van con mot nhom van de quan trong lien quan den phan quyen, auth/token lifecycle, test stability va do chat cheo giua API contract voi JPA entity.

Uu tien xu ly truoc nen tap trung vao cac loi co the gay lo du lieu hoac cho phep thao tac sai pham vi truy cap.

## Findings uu tien cao

### 1. User co status `DISABLED` van dang nhap duoc

- Vi tri:
  - [`User.java`](../it-viec-backend/src/main/java/com/dev001/itviec/entity/user/User.java#L82)
  - [`UserServiceImpl.java`](../it-viec-backend/src/main/java/com/dev001/itviec/service/impl/UserServiceImpl.java#L46)
- Hien trang:
  - `User` implement `UserDetails` nhung `isEnabled()` luon tra ve `true`.
  - Admin van co API doi `status` cua user.
- Tac dong:
  - Trang thai `DISABLED` khong co gia tri thuc te trong auth flow.
  - Co nguy co team frontend/ops nghi rang tai khoan da bi khoa trong khi backend van cho login.
- De xuat:
  - Map `UserStatus.ACTIVE` vao `isEnabled()`.
  - Neu can, bo sung them logic cho `PENDING_ACTIVATION` va `DISABLED` trong auth response/error message.
  - Them test cho login voi user bi disable.

### 2. Employer co the cap nhat application khong thuoc cong ty cua minh

- Vi tri:
  - [`ApplicationServiceImpl.java`](../it-viec-backend/src/main/java/com/dev001/itviec/service/impl/ApplicationServiceImpl.java#L211)
- Hien trang:
  - Service chi kiem tra employer "co company".
  - Sau do lay `Application` bang `findById(id)` ma khong rang buoc application do phai thuoc company hien tai.
- Tac dong:
  - Employer A co the update status va employer message cua application thuoc Employer B neu biet `applicationId`.
- De xuat:
  - Doi sang truy van theo `id + company`, tuong tu logic da dung trong `getApplicationById`.
  - Bo sung integration test/xac thuc quyen truy cap cho case employer cap nhat application ngoai pham vi.

### 3. Employer co the tai/preview CV cua bat ky seeker nao neu biet `seekerId`

- Vi tri:
  - [`SeekerController.java`](../it-viec-backend/src/main/java/com/dev001/itviec/controller/SeekerController.java#L187)
  - [`SeekerServiceImpl.java`](../it-viec-backend/src/main/java/com/dev001/itviec/service/impl/SeekerServiceImpl.java#L227)
- Hien trang:
  - Endpoint CV theo `seekerId` mo cho `EMPLOYER` va `ADMIN`.
  - Service chi lay CV theo `seekerId`, khong kiem tra seeker do co tung ung tuyen vao job cua company hien tai hay khong.
- Tac dong:
  - Ro ri du lieu nhay cam cua ung vien.
  - Voi employer, day la loi phan quyen nghiem trong.
- De xuat:
  - Gioi han employer chi duoc doc CV neu seeker da co application vao job thuoc company hien tai.
  - Admin co the giu quyen xem toan bo neu dung voi nghiep vu.
  - Them test cho 2 case:
    - employer duoc xem CV cua applicant thuoc cong ty minh
    - employer khong duoc xem CV cua seeker khong lien quan

## Findings uu tien trung binh

### 4. Endpoint public lay job theo slug dang co the tra ve job `DRAFT` hoac `CLOSED`

- Vi tri:
  - [`SecurityConfig.java`](../it-viec-backend/src/main/java/com/dev001/itviec/configuration/SecurityConfig.java#L30)
  - [`JobServiceImpl.java`](../it-viec-backend/src/main/java/com/dev001/itviec/service/impl/JobServiceImpl.java#L63)
- Hien trang:
  - `/api/v1/jobs/slug/{slug}` la public endpoint.
  - Service dung `findBySlug(...)` thay vi rang buoc them `status = ACTIVE`.
- Tac dong:
  - Job nhap nha hoac da dong co the bi expose ra ngoai.
- De xuat:
  - Neu day la endpoint public cho FE, nen chi tra ve `ACTIVE`.
  - Neu can xem ca `DRAFT/CLOSED`, tach endpoint rieng cho admin/employer.

### 5. Refresh token flow chua phan biet ro access token va refresh token

- Vi tri:
  - [`JwtService.java`](../it-viec-backend/src/main/java/com/dev001/itviec/configuration/JwtService.java#L46)
  - [`AuthenticationServiceImpl.java`](../it-viec-backend/src/main/java/com/dev001/itviec/service/impl/AuthenticationServiceImpl.java#L177)
- Hien trang:
  - JWT khong co claim de phan biet token type.
  - Refresh flow chi kiem tra token hop le va ton tai trong DB, chua ep `accessToken = false`.
- Tac dong:
  - Logic token lifecycle kho mo rong, kho debug, va de phat sinh bug khi thay doi auth flow sau nay.
- De xuat:
  - Bo sung claim `tokenType` hoac `typ`.
  - Refresh endpoint phai kiem tra day la refresh token dung nghia o ca JWT claims va database.
  - Them test cho refresh endpoint chi nhan refresh token, khong nhan access token.

### 6. Cookie access token dang dung `refreshExpiration`

- Vi tri:
  - [`CookieFactory.java`](../it-viec-backend/src/main/java/com/dev001/itviec/configuration/CookieFactory.java#L20)
- Hien trang:
  - `accessCookie()` tinh `maxAge` bang `refreshExpiration`.
- Tac dong:
  - Vong doi cookie access token khong khop voi vong doi access token thuc te.
  - Co the lam client giu cookie lau hon token that, dan toi request fail rat kho chuan doan.
- De xuat:
  - Tach property access expiration cho cookie access token.
  - Dam bao `maxAge` cua access cookie bang hoac nho hon access JWT expiration.

### 7. Endpoint S3 dang mo rong quyen va de overwrite object

- Vi tri:
  - [`S3Controller.java`](../it-viec-backend/src/main/java/com/dev001/itviec/controller/S3Controller.java#L23)
  - [`S3Service.java`](../it-viec-backend/src/main/java/com/dev001/itviec/service/impl/S3Service.java#L25)
- Hien trang:
  - Controller khong co `@PreAuthorize`.
  - Upload dung `originalFilename` lam S3 key.
- Tac dong:
  - Bat ky request da qua auth chung deu co the upload/download object.
  - Nguy co ghi de file do trung ten.
- De xuat:
  - Xac dinh ro endpoint nay co con duoc dung hay khong.
  - Neu can dung, them authorize ro rang.
  - Sinh key theo UUID/prefix nghiep vu thay vi ten file goc.

## Nhom can cai thien them

### 8. API request DTO dang bi coupling truc tiep voi JPA entity

- Vi tri tieu bieu:
  - [`CompanyUpdateRequest.java`](../it-viec-backend/src/main/java/com/dev001/itviec/dto/request/CompanyUpdateRequest.java#L46)
  - [`JobCreateRequest.java`](../it-viec-backend/src/main/java/com/dev001/itviec/dto/request/JobCreateRequest.java#L44)
  - [`JobUpdateRequest.java`](../it-viec-backend/src/main/java/com/dev001/itviec/dto/request/JobUpdateRequest.java#L44)
  - [`ApplicationRequest.java`](../it-viec-backend/src/main/java/com/dev001/itviec/dto/request/ApplicationRequest.java#L29)
  - [`SeekerUpdateRequest.java`](../it-viec-backend/src/main/java/com/dev001/itviec/dto/request/SeekerUpdateRequest.java#L39)
- Hien trang:
  - Request body nhan truc tiep `Country`, `City`, `Skill`, `Set<City>`, `Set<Skill>`.
- Tac dong:
  - Contract API bi phu thuoc vao shape cua JPA entity.
  - Kho validate du lieu vao va kho kiem soat viec client gui object "du thua" field.
  - Bat tien khi can doi entity ma van muon giu contract API on dinh.
- De xuat:
  - Chuyen sang cac field ID ro nghia nhu `countryId`, `cityId`, `skillIds`, `desiredLocationIds`.
  - Resolve entity trong service/repository.

### 9. Kiem tra trung `fullName` khi dang ky seeker la rang buoc nghiep vu de gay false reject

- Vi tri:
  - [`AuthenticationServiceImpl.java`](../it-viec-backend/src/main/java/com/dev001/itviec/service/impl/AuthenticationServiceImpl.java#L147)
- Hien trang:
  - Register reject neu ton tai seeker co `fullName` giong nhau.
- Tac dong:
  - Hai nguoi cung ten that se khong the dang ky.
- De xuat:
  - Bo rang buoc nay neu khong co yeu cau nghiep vu rat dac biet.
  - Neu muon tranh duplicate profile, nen dua vao email hoac field dinh danh khac.

### 10. Validation va message mapping chua dong deu

- Vi tri tieu bieu:
  - [`AuthenticationRequest.java`](../it-viec-backend/src/main/java/com/dev001/itviec/dto/request/AuthenticationRequest.java#L9)
  - [`SeekerUpdateRequest.java`](../it-viec-backend/src/main/java/com/dev001/itviec/dto/request/SeekerUpdateRequest.java#L26)
- Hien trang:
  - Login request chua co `@NotBlank`, `@Email`.
  - `jobTitle` trong `SeekerUpdateRequest` dang dung message key `EMAIL_REQUIRED`.
- Tac dong:
  - Error response de gay hieu nham cho frontend.
  - Validation layer chua chuan hoa.
- De xuat:
  - Bo sung validation day du cho login request.
  - Sua lai message key sai nghia.
  - Ra soat toan bo DTO de thong nhat `message -> ErrorCode`.

### 11. CORS config dang hard-code cho localhost

- Vi tri:
  - [`SecurityConfig.java`](../it-viec-backend/src/main/java/com/dev001/itviec/configuration/SecurityConfig.java#L84)
- Hien trang:
  - Chi allow `http://localhost:5173`.
- Tac dong:
  - Khong linh hoat cho moi truong staging/dev khac.
  - De gay loi sau deploy.
- De xuat:
  - Dua allowed origins vao config theo profile/env.
  - Neu co nhieu frontend origins, quan ly bang list.

### 12. Nguy co va cham `slug` company neu trung ten

- Vi tri:
  - [`Company.java`](../it-viec-backend/src/main/java/com/dev001/itviec/entity/company/Company.java#L44)
  - [`CompanyServiceImpl.java`](../it-viec-backend/src/main/java/com/dev001/itviec/service/impl/CompanyServiceImpl.java#L130)
- Hien trang:
  - `slug` cua company la unique.
  - Logic update sinh slug tu `companyName` nhung khong thay co xu ly conflict.
- Tac dong:
  - Hai company cung ten hoac doi ten trung nhau co the gay loi luu DB.
- De xuat:
  - Bo sung co che unique slug an toan, vi du them hau to `-2`, `-3` hoac `-<short-id>`.

## Test va quality gate

### Hien trang test

Test hien co moi phu mot phan nho:

- annotation test cho admin controller
- mot vai unit test happy-path cho `JobServiceImpl`
- mot vai unit test happy-path cho `CompanyServiceImpl`
- `contextLoads`

Chua thay test bao phu cac case sau:

- phan quyen employer theo company
- disabled user login
- refresh token/access token mismatch
- seeker CV authorization
- upload/logo/avatar/CV validation edge cases

### Ket qua verify da chay

Da chay:

- `./mvnw test`

Ket qua:

- Fail o `contextLoads`.
- Nguyen nhan dau tien: test khong kich hoat profile test, trong khi app mac dinh su dung datasource MySQL.

Da thu them:

- `./mvnw "-Dspring.profiles.active=test" -Dtest=IdentifyApplicationTests test`

Ket qua:

- Van fail.
- Bean boot context dang phu thuoc vao nhieu placeholder moi truong trong [`ItviecApplication.java`](../it-viec-backend/src/main/java/com/dev001/itviec/ItviecApplication.java#L14), dac biet `server.port`.

### De xuat test/CI

- Gan `@ActiveProfiles("test")` cho integration test context.
- Tach log demo/env inspection khoi `ItviecApplication` hoac cap default value an toan cho placeholder.
- Them test cho cac luong security/authorization truoc khi mo rong them feature.
- Can nhac them MockMvc integration test cho controller quan trong.

## Thu tu xu ly de nghi

### P0 - nen xu ly ngay

1. Chan employer update application ngoai company.
2. Chan employer doc CV cua seeker khong lien quan.
3. Lam `DISABLED` user khong dang nhap duoc.
4. Khoa public job-by-slug chi tra ve `ACTIVE`.

### P1 - nen xu ly som tiep theo

1. Chuan hoa refresh token flow.
2. Sua access cookie expiration.
3. Co dinh test profile va `contextLoads`.
4. Khoa hoac bo endpoint S3 neu khong dung.

### P2 - cai thien kien truc va maintainability

1. Tach request DTO khoi JPA entities.
2. Chuan hoa validation/messages.
3. Xu ly unique slug an toan.
4. Chuyen CORS sang config theo env.

## Gia dinh va ghi chu

- Nhan dinh tren duoc dua tren source code backend trong thu muc `it-viec-backend` tai thoi diem review.
- Chua thay yeu cau nghiep vu nao cho phep employer xem CV cua moi seeker trong he thong, nen review nay xem day la loi phan quyen.
- Chua sua code trong review nay; tai lieu nay chi tong hop phan tich va de xuat uu tien.
