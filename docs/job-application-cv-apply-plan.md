# Job Application CV Flow Plan

## Summary

- Chuyen form ung tuyen seeker sang `multipart/form-data` de gui `request` va `cvFile` dung contract backend.
- Ho tro 2 cach nop CV: dung CV hien tai neu seeker da co, hoac tai CV moi ngay tren form apply.
- Sau khi tao `Application` thanh cong, dong bo lai thong tin co ban cua seeker tu du lieu vua ung tuyen de lan nop sau duoc prefill bang du lieu moi.

## Frontend

- Sua `applyToJobApi` de tao `FormData`, append `request` bang `application/json` blob, va append `cvFile` khi user chon CV moi.
- Viet lai trang `JobApplications` voi 3 nhom state ro rang:
  - du lieu job va cities
  - profile seeker + CV metadata
  - che do CV (`current` / `upload`) + file duoc chon
- Form prefill tu `getMyProfileApi`, lay metadata qua `getMyCvMetadataApi`, va dung `findCityRefs` de map `desiredLocations`.
- Khi seeker chua co CV hien tai, khoa option "Su dung CV hien tai" va bat buoc chon file moi truoc khi submit.
- Validate client-side:
  - phone theo regex backend
  - 3 desired locations
  - cover letter toi da 500 ky tu
  - CV chi nhan `.pdf`, `.doc`, `.docx`, toi da 5MB
- Sau khi apply thanh cong, goi lai `getMyProfileApi()` va cap nhat `seekerStore`.

## Backend

- Trong `ApplicationServiceImpl.applyToJob`:
  - neu co `cvFile`, tai CV moi qua `seekerService.uploadMyCv(cvFile)`
  - neu khong co `cvFile`, bat buoc seeker phai co `cvUrl`, neu khong thi throw `SEEKER_CV_REQUIRED`
  - save `Application` voi thong tin submit
  - cap nhat `Seeker.fullName`, `phoneNumber`, `desiredLocations`, `coverLetter` bang du lieu request trong cung transaction
- Giu nguyen route, DTO field va response contract hien co.

## Verification

- Frontend: `npm run type-check`, `npm run build`
- Backend: `mvn test`
- Manual:
  - seeker da co CV, submit bang CV hien tai
  - seeker da co CV, chon CV moi va submit
  - seeker chua co CV, submit khi chua chon file phai bi chan
  - doi so dien thoai / cover letter roi apply, mo lai form apply khac phai thay du lieu moi
