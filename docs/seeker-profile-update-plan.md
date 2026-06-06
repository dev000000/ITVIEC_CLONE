# Seeker Profile Partial Update — Implementation Plan

## 1. Phân tích hiện trạng

### Backend — Luồng hiện tại

| Layer | File | Mô tả |
|-------|------|-------|
| **Entity** | Seeker.java | JPA entity: `fullName`, `jobTitle`, `phoneNumber`, `dateOfBirth`, `gender`, `city` (ManyToOne), `address`, `personalLink`, `coverLetter`, `cvUrl`, `skills` (ManyToMany), `desiredLocations` (ManyToMany) |
| **DTO Request** | SeekerUpdateRequest.java | **Monolithic DTO** — tất cả fields đều `@NotBlank`/`@NotNull`, không hỗ trợ partial update |
| **DTO Response** | SeekerResponse.java | Trả về đầy đủ thông tin seeker |
| **Controller** | SeekerController.java | `PUT /api/v1/seekers/me` — nhận `SeekerUpdateRequest`, gọi service |
| **Service** | SeekerServiceImpl.java | `updateMyProfile()` — set **tất cả** field, kể cả coverLetter, skills, desiredLocations |
| **Mapper** | SeekerMapper.java | MapStruct, chỉ map entity → response |

### Frontend — Luồng hiện tại

| Layer | File | Mô tả |
|-------|------|-------|
| **Service** | seekerApi.ts | `updateMyProfileApi()` — gọi `PUT /api/v1/seekers/me` với `SeekerUpdateRequest` |
| **Types** | request.types.ts | `SeekerUpdateRequest` — full object, tất cả field bắt buộc |
| **Store** | seekerStore.ts | Zustand store, `setSeekerFullInfo()` để merge partial data |
| **CVManager** | CVManager/index.tsx | Form2 (fullName, phone, desiredLocations) + Form1 (coverLetter) — cả hai đều phải build **full payload** trước khi gọi API |
| **CVProfile** | CVProfile/index.tsx | Form3 (full info modal) — cũng build full payload |

### Vấn đề hiện tại

**Hiện tại chỉ có 1 API `PUT /me` nhận full payload.** Mỗi form đều phải:
1. Đọc toàn bộ seeker data từ store
2. Merge field đang edit vào full payload
3. Gửi full payload (kể cả những field không thay đổi)

→ Dễ ghi đè nhầm data, payload thừa, validation phức tạp.

---

## 2. Thiết kế giải pháp — 3 endpoint PATCH riêng biệt

### Mapping Form → API

| Form | Fields | HTTP | Endpoint | Request DTO |
|------|--------|------|----------|-------------|
| **Form 1** | `coverLetter` | `PATCH` | `/api/v1/seekers/me/cover-letter` | `SeekerCoverLetterUpdateRequest` |
| **Form 2** | `fullName`, `phoneNumber`, `desiredLocations` | `PATCH` | `/api/v1/seekers/me/basic-info` | `SeekerBasicInfoUpdateRequest` |
| **Form 3** | `fullName`, `gender`, `jobTitle`, `personalLink`, `phoneNumber`, `dateOfBirth`, `city`, `address` | `PATCH` | `/api/v1/seekers/me/personal-info` | `SeekerPersonalInfoUpdateRequest` |

> Dùng `PATCH` thay vì `PUT` vì mỗi endpoint chỉ cập nhật một subset fields. API `PUT /me` hiện tại vẫn giữ nguyên để backward compatible.

---

## 3. Proposed Changes

### 3.1 Backend

---

#### [NEW] `SeekerCoverLetterUpdateRequest.java`
**Path:** `it-viec-backend/.../dto/request/SeekerCoverLetterUpdateRequest.java`

```java
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerCoverLetterUpdateRequest {
    @Size(max = 500, message = "COVER_LETTER_TOO_LONG")
    String coverLetter;
}
```

---

#### [NEW] `SeekerBasicInfoUpdateRequest.java`
**Path:** `it-viec-backend/.../dto/request/SeekerBasicInfoUpdateRequest.java`

```java
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerBasicInfoUpdateRequest {
    @NotBlank(message = "FULL_NAME_REQUIRED")
    String fullName;

    @NotBlank(message = "PHONE_NUMBER_REQUIRED")
    String phoneNumber;

    Set<City> desiredLocations;
}
```

---

#### [NEW] `SeekerPersonalInfoUpdateRequest.java`
**Path:** `it-viec-backend/.../dto/request/SeekerPersonalInfoUpdateRequest.java`

```java
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerPersonalInfoUpdateRequest {
    @NotBlank(message = "FULL_NAME_REQUIRED")
    String fullName;

    @NotNull(message = "GENDER_REQUIRED")
    Gender gender;

    @NotBlank(message = "JOB_TITLE_REQUIRED")
    String jobTitle;

    String personalLink;

    @NotBlank(message = "PHONE_NUMBER_REQUIRED")
    String phoneNumber;

    @NotNull(message = "DATE_OF_BIRTH_REQUIRED")
    @Past(message = "DATE_OF_BIRTH_MUST_BE_IN_PAST")
    LocalDate dateOfBirth;

    City city;

    String address;
}
```

---

#### [MODIFY] SeekerService.java

Thêm 3 method mới:

```diff
+ SeekerResponse updateMyCoverLetter(SeekerCoverLetterUpdateRequest request);
+ SeekerResponse updateMyBasicInfo(SeekerBasicInfoUpdateRequest request);
+ SeekerResponse updateMyPersonalInfo(SeekerPersonalInfoUpdateRequest request);
```

---

#### [MODIFY] SeekerServiceImpl.java

Thêm 3 implementation methods:

```java
@Transactional
@Override
public SeekerResponse updateMyCoverLetter(SeekerCoverLetterUpdateRequest request) {
    Seeker seeker = getSeekerByCookie();
    seeker.setCoverLetter(request.getCoverLetter());
    return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
}

@Transactional
@Override
public SeekerResponse updateMyBasicInfo(SeekerBasicInfoUpdateRequest request) {
    Seeker seeker = getSeekerByCookie();
    seeker.setFullName(request.getFullName());
    seeker.setPhoneNumber(request.getPhoneNumber());
    seeker.setDesiredLocations(request.getDesiredLocations());
    return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
}

@Transactional
@Override
public SeekerResponse updateMyPersonalInfo(SeekerPersonalInfoUpdateRequest request) {
    Seeker seeker = getSeekerByCookie();
    seeker.setFullName(request.getFullName());
    seeker.setGender(request.getGender());
    seeker.setJobTitle(request.getJobTitle());
    seeker.setPersonalLink(request.getPersonalLink());
    seeker.setPhoneNumber(request.getPhoneNumber());
    seeker.setDateOfBirth(request.getDateOfBirth());
    seeker.setCity(request.getCity());
    seeker.setAddress(request.getAddress());
    return seekerMapper.toSeekerResponse(seekerRepository.save(seeker));
}
```

---

#### [MODIFY] SeekerController.java

Thêm 3 endpoint mới (giữ nguyên endpoint `PUT /me` hiện tại):

```java
// Form 1: Cập nhật cover letter
@PatchMapping("/me/cover-letter")
@PreAuthorize("hasRole('SEEKER')")
public ApiResponse<SeekerResponse> updateMyCoverLetter(
        @RequestBody @Valid SeekerCoverLetterUpdateRequest request) {
    return ApiResponse.<SeekerResponse>builder()
            .code(1000)
            .result(seekerService.updateMyCoverLetter(request))
            .build();
}

// Form 2: Cập nhật thông tin cơ bản (fullName, phone, desiredLocations)
@PatchMapping("/me/basic-info")
@PreAuthorize("hasRole('SEEKER')")
public ApiResponse<SeekerResponse> updateMyBasicInfo(
        @RequestBody @Valid SeekerBasicInfoUpdateRequest request) {
    return ApiResponse.<SeekerResponse>builder()
            .code(1000)
            .result(seekerService.updateMyBasicInfo(request))
            .build();
}

// Form 3: Cập nhật thông tin cá nhân đầy đủ
@PatchMapping("/me/personal-info")
@PreAuthorize("hasRole('SEEKER')")
public ApiResponse<SeekerResponse> updateMyPersonalInfo(
        @RequestBody @Valid SeekerPersonalInfoUpdateRequest request) {
    return ApiResponse.<SeekerResponse>builder()
            .code(1000)
            .result(seekerService.updateMyPersonalInfo(request))
            .build();
}
```

---

### 3.2 Frontend

---

#### [MODIFY] request.types.ts

Thêm 3 interface mới (giữ nguyên `SeekerUpdateRequest` cũ):

```typescript
/** Form 1: Chỉ cập nhật cover letter */
export interface SeekerCoverLetterUpdateRequest {
  coverLetter: string;
}

/** Form 2: Cập nhật thông tin cơ bản */
export interface SeekerBasicInfoUpdateRequest {
  fullName: string;
  phoneNumber: string;
  desiredLocations: CityResponse[];
}

/** Form 3: Cập nhật thông tin cá nhân đầy đủ */
export interface SeekerPersonalInfoUpdateRequest {
  fullName: string;
  gender: Gender;
  jobTitle: string;
  personalLink?: string;
  phoneNumber: string;
  dateOfBirth: IsoDateString;
  city?: CityResponse | null;
  address?: string;
}
```

---

#### [MODIFY] seekerApi.ts

Thêm 3 hàm API mới:

```typescript
import type {
  SeekerUpdateRequest,
  SeekerCoverLetterUpdateRequest,
  SeekerBasicInfoUpdateRequest,
  SeekerPersonalInfoUpdateRequest,
} from "@/types/request.types";

/** Form 1: Cập nhật cover letter */
export const updateMyCoverLetterApi = (request: SeekerCoverLetterUpdateRequest) => {
  const url = API_PATH + "/me/cover-letter";
  return apiClient.patch<APIResponse<SeekerResponse>>(url, request);
};

/** Form 2: Cập nhật thông tin cơ bản (fullName, phone, desiredLocations) */
export const updateMyBasicInfoApi = (request: SeekerBasicInfoUpdateRequest) => {
  const url = API_PATH + "/me/basic-info";
  return apiClient.patch<APIResponse<SeekerResponse>>(url, request);
};

/** Form 3: Cập nhật thông tin cá nhân đầy đủ */
export const updateMyPersonalInfoApi = (request: SeekerPersonalInfoUpdateRequest) => {
  const url = API_PATH + "/me/personal-info";
  return apiClient.patch<APIResponse<SeekerResponse>>(url, request);
};
```

---

#### [MODIFY] CVManager/index.tsx

- Import `updateMyCoverLetterApi` và `updateMyBasicInfoApi` thay cho `updateMyProfileApi`
- **Form cover letter (`onFinish2`)**: Gọi `updateMyCoverLetterApi({ coverLetter })` — chỉ gửi 1 field
- **Form basic info (`onFinish`)**: Gọi `updateMyBasicInfoApi({ fullName, phoneNumber, desiredLocations })` — không cần build full payload
- **Xoá** hàm `buildSeekerUpdatePayload()` (không cần nữa)

---

#### [MODIFY] CVProfile/index.tsx

- Import `updateMyPersonalInfoApi` thay cho `updateMyProfileApi`
- **Form personal info (`onFinish`)**: Gọi `updateMyPersonalInfoApi({ fullName, gender, jobTitle, personalLink, phoneNumber, dateOfBirth, city, address })` — không gửi skills, desiredLocations, coverLetter

---

## 4. Open Questions

**Q1:** API `PUT /me` hiện tại có muốn deprecated/xoá không, hay giữ song song để backward compatible? → **Đề xuất: Giữ nguyên** để không break nếu có nơi khác dùng.

**Q2:** `SeekerBasicInfoUpdateRequest` ở backend có `Set<City> desiredLocations` — cần validation `@Size(min = 3)` giống DTO cũ không, hay bỏ ràng buộc min = 3?

**Q3:** Ở Form3 (`SeekerPersonalInfoUpdateRequest`), field `city` là reference entity `City` (chỉ cần gửi `{ id }`) — xác nhận backend vẫn dùng pattern này (JPA auto resolve by id)?

---

## 5. Verification Plan

### Automated Tests
- Build backend: `mvn compile` để kiểm tra lỗi compile
- Frontend: `npm run type-check` để kiểm tra TypeScript types
- Frontend: `npm run build` để đảm bảo build thành công

### Manual Verification
- Dùng Postman/curl gọi 3 endpoint PATCH với payload tương ứng → verify response trả đúng SeekerResponse
- Trên UI: test 3 form riêng biệt → kiểm tra data update đúng, các field không liên quan không bị mất
