# AGENTS.md

## Scope

Apply these rules to the entire `project-itviec` repository unless a deeper `AGENTS.md` overrides them.

Cursor project rules live in `.cursor/rules/`; workflows in `.cursor/skills/`.

## Repository Layout

```
project-itviec/
├── it-viec-frontend/   # React 19 + Vite + TypeScript + Ant Design + Zustand
├── it-viec-backend/    # Spring Boot 3 + Java 17
├── database/           # json-server mock (port 3333)
├── AGENTS.md           # This file — monorepo overview
└── .cursor/
    ├── rules/          # File-scoped conventions (.mdc)
    └── skills/         # Multi-step workflows (SKILL.md)
```

## Working Style

- Read the relevant code path before editing.
- Prefer minimal patches over broad refactors.
- Do not rename public APIs, routes, DTO fields, or Zustand state keys unless the task explicitly requires it.
- Preserve existing folder structure and naming patterns inside each package.
- Keep changes scoped to the layer being modified unless a cross-layer fix is necessary.

## API Contract

- Backend base path: `/api/v1/...` (port `8081`).
- Frontend base URL: `VITE_API_ENDPOINT` → `src/configurations/appConfig.ts`.
- All responses wrapped in `ApiResponse<T>` / `APIResponse<T>` with `code: 1000` on success.
- Paginated lists use `PageResponse<T>` (`data`, `page`, `size`, `totalElements`).
- Frontend reads payload via `response.data.result`.

## Auth

- HttpOnly cookie JWT — `apiClient` uses `withCredentials: true`.
- Do not store tokens in localStorage.
- 401: unauthenticated; 410: access token expired → auto refresh via `refreshTokenCookieApi`.
- Global auth state: `useUserStore`; role-specific: `useSeekerStore`, `useCompanyStore`.
- Roles: `ADMIN`, `EMPLOYER`, `SEEKER` (`src/types/common.types.ts`).

## Frontend

- React 19 + Vite + TypeScript + Ant Design + Sass + Zustand + react-i18next.
- API calls only through `src/services/*Api.ts` using shared `apiClient`.
- Types: `src/types/request.types.ts`, `response.types.ts`, `common.types.ts`.
- Routes: `src/routes/`; guards: `src/components/route/`.
- i18n: `public/locales/{vi,en}/*.json` — namespaces: shared, common, auth, job, jobseeker, employer, admin.
- Run `npm run type-check`, `npm run lint`, or `npm run build` when behavior changes.

## Backend

- Spring Boot 3 + Java 17; package `com.dev001.itviec`.
- Layers: controller → service → repository; DTOs and mappers separated.
- Controllers return `ApiResponse<T>` builder with `.code(1000)`.
- Preserve request/response contracts unless the task includes frontend updates.
- Verify with `./mvnw test` or the smallest relevant test class.

## Database Mock Service

- `database/` — `npm start` runs json-server on port `3333`.
- Keep `database.json` aligned with frontend types when used for local dev.

## Validation

- Run the smallest relevant validation for the files changed.
- If you cannot run validation, state that explicitly in the final response.
- Do not modify lockfiles or generated files unless required by the task.

## Skills

| Skill | Path | When to use |
|-------|------|-------------|
| `plan-and-implement` | `.cursor/skills/plan-and-implement/SKILL.md` | Add a new feature using the 3-agent pipeline: Opus 4.6 high plans, Composer 2.5 fast does backend, Sonnet 4.6 high does frontend |
| `add-api-endpoint` | `.cursor/skills/add-api-endpoint/SKILL.md` | Add a single REST endpoint across backend + frontend |
| `frontend-page` | `.cursor/skills/frontend-page/SKILL.md` | Create/modify React pages with routing, i18n, Ant Design |
