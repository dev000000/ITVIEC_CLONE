---
name: backend-api-new
description: "Tạo API mới theo chuẩn project itviec: controller, service interface, service impl, repository, request DTO, response DTO, mapper, ErrorCode. Use when: tạo api mới, viết controller, thêm endpoint, thêm service, implement feature backend, add new api, new endpoint, tạo endpoint."
argument-hint: "Mô tả ngắn API cần tạo, ví dụ: 'API đăng ký employer' hoặc 'API lấy danh sách skills'"
---

# Backend API — Tạo API mới theo chuẩn itviec

## Khi nào dùng skill này

- Tạo controller endpoint mới (PUBLIC hoặc PRIVATE)
- Thêm nghiệp vụ mới vào service
- Thêm query method mới vào repository
- Tạo request/response DTO mới
- Thêm ErrorCode mới

---

## Quy trình (thực hiện lần lượt)

### Bước 1 — Phân tích yêu cầu

Xác định rõ:

- **Ai gọi API?** `SEEKER` / `EMPLOYER` / `ADMIN` / Không cần auth (PUBLIC)
- **HTTP method?** `GET` / `POST` / `PUT` / `PATCH` / `DELETE`
- **URL pattern** theo chuẩn dự án (xem mục URL Convention)
- **Request body** cần những field nào, validation rule nào
- **Response trả về** là DTO gì, có phân trang không

### Bước 2 — Tạo Request DTO (nếu cần)

File: `dto/request/<Entity>Request.java` hoặc `<Entity>UpdateRequest.java`

```java
package com.dev001.itviec.dto.request;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class <Entity>Request {

    @NotBlank(message = "FIELD_REQUIRED")   // message phải khớp với key trong ErrorCode enum
    @Size(min = 2, max = 100, message = "FIELD_SIZE")
    String fieldName;

    // Các field khác...
}
```

**Quy tắc validation message:**

- Dùng chữ HOA_UNDERSCORE làm message key (vd: `FULL_NAME_REQUIRED`)
- Key phải trùng với tên enum trong `ErrorCode`

### Bước 3 — Thêm ErrorCode (nếu cần lỗi mới)

File: `exception/ErrorCode.java`

```java
// Thêm vào cuối enum, tiếp nối số hiện tại
NEW_ERROR_CODE(1064, "Error message in English", HttpStatus.BAD_REQUEST),
```

**Quy tắc:**

- Tên enum: `SCREAMING_SNAKE_CASE`
- Code: số nguyên tăng dần, tiếp nối code cao nhất hiện có
- Message: tiếng Anh, rõ ràng
- HttpStatus: `BAD_REQUEST` / `NOT_FOUND` / `FORBIDDEN` / `UNAUTHORIZED` / `INTERNAL_SERVER_ERROR`

### Bước 4 — Tạo Response DTO (nếu cần)

File: `dto/response/<Entity>Response.java`

```java
package com.dev001.itviec.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)  // bỏ qua field null trong JSON response
public class <Entity>Response {
    String id;
    // Các field cần trả về...
}
```

**Quy tắc:**

- Không trả raw Entity — luôn dùng DTO
- `@JsonInclude(NON_NULL)` để tránh trả field null
- Tên class: `<Entity>Response` (list) hoặc `<Entity>DetailResponse` (chi tiết)

### Bước 5 — Thêm method vào Repository (nếu cần)

File: `repository/<Entity>Repository.java`

```java
// Query đơn giản — dùng Spring Data method naming
Optional<Entity> findByIdAndSeeker(String id, Seeker seeker);
boolean existsBySeekerAndJob(Seeker seeker, Job job);
List<Entity> findBySeeker(Seeker seeker);

// Query phức tạp — dùng @Query JPQL
@Query("SELECT e FROM Entity e JOIN e.relation r WHERE r.field = :param")
List<Entity> findByCustomCondition(@Param("param") Type param);
```

**Quy tắc:**

- Dùng method naming nếu query đơn giản
- Dùng `@Query` với JPQL (không SQL thuần) cho query phức tạp
- Tham số `@Param` đặt tên trùng với `:param` trong query

### Bước 6 — Thêm method vào Service Interface

File: `service/<Entity>Service.java`

```java
// Chỉ khai báo method signature, không có implementation
ReturnType methodName(ParamType param);
```

### Bước 7 — Implement trong ServiceImpl

File: `service/impl/<Entity>ServiceImpl.java`

```java
@Slf4j
@Service
@RequiredArgsConstructor
public class <Entity>ServiceImpl implements <Entity>Service {

    private final <Entity>Repository entityRepository;
    // Inject thêm repository/service khác nếu cần

    @Override
    @Transactional  // chỉ thêm khi có write operation (save/update/delete)
    public ReturnType methodName(ParamType param) {

        // 1. Validate / kiểm tra điều kiện tiên quyết
        Entity entity = entityRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ENTITY_NOT_FOUND));

        // 2. Xử lý business logic
        // ...

        // 3. Lưu nếu cần
        Entity saved = entityRepository.save(entity);

        // 4. Map sang DTO và trả về
        return entityMapper.toResponse(saved);
    }
}
```

**Quy tắc:**

- Bước xử lý trong method đánh số thứ tự: `// 1. ...`, `// 2. ...`
- Throw `AppException(ErrorCode.XXX)` cho mọi lỗi domain
- `@Transactional` chỉ khi method có write operation
- Service trả về DTO, không trả raw Entity

### Bước 8 — Thêm method vào Mapper

File: `mapper/<Entity>Mapper.java`

```java
@Mapper(
    componentModel = "spring",
    uses = {RelatedMapper.class}  // thêm mapper phụ thuộc nếu cần
)
public interface <Entity>Mapper {
    <Entity>Response to<Entity>Response(<Entity> entity);
    List<<Entity>Response> to<Entity>Response(List<<Entity>> entities);
}
```

**Quy tắc:**

- Dùng MapStruct — không map thủ công trong service
- `componentModel = "spring"` — bắt buộc
- Thêm `uses = {}` nếu entity có nested object cần mapper riêng

### Bước 9 — Viết Controller Endpoint

File: `controller/<Entity>Controller.java`

```java
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class <Entity>Controller {

    private final <Entity>Service entityService;

    // <N>.API <mô tả ngắn gọn hành động và ai thực hiện> (<PUBLIC|PRIVATE>)
    @PostMapping("/<resource>")
    @PreAuthorize("hasRole('<ROLE>')")      // bỏ dòng này nếu PUBLIC
    public ApiResponse<<ResponseDTO>> methodName(
            @RequestBody @Valid <RequestDTO> request) {
        <ResponseDTO> result = entityService.methodName(request);
        return ApiResponse.<<ResponseDTO>>builder()
                .code(1000)
                .result(result)
                .build();
    }
}
```

### Bước 10 — Cập nhật JwtAuthenticationFilter (chỉ khi thêm PUBLIC endpoint mới)

File: `configuration/JwtAuthenticationFilter.java`

Thêm boolean variable mới trong method `isPublicRequest()`:

```java
boolean isPublicNewEndpoint = method.equals("GET")
        && uri.startsWith("/api/v1/new-resource");

return ...
        || isPublicNewEndpoint;
```

---

## URL Convention

| Tài nguyên              | Pattern                                                         | Ví dụ                                   |
| ----------------------- | --------------------------------------------------------------- | --------------------------------------- |
| List (public)           | `GET /api/v1/<resources>`                                       | `GET /api/v1/jobs`                      |
| Detail by slug (public) | `GET /api/v1/<resources>/slug/{slug}`                           | `GET /api/v1/jobs/slug/senior-java-dev` |
| Tài nguyên của "tôi"    | `GET /api/v1/<owner>/me/<resources>`                            | `GET /api/v1/seekers/me/applications`   |
| Sub-resource của me     | `GET /api/v1/<owner>/me/<resources>/{id}`                       | `GET /api/v1/companies/me/jobs/5`       |
| Nested resource         | `POST /api/v1/<parent>/{id}/<child>`                            | `POST /api/v1/jobs/3/applications`      |
| Admin toàn bộ           | `GET /api/v1/<resources>` + `@PreAuthorize("hasRole('ADMIN')")` |                                         |

---

## Comment Convention cho Controller

```java
// <số thứ tự>.API <mô tả hành động bằng tiếng Việt, rõ ai làm gì> (<PUBLIC|PRIVATE>)
// ( *ghi chú thêm nếu có rule đặc biệt* )
```

- Đánh số từ 1 tăng dần trong mỗi controller
- PUBLIC = không cần JWT, PRIVATE = cần JWT + role
- Mô tả bằng tiếng Việt, ngắn gọn, chủ thể rõ ràng

**Ví dụ đúng:**

```java
// 1.API cho phép nộp đơn ứng tuyển (seeker nộp) theo job cụ thể (PRIVATE)
// 2.API trả về toàn bộ job đang active có phân trang (PUBLIC)
// 3.API cho phép admin xem toàn bộ seeker (PRIVATE)
```

---

## Comment Convention cho ServiceImpl

Các bước xử lý trong method đánh số thứ tự:

```java
// 1. Kiểm tra <entity> có tồn tại không
// 2. Kiểm tra điều kiện nghiệp vụ
// 3. Xử lý
// 4. Lưu vào DB
// 5. Map sang DTO và trả về
```

---

## Naming Convention

| Layer                      | Pattern                                              | Ví dụ                     |
| -------------------------- | ---------------------------------------------------- | ------------------------- |
| Controller                 | `<Entity>Controller`                                 | `ApplicationController`   |
| Service Interface          | `<Entity>Service`                                    | `ApplicationService`      |
| Service Impl               | `<Entity>ServiceImpl`                                | `ApplicationServiceImpl`  |
| Repository                 | `<Entity>Repository`                                 | `ApplicationRepository`   |
| Request DTO                | `<Entity>Request` / `<Entity>UpdateRequest`          | `ApplicationRequest`      |
| Response DTO               | `<Entity>Response` / `<Entity>DetailResponse`        | `ApplicationResponse`     |
| Mapper                     | `<Entity>Mapper`                                     | `ApplicationMapper`       |
| Mapper method              | `to<Entity>Response`                                 | `toApplicationResponse`   |
| Service method (GET)       | `get<Entity>` / `getAll<Entities>` / `getMy<Entity>` | `getMyApplications`       |
| Service method (POST)      | động từ + danh từ                                    | `applyToJob`, `createJob` |
| Service method (PUT/PATCH) | `update<Entity>`                                     | `updateApplicationStatus` |
| Service method (DELETE)    | `delete<Entity>`                                     | `deleteJob`               |

---

## ApiResponse và PageResponse

**Luôn dùng ApiResponse wrapper cho mọi endpoint:**

```java
return ApiResponse.<ResponseType>builder()
        .code(1000)       // 1000 = success
        .result(data)
        .build();
```

**Dùng PageResponse khi có phân trang:**

```java
// Service trả về PageResponse<T>
// PageResponse có: data, page, size, totalElements, totalPages, isFirst, isLast
return ApiResponse.<PageResponse<JobCardResponse>>builder()
        .code(1000)
        .result(jobService.getJobCards(page, size))
        .build();
```

**Nhận tham số phân trang trong controller:**

```java
@RequestParam(defaultValue = "0") int page,
@RequestParam(defaultValue = "10") int size
```

---

## Lombok Annotations chuẩn

```java
// Controller / ServiceImpl / Repository không dùng @Autowired
@RequiredArgsConstructor  // thay thế constructor injection
@Slf4j                    // inject log object (dùng log.info/log.error)

// Entity
@Data @Builder @NoArgsConstructor @AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

// DTO
@Data @Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)  // chỉ cho Response DTO
```

---

## Checklist trước khi hoàn thành

- [ ] Request DTO có đầy đủ validation annotation
- [ ] Validation message keys khớp với ErrorCode enum
- [ ] ErrorCode mới có code số tiếp nối, message tiếng Anh, HttpStatus đúng
- [ ] Response DTO có `@JsonInclude(NON_NULL)`
- [ ] Repository method đặt tên đúng Spring Data convention hoặc dùng `@Query` JPQL
- [ ] ServiceImpl: mọi exception đều throw `AppException(ErrorCode.XXX)`
- [ ] ServiceImpl: `@Transactional` chỉ trên method có write operation
- [ ] Mapper dùng MapStruct, không map thủ công
- [ ] Controller comment đúng format: số thứ tự + mô tả tiếng Việt + (PUBLIC/PRIVATE)
- [ ] PUBLIC endpoint: đã thêm vào `JwtAuthenticationFilter`
- [ ] PRIVATE endpoint: có `@PreAuthorize("hasRole('...')")`
- [ ] `ApiResponse.code` luôn là `1000` cho success
