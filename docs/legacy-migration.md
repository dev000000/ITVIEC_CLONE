# Redux + Legacy Service Migration

## Summary

Frontend da migrate khoi Redux va legacy json-server service trong `src/services`.

- State dung Zustand trong `src/store`.
- API calls dung `src/services_new`.
- Legacy folders `src/actions`, `src/reducers`, `src/services` va `src/utils/request.jsx` da duoc remove.
- Dependencies React Redux bindings va Redux core da duoc remove khoi frontend package.

## State Mapping

- `UserReducer.ok` -> `useUserStore().authenticated`.
- `UserReducer.userType` -> `useUserStore().role`.
- `setLogin(...)` -> `useUserStore().setLogin(...)`.
- Logout/reset user -> `useUserStore().logout()`.
- `SeekerReducer` -> `useSeekerStore`.
- `CompanyReducer` -> `useCompanyStore`.

## Service Mapping

- `getCompanyWithJobsByUserID` -> `getMyCompanyApi`.
- `getJobs` -> `getMyJobsApi`.
- `getSkills` -> `getAllSkillsApi`.
- `postJob` -> `createJobApi`.
- `getJobWithCompany` -> `getMyJobsApi()` + find by `id`.
- `updateJob` -> `updateJobApi`.
- `deleteJob` -> `deleteJobApi`.
- `updateCompany` -> `updateMyCompanyApi`.
- `getJobDetailByID` / `getJobDetailBySlug` -> `getJobBySlugApi`.
- `getSeekerInforByUserId` -> `getMyProfileApi`.
- `updateSeekerInfor` -> `updateMyProfileApi`.
- `postApplication` -> `applyToJobApi`.
- `getApplicationsBySeekerId` -> `getMyApplicationsApi` + client-side pagination/sort.
- `getApplicationsWithJob` -> `getMyCompanyApplicationsApi` + client-side pagination.
- `updateApplication` -> `updateApplicationStatusApi`.

## Open API Gaps

Nhung vi tri sau da co TODO comment truc tiep tai call site vi `services_new` chua co replacement tuong duong:

- `getJobsSearch`: can API search job active theo keyword/city. Tam thoi dung `getAllJobsApi(0, 100)` roi filter client-side trong `JobSearch`.
- `checkApplication`: can API check seeker da apply mot job chua. Tam thoi fallback la chua applied trong `CardJobHead`.
- `checkApplicationExist`: can API chan duplicate application truoc khi submit. Tam thoi bo qua pre-check va de backend xu ly duplicate neu co rule.
- Application relations: `ApplicationResponse` co the chua tra `job/company`, trong khi UI can job title, salary, company name/link. Tam thoi map relation neu backend tra ve, nguoc lai hien fallback `N/A` / `???`.

## Validation

Da chay:

```bash
npm.cmd run type-check
```

Can chay lai sau cac thay doi tiep theo:

```bash
rg -n "<legacy-redux-or-service-import-patterns>" it-viec-frontend/src
npm.cmd run type-check
npm.cmd run lint
npm.cmd run build
```
