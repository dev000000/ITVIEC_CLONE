---
description: "Use when creating or modifying frontend files: React components, TypeScript modules, hooks, services, Zustand stores, types, routes, or SCSS styles. Covers TypeScript conventions, arrow function components, @/ path alias, state management, API layer (services_new), type definitions, and Ant Design styling rules."
applyTo: "it-viec-frontend/src/**/*.{ts,tsx,js,jsx}"
---

# Frontend Development Guidelines

## Language & Files

- New files must use **TypeScript** (`.ts` / `.tsx`). Do NOT create new `.jsx` files.
- Use `import type` for type-only imports (`verbatimModuleSyntax: true`).
- Existing `.jsx` files in `components/`, `pages/`, `services/` — do not refactor unless explicitly requested.

## Path Alias

Always use `@/` instead of relative paths:

```ts
import { useUserStore } from '@/store/userStore'       // ✅
import { useUserStore } from '../../../store/userStore' // ❌
```

## State Management

- **Zustand** (`src/store/`) — use for all new state (user, seeker, company, etc.).
- **Redux** (`src/reducers/`) — legacy only. Do NOT add new reducers here.
- New feature → create a Zustand store.

## API & Services

- New API calls → create in `src/services_new/` with full TypeScript types, using `apiClient.ts`.
- Do NOT add new files to `src/services/` (legacy JSX layer, kept for compatibility only).
- `apiClient` handles token refresh automatically on **HTTP 410** (access token expired).
- API base URL from `VITE_API_ENDPOINT` env var (default `http://localhost:8081`).

## Types

All types live in `src/types/`:
- `common.types.ts` — enums/consts synced with backend enums
- `request.types.ts` — request payload types
- `response.types.ts` — `APIResponse<T>`, `PageResponse<T>`
- `slice.types.ts` — Zustand store state shapes

**Never use `any`**. Declare specific types. (`no-explicit-any` is ESLint warn.)

## Styling

- Use **SCSS** (`.scss`) for component styles. No plain CSS files.
- Global variables in `src/styles/_variables.scss`.
- Use **Ant Design 5** for UI components. Do not mix other UI libraries.
- Avoid inline styles unless absolutely necessary.

## Component Structure

```
components/
  MyComponent/
    index.tsx
    MyComponent.scss
```

## Functional Components

- **Always functional** — never class components. Use `const Component = () => {}` arrow function syntax.
- **Props interface** — define `interface ComponentNameProps` for all component props, even if empty.
- **Variables** — use `const` only. Never use `var`. Use `let` only when variable is reassigned (rare).

**Example:**
```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    // ✅ const + arrow function
    setIsLoading(true);
  };
  
  return <button onClick={handleClick}>{label}</button>;
};

export default Button;
```

## Routing

- Route definitions in `src/routes/index.tsx`.
- Two route groups: **JobSeeker** (default layout) and **Employer** (separate layout).
- Route guards: `PrivateRoutes`, `PublicRoutes`, `EmployerPrivateRoute`, `EmployerPublicRoute`.
- Auth check via `LayoutCheckToken` component.

## Security

- HTML content from TipTap editor **must** be sanitized with **DOMPurify** before rendering.

## ESLint (enforced)

- `@typescript-eslint/no-unused-vars` → **error** (SCREAMING_SNAKE_CASE vars are exempt)
- `@typescript-eslint/no-explicit-any` → **warn**
- `react-hooks/rules-of-hooks` → **error**
