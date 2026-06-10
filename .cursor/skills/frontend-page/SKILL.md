---
name: frontend-page
description: Create or modify React pages in it-viec-frontend with routing, i18n, Ant Design, and Zustand. Use when adding pages, routes, or JobSeeker/Employer/Admin screens.
---

# Frontend Page

## Checklist

```
- [ ] Page component in src/pages/{Shared|JobSeeker|Employer|Admin}/...
- [ ] Route entry in src/routes/ (index.tsx or role route module)
- [ ] Auth guard if private (PrivateRoute, EmployerPrivateRoute, AdminPrivateRoute)
- [ ] i18n keys in public/locales/{vi,en}/<namespace>.json
- [ ] API calls via src/services/*Api.ts (not raw axios)
- [ ] Colocated .scss if page needs custom styles
- [ ] npm run type-check
```

## Page structure pattern

Follow `src/pages/Shared/Home/index.tsx`:

1. Import services and response types
2. `useTranslation("namespace")` for UI text
3. `useState` for local data; Zustand for global auth/profile
4. `useEffect` to fetch on mount
5. Handle errors with `getApiErrorMessage` + Swal or Ant Design feedback

## Route placement

| Role | Route modules | Layout |
|------|---------------|--------|
| Public/shared | `PublicRoutes`, `routes/index.tsx` | `LayoutDefault` |
| Job seeker | `PrivateRoutes` | `LayoutCheckToken` |
| Employer | `EmployerPrivateRoute`, `EmployerPublicRoute` | `LayoutEmployer` |
| Admin | `AdminPrivateRoute`, `AdminPublicRoute` | admin layout |

## i18n namespaces

`shared`, `common`, `auth`, `job`, `jobseeker`, `employer`, `admin`

Add keys to both `vi` and `en` locale files.

## Do not

- Hardcode Vietnamese/English UI strings
- Put axios calls directly in page components
- Change route paths or auth flow without explicit task requirement
