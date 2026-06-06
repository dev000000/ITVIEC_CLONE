# Kế hoạch triển khai khu vực Admin

## Tóm tắt

- Thêm một nhánh route top-level riêng là `/admin`, tách biệt hoàn toàn với `/employer` và `/customer`.
- Admin có layout dashboard riêng nhưng giữ ngôn ngữ thiết kế của employer shell: sidebar cố định, main content sáng, responsive giống hiện tại, chỉ đổi accent sang xanh teal/xanh lam để phân biệt với employer.
- V1 sẽ làm đầy đủ 4 menu: `dashboard`, `users`, `job`, `report`, trong đó `users` dùng API admin sẵn có, `job` cần mở thêm API admin backend, `report` là trang số liệu thực dụng chứ chưa làm analytics/export nặng.

## Thay đổi chính

### Routing và auth

- Thêm các route `/admin/login`, `/admin/dashboard`, `/admin/users`, `/admin/job`, `/admin/report`.
- Tạo `AdminPublicRoute` và `AdminPrivateRoute` theo đúng pattern đang dùng cho employer.
- Mở rộng `LayoutCheckToken` để redirect theo role đúng ngữ cảnh:
  - chưa đăng nhập: `ADMIN -> /admin/login`, `EMPLOYER -> /customer/login`, `SEEKER -> /login`
  - đăng nhập sai role: chuyển về khu vực đúng role thay vì đẩy về `/`
- Tách phần redirect sau login thành helper dùng chung để điều hướng theo role:
  - `ADMIN -> /admin/dashboard`
  - `EMPLOYER -> /customer/dashboard`
  - `SEEKER -> /`

### Layout và UI

- Tạo `LayoutAdmin` + SCSS riêng, giữ nguyên bố cục của `LayoutCustomer` thay vì refactor shell chung để tránh patch rộng.
- Reuse `MenuItem`, `LanguageSwitcher`, confirm logout, cấu trúc `Outlet`, và phần page header kiểu `EmployerStart`.
- Menu sidebar cố định: `Dashboard`, `Quản lý user`, `Job`, `Report`.
- Theme admin:
  - giữ nền sidebar navy đậm như employer
  - main content sáng như hiện tại
  - accent active/border/button đổi sang teal hoặc blue-green
  - giữ đúng responsive collapse 200px -> 50px/30px như shell employer

### Các page admin

- `AdminDashboard`:
  - cards KPI: tổng user, user active, user disabled/pending, tổng job, job active, tổng application/pending
  - 1 bảng ngắn "user chờ kích hoạt" và 1 bảng "job mới/cần chú ý"
- `AdminUsers`:
  - `Ant Table` với cột `email`, `role`, `status`, `action`
  - filter theo email, role, status
  - action đổi status bằng API admin hiện có
  - disable action với row `ADMIN` để khớp rule backend hiện tại
- `AdminJobs`:
  - `Ant Table` với `title`, `company`, `city`, `jobType`, `status`, `postedAt`, `expiresAt`, `action`
  - filter theo title, companyName, status, jobType, city
  - action xem chi tiết + đổi status + soft delete
  - v1 không mở full rich-text edit form của job
- `AdminReport`:
  - read-only page
  - cards tổng quan + bảng breakdown:
    - user theo role/status
    - application theo status
    - job theo status/type
  - không thêm chart/export library ở v1

## Public API / interface cần thêm hoặc đổi

### Frontend

- thêm namespace i18n `admin` vào cấu hình `i18n`
- thêm `public/locales/vi/admin.json` và `public/locales/en/admin.json`
- mở rộng `jobApi.ts` với các hàm admin
- thêm request type mới kiểu `AdminJobStatusUpdateRequest`

### Backend

- thêm nhóm API admin cho jobs:
  - `GET /api/v1/admin/jobs` với filter `title`, `companyName`, `status`, `jobType`, `cityId`
  - `GET /api/v1/admin/jobs/{id}`
  - `PATCH /api/v1/admin/jobs/{id}/status` body `{ status: JobStatus }`
  - `DELETE /api/v1/admin/jobs/{id}` soft delete
- response có thể reuse `JobDetailResponse`, không đổi contract public cũ
- giữ nguyên API admin user hiện có: `/api/v1/users`, `/api/v1/users/{id}`
- tận dụng API admin applications hiện có: `/api/v1/applications`

## Test plan

### Frontend

- `npm run type-check`
- `npm run build`

### Backend

- chạy test Maven nhỏ nhất bao phủ admin job controller/service và role authorization

### Manual acceptance

- guest vào `/admin/dashboard` bị đẩy về `/admin/login`
- admin login xong vào đúng `/admin/dashboard`
- employer login vẫn vào `/customer/dashboard`
- seeker flow không bị ảnh hưởng
- sidebar admin active state, responsive, logout, language switch hoạt động giống employer shell
- user table load/filter/update status đúng, row admin không sửa được
- job table load/filter/view/update status/delete đúng
- dashboard/report phản ánh lại số liệu sau khi đổi status user/job

## Giả định mặc định

- `/admin` là path riêng top-level, không lồng vào `/customer`.
- V1 `users` chỉ quản lý danh sách và trạng thái tài khoản, chưa có create/edit/delete profile.
- V1 `jobs` là quản trị vận hành: list/filter/view/status/delete, chưa hỗ trợ full edit nội dung job.
- V1 `report` ưu tiên cards + tables Ant Design, chưa thêm charts/export.
