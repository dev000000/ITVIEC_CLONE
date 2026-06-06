# CV Upload, Metadata & Preview cho Seeker

## Tổng quan

Triển khai đầy đủ 3 tính năng CV cho job seeker:
1. **Upload CV** — file `.pdf`, `.docx`, giới hạn 5MB
2. **Lấy metadata CV** — tên file, lần cập nhật cuối cùng
3. **Preview CV inline** — xem trực tiếp trên trình duyệt (không cần tải về)

## Hiện trạng (Research Summary)

### Backend — ✅ ĐÃ TRIỂN KHAI ĐẦY ĐỦ

Sau khi đọc code, **tất cả các API backend đã được implement hoàn chỉnh**:

| API | Endpoint | Status |
|-----|----------|--------|
| Upload CV | `POST /api/v1/seekers/me/cv` (multipart) | ✅ Done |
| Download CV | `GET /api/v1/seekers/me/cv` | ✅ Done |
| Get Metadata | `GET /api/v1/seekers/me/cv/metadata` | ✅ Done |
| Preview (seeker) | `GET /api/v1/seekers/me/cv/preview` | ✅ Done |
| Preview (employer) | `GET /api/v1/seekers/{id}/cv/preview` | ✅ Done |
| Delete CV | `DELETE /api/v1/seekers/me/cv` | ✅ Done |

- **Entity**: [SeekerCv.java](file:///f:/CODE/Project/project-itviec/it-viec-backend/src/main/java/com/dev001/itviec/entity/seeker/SeekerCv.java) — lưu `fileName`, `contentType`, `size`, `cv_data` (LONGBLOB), kế thừa `BaseEntity` có `createdAt`/`updatedAt`
- **Repository**: [SeekerCvRepository.java](file:///f:/CODE/Project/project-itviec/it-viec-backend/src/main/java/com/dev001/itviec/repository/SeekerCvRepository.java) — `findBySeekerId`, `existsBySeekerId`, `deleteBySeekerId`
- **Service**: [SeekerServiceImpl.java](file:///f:/CODE/Project/project-itviec/it-viec-backend/src/main/java/com/dev001/itviec/service/impl/SeekerServiceImpl.java) — validation (5MB, PDF/DOC/DOCX), upsert logic
- **DTOs**: `SeekerCvContent` (download), `SeekerCvMetadataResponse` (metadata)
- **Error codes**: `SEEKER_CV_REQUIRED`, `SEEKER_CV_INVALID_TYPE`, `SEEKER_CV_TOO_LARGE`, `SEEKER_CV_NOT_FOUND`, `SEEKER_CV_UPLOAD_FAILED`

### Frontend — ⚠️ TRIỂN KHAI MỘT PHẦN

| Component | Status | Chi tiết |
|-----------|--------|----------|
| Types (`seekerCv.types.ts`) | ✅ Done | `SeekerCvMetadataResponse` đã có |
| Service (`seekerCvApi.ts`) | ⚠️ Partial | Có `getMyCvMetadataApi`, `getMyCvPreviewUrl`. **Thiếu**: `uploadMyCvApi`, `deleteMyCvApi` |
| ProfileOverview | ✅ Done | Đã hiển thị metadata + link preview |
| **CVManager** | ❌ Chưa | Upload button chưa gọi API, hiển thị CV file name/date đang hardcode `CV.docx` |
| CVProfile | ❓ Cần xác nhận | Có cần hiển thị gì liên quan CV không? (hiện tại không có) |

## Proposed Changes

### Frontend Service Layer

#### [MODIFY] [seekerCvApi.ts](file:///f:/CODE/Project/project-itviec/it-viec-frontend/src/services/seekerCvApi.ts)

Thêm 2 API functions:

```typescript
// Upload CV (multipart/form-data)
export const uploadMyCvApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post<APIResponse<SeekerResponse>>(
    "/api/v1/seekers/me/cv",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

// Delete CV
export const deleteMyCvApi = async () => {
  const response = await apiClient.delete<APIResponse<SeekerResponse>>(
    "/api/v1/seekers/me/cv"
  );
  return response.data;
};
```

---

### Frontend — CVManager Page

#### [MODIFY] [index.tsx](file:///f:/CODE/Project/project-itviec/it-viec-frontend/src/pages/JobSeeker/CVManager/index.tsx)

Đây là thay đổi chính. Hiện tại:
- `ButtonUpload` chỉ log `"upload"` → **cần kết nối với file input + gọi `uploadMyCvApi`**
- Tên file hiển thị hardcode `CV.docx` → **cần fetch metadata từ API**
- Không có chức năng xóa CV
- Không có preview CV

Thay đổi cụ thể:

1. **Thêm hidden `<input type="file">` ref** để trigger khi bấm ButtonUpload
2. **Thêm state**: `cvMetadata`, `isCvMetadataLoading`, `isUploading`
3. **Fetch CV metadata** on mount (giống ProfileOverview pattern)
4. **Upload handler**: validate file client-side (type + size) → gọi `uploadMyCvApi` → update store + refresh metadata → Swal success
5. **Hiển thị tên file + ngày cập nhật** từ `cvMetadata` (thay thế hardcode)
6. **Click vào tên file → mở preview** (dùng `getMyCvPreviewUrl()` mở tab mới, giống ProfileOverview)
7. **Thêm nút xóa CV** (optional, nếu backend đã có API delete)

```
Flow:
User clicks "Upload CV" → hidden input opens → user picks file
→ client validates (pdf/docx, ≤5MB) → call uploadMyCvApi(file)
→ update seekerStore + refetch metadata → show success toast
```

> [!IMPORTANT]
> **Preview cho file `.docx`**: Browser chỉ hỗ trợ inline preview cho PDF. Với file DOCX, khi ấn vào tên file, ta sẽ:
> - Nếu `contentType` là `application/pdf` → mở trực tiếp trong tab mới (browser hiển thị PDF natively)
> - Nếu `contentType` là `application/vnd.openxmlformats-officedocument.wordprocessingml.document` hoặc `application/msword` → sử dụng **Microsoft Office Online Viewer** (`https://view.officeapps.live.com/op/embed.aspx?src=<encoded-url>`) hoặc **Google Docs Viewer** (`https://docs.google.com/gview?url=<encoded-url>&embedded=true`)
>
> Tuy nhiên, cả 2 viewer trên **yêu cầu URL public** (accessible từ internet). Vì API hiện tại cần auth cookie, phương án thực tế nhất là:
> - **PDF → mở tab mới, browser render natively** ✅
> - **DOCX → tạm thời dùng download** hoặc **convert sang PDF server-side** (cần thêm backend logic)
>
> **Đề xuất**: Giai đoạn 1 chỉ hỗ trợ preview PDF inline. DOCX sẽ fallback sang download. Nếu cần preview DOCX, ta cần thêm một endpoint backend convert DOCX → PDF.

---

### Frontend — ProfileOverview Page

#### [MODIFY] [index.tsx](file:///f:/CODE/Project/project-itviec/it-viec-frontend/src/pages/JobSeeker/ProfileOverview/index.tsx)

**Đã triển khai đầy đủ**, không cần thay đổi. Hiện tại:
- Fetch metadata via `getMyCvMetadataApi()` ✅
- Hiển thị `fileName` + `updatedAt` ✅  
- Click vào tên file → mở preview URL trong tab mới ✅
- Loading state + "No CV uploaded" fallback ✅

---

### Frontend — CVProfile Page

#### Không thay đổi

Trang CVProfile hiện tại hiển thị thông tin cá nhân (tên, email, SĐT, ...) và các section CV profile (giới thiệu, học vấn, ...). **Không liên quan trực tiếp đến file CV upload/preview.**

---

### i18n Translation Keys

#### [MODIFY] [jobseeker.json (en)](file:///f:/CODE/Project/project-itviec/it-viec-frontend/public/locales/en/jobseeker.json) & [jobseeker.json (vi)](file:///f:/CODE/Project/project-itviec/it-viec-frontend/public/locales/vi/jobseeker.json)

Thêm translation keys cho CVManager (nếu chưa có):
- `cvManager.uploadSuccess` — "CV uploaded successfully!"
- `cvManager.uploadError` — "Failed to upload CV"
- `cvManager.deleteCV` — "Delete CV"
- `cvManager.deleteConfirm` — "Are you sure you want to delete your CV?"
- `cvManager.deleteSuccess` — "CV deleted successfully!"
- `cvManager.noCV` — "No CV uploaded yet"
- `cvManager.lastUpdated` — "Last updated"
- `cvManager.fileTooLarge` — "File size must not exceed 5MB"
- `cvManager.invalidFileType` — "Only PDF and DOCX files are supported"
- `cvManager.uploading` — "Uploading..."
- `cvManager.previewNotAvailable` — "Preview is only available for PDF files"

## Open Questions

> [!IMPORTANT]
> 1. **DOCX Preview**: Có muốn hỗ trợ preview DOCX inline không? Nếu có, cần thêm backend endpoint convert DOCX → PDF (dùng Apache POI + iText). Giai đoạn 1 đề xuất: chỉ preview PDF, DOCX fallback download. **Bạn đồng ý?**

> [!NOTE]
> 2. **Trang CVProfile**: Có cần thêm phần hiển thị/upload CV trên trang này không? Hay chỉ cần ở CVManager và ProfileOverview?

> [!NOTE]
> 3. **Nút xóa CV trong CVManager**: Có muốn thêm nút xóa CV không? Backend đã có API `DELETE /api/v1/seekers/me/cv`.

## Verification Plan

### Automated Tests
- `npm run type-check` — đảm bảo không có TypeScript errors
- `npm run build` — đảm bảo build thành công

### Manual Verification
1. Vào CVManager → upload file PDF → kiểm tra hiển thị tên file + ngày cập nhật
2. Upload file DOCX → kiểm tra hiển thị tương tự
3. Upload file quá 5MB → kiểm tra thông báo lỗi
4. Upload file không phải PDF/DOCX (e.g. `.txt`) → kiểm tra thông báo lỗi
5. Click vào tên file PDF → kiểm tra preview inline trên tab mới
6. Vào ProfileOverview → kiểm tra hiển thị metadata + link preview
7. Upload lại CV mới → kiểm tra cả 2 trang cập nhật đúng
