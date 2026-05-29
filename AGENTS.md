# AGENTS.md

## Scope

Apply these rules to the entire `project-itviec` repository unless a deeper `AGENTS.md` overrides them.

## Working Style

- Read the relevant code path before editing.
- Prefer minimal patches over broad refactors.
- Do not rename public APIs, routes, DTO fields, or Redux/Zustand state keys unless the task explicitly requires it.
- Preserve existing folder structure and naming patterns inside each package.
- Keep changes scoped to the layer being modified unless a cross-layer fix is necessary.

## Frontend

- Treat `it-viec-frontend` as a React 19 + Vite + TypeScript application with Ant Design and Sass already established.
- Prefer existing components, hooks, stores, and helpers before adding new abstractions.
- Keep route behavior, auth flow, and i18n behavior backward compatible unless the task says otherwise.
- Match existing styling patterns in `src/styles`, component `.scss` files, and page-level Sass modules.
- Run targeted checks with `npm run type-check`, `npm run build`, or `npm run lint` when frontend behavior is changed.

## Backend

- Treat `it-viec-backend` as a Spring Boot 3 + Java 17 application.
- Keep controller, service, repository, DTO, entity, and mapper responsibilities separated.
- Preserve request/response contracts unless the task explicitly includes client updates.
- Follow existing validation, security, and mapper patterns before introducing new ones.
- When changing Java code, prefer verification with Maven tests or the smallest relevant backend test command.

## Database Mock Service

- Treat `database` as a local `json-server` mock service on port `3333`.
- Keep mock payloads aligned with frontend expectations when updating `database.json` or related fixtures.

## Validation

- Run the smallest relevant validation for the files changed.
- If you cannot run validation, state that explicitly in the final response.
- Do not modify lockfiles or generated files unless required by the task.
