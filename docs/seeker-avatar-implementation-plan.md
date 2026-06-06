# Seeker Avatar Upload & Get — Implementation Plan

Tài liệu này mô tả kế hoạch triển khai tính năng tải lên (upload) và hiển thị (get) ảnh đại diện (avatar) của ứng viên (Seeker).

---

## 1. Phân tích hiện trạng

### Backend
- Thực thể `Seeker` hiện chưa có thuộc tính lưu đường dẫn ảnh đại diện (`avatarUrl`).
- Chưa có bảng cơ sở dữ liệu và thực thể để lưu trữ dữ liệu nhị phân (binary blob) của ảnh đại diện.
- Đã có tiền lệ xử lý tương tự ở `CompanyLogo` cho thực thể `Company`. Chúng ta có thể bắt chước 100% mô hình này.

### Frontend
- Trang `CVProfile/index.tsx` đang hiển thị ảnh đại diện mặc định bằng việc import ảnh tĩnh `avatar` từ thư mục assets.
- Hai nút "Sửa ảnh" (IoCameraOutline) và "Xóa ảnh" (FaRegTrashAlt) chưa được xử lý sự kiện click.

---

## 2. Thiết kế giải pháp

### A. Database & Schema
1. **Bảng `seekers`**: Thêm cột `avatar_url VARCHAR(500)` để chứa URL dẫn tới endpoint tải ảnh.
2. **Bảng `seeker_avatars`**: Tạo bảng mới lưu dữ liệu nhị phân của ảnh (BLOB).
   ```sql
   CREATE TABLE seeker_avatars (
     id VARCHAR(255) PRIMARY KEY,
     seeker_id VARCHAR(255) NOT NULL UNIQUE,
     file_name VARCHAR(255) NOT NULL,
     content_type VARCHAR(100) NOT NULL,
     size BIGINT NOT NULL,
     avatar_data LONGBLOB NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     CONSTRAINT fk_seeker_avatars_seeker FOREIGN KEY (seeker_id) REFERENCES seekers(id)
   );
   ```

### B. Backend DTO & Exceptions
1. **ErrorCode.java**: Thêm mã lỗi mới:
   - `SEEKER_AVATAR_REQUIRED(1083, "Avatar file is required", HttpStatus.BAD_REQUEST)`
   - `SEEKER_AVATAR_INVALID_TYPE(1084, "Avatar must be a PNG, JPEG, or WEBP image", HttpStatus.BAD_REQUEST)`
   - `SEEKER_AVATAR_TOO_LARGE(1085, "Avatar file must not exceed 2 MB", HttpStatus.BAD_REQUEST)`
   - `SEEKER_AVATAR_NOT_FOUND(1086, "Avatar not found", HttpStatus.NOT_FOUND)`
   - `SEEKER_AVATAR_UPLOAD_FAILED(1087, "Failed to upload avatar", HttpStatus.INTERNAL_SERVER_ERROR)`
2. **SeekerAvatarContent.java**: Class DTO đóng gói dữ liệu ảnh trả về cho Controller.
3. **SeekerResponse.java**: Thêm thuộc tính `String avatarUrl`.

### C. Backend Entities & Repositories
1. **SeekerAvatar.java**: Thực thể JPA đại diện cho bảng `seeker_avatars`, quan hệ `@OneToOne` với `Seeker`.
2. **SeekerAvatarRepository.java**: Interface repository để thao tác CRUD trên `SeekerAvatar`.
3. **Seeker.java**: Thêm thuộc tính `@Column(name = "avatar_url") String avatarUrl;`.

### D. Backend Service & Controller
1. **SeekerService & SeekerServiceImpl**:
   - `SeekerResponse uploadMyAvatar(MultipartFile file)`: Xác thực file (tối đa 2MB, định dạng PNG/JPEG/WEBP), lưu hoặc cập nhật `SeekerAvatar`, sinh ra URL ảnh dạng `/api/v1/seekers/{id}/avatar` và lưu vào `Seeker.avatarUrl`.
   - `SeekerResponse deleteMyAvatar()`: Xóa thực thể `SeekerAvatar` gán `avatarUrl = null` ở `Seeker`.
   - `SeekerAvatarContent getSeekerAvatar(String id)`: Lấy dữ liệu ảnh của seeker theo ID.
2. **SeekerController**:
   - `PUT /api/v1/seekers/me/avatar`: Nhận upload file ảnh, phân quyền `SEEKER`.
   - `DELETE /api/v1/seekers/me/avatar`: Xóa ảnh hiện tại, phân quyền `SEEKER`.
   - `GET /api/v1/seekers/{id}/avatar`: Lấy ảnh nhị phân hiển thị trực tiếp (PUBLIC).

### E. Frontend API & Component Integration
1. **response.types.ts**: Thêm trường `avatarUrl?: string` trong `SeekerResponse`.
2. **slice.types.ts**: Thêm trường `avatarUrl?: string` trong `SeekerState`.
3. **seekerApi.ts**: Thêm 2 hàm API:
   - `uploadMyAvatarApi(file: File)`: Gọi `PUT /api/v1/seekers/me/avatar` với `FormData`.
   - `deleteMyAvatarApi()`: Gọi `DELETE /api/v1/seekers/me/avatar`.
4. **CVProfile/index.tsx**:
   - Sử dụng `seeker.avatarUrl || avatarMặcĐịnh` cho cả hiển thị chính và hiển thị trong modal.
   - Thêm phần tử `<input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />`.
   - Khi bấm "Sửa ảnh" -> kích hoạt click trên `fileInputRef`.
   - Khi chọn file -> gọi `uploadMyAvatarApi`, cập nhật state qua `setSeekerFullInfo` và thông báo thành công.
   - Khi bấm "Xóa ảnh" -> gọi `deleteMyAvatarApi`, cập nhật store và thông báo.

---

## 3. Kế hoạch xác thực (Verification Plan)
- Chạy `mvn compile` và `mvn spotless:apply` để kiểm tra backend.
- Chạy `npm run type-check` để kiểm tra frontend TypeScript.
- Kiểm tra tính năng trực quan trên UI qua việc upload một file ảnh và xóa file ảnh đó.
