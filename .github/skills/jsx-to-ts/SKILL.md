---
name: jsx-to-ts
description: "Migrate a JS utility module to TS (no JSX markup). Use for helper functions, constants, services without React components. Steps: rename file, convert relative imports to @/ alias, add TypeScript types to functions/exports. Logic is preserved exactly — no refactoring."
argument-hint: "Path to the JS utility file to migrate, e.g. src/helpers/localStorage.js"
---

# JS → TS Migration (Utility Modules)

## When to Use

- Converting an existing **utility/helper module** (`.js`) to `.ts`
- File contains **NO JSX markup** — only pure functions, constants, or exports
- Examples: `helpers/`, `constants/`, `utils/`, `services/` (non-React)
- User says "migrate helper", "convert utility to TypeScript", or "chuyển sang ts"

**Note:** For React components **with JSX**, use the **jsx-to-tsx** skill instead.

---

## Rules (Non-Negotiable)

- **Do NOT change logic** — only add types and fix imports
- **Do NOT refactor** — keep the same structure, function names, exports
- **Never use `any`** — infer types from usage; use `unknown` if truly unclear
- Use `import type` for type-only imports
- All new imports must use `@/` alias (never relative paths) **EXCEPT** local SCSS imports

---

## Procedure

### Step 1 — Read the source file

Read the full content of the target `.js` file before making any changes.

### Step 2 — Rename the file

- `.js` → `.ts`

Use the terminal `Rename-Item` command since file rename is a destructive action.

### Step 3 — Convert relative imports to `@/`

Find every `import` that uses a relative path (`../`, `./`) pointing **outside** the current module folder and replace with `@/`:

```ts
// Before
import { COMPANY_IMAGE_URL } from "../constants";
import { formatDate } from "../helpers/formattedDate";

// After
import { COMPANY_IMAGE_URL } from "@/constants";
import { formatDate } from "@/helpers/formattedDate";
```

> **Exception:** Local asset imports (e.g., `.scss` in the same folder) stay as relative.

### Step 4 — Type function parameters and return values

Add explicit types to function signatures:

```ts
// Before
export function setCookie(cname, cvalue, exdays) {
  // ...
}

// After
export function setCookie(cname: string, cvalue: string, exdays: number): void {
  // ...
}
```

For arrow functions:

```ts
// Before
export const getImageName = (name) => {
  // ...
};

// After
export const getImageName = (name: string): string | null => {
  // ...
};
```

### Step 5 — Type exported constants

Add explicit types to exported const declarations:

```ts
// Before
export const VIETNAM_CITIES = [
  { value: "all", label: "Tất cả thành phố" },
  // ...
];

// After
interface CityOption {
  value: string;
  label: string;
}

export const VIETNAM_CITIES: CityOption[] = [
  { value: "all", label: "Tất cả thành phố" },
  // ...
];
```

### Step 6 — Type function callbacks and higher-order functions

```ts
// Before
const handleData = (callback) => {
  callback(data);
};

// After
const handleData = (callback: (data: unknown) => void): void => {
  callback(data);
};
```

### Step 7 — Add `import type` where applicable

If an import is only used as a type (not a value), change to `import type`:

```ts
import type { CityOption } from "@/types/common.types";
```

### Step 8 — Fix ESLint issues

Check for:

- `@typescript-eslint/no-unused-vars` — remove or prefix with `_`
- `@typescript-eslint/no-explicit-any` — replace with a specific type

### Step 9 — Verify

Before finishing, confirm:

- [ ] File extension is `.ts`
- [ ] No relative `../` imports remaining (except local files)
- [ ] All function parameters and return types are explicitly typed
- [ ] All exported constants are typed
- [ ] Zero `any` in the new file
- [ ] Logic is identical to the original — no added/removed behavior

---

## Examples

### Example 1: Simple Helper Function

**Input** (`localStorage.js`):

```js
export function setLocalStorageUser(result) {
  localStorage.setItem("token", result.token);
  localStorage.setItem("id", result.id);
  localStorage.setItem("userType", result.userType);
}

export function clearStorage() {
  localStorage.clear();
}
```

**Output** (`localStorage.ts`):

```ts
interface UserData {
  token: string;
  id: string;
  userType: string;
}

export function setLocalStorageUser(result: UserData): void {
  localStorage.setItem("token", result.token);
  localStorage.setItem("id", result.id);
  localStorage.setItem("userType", result.userType);
}

export function clearStorage(): void {
  localStorage.clear();
}
```

### Example 2: Helper with Cross-Module Import

**Input** (`getImageName.js`):

```js
import { COMPANY_IMAGE_URL } from "../constants";

export const getImageName = (name) => {
  const company = COMPANY_IMAGE_URL.find((item) => item.name === name);
  return company ? company.url : null;
};
```

**Output** (`getImageName.ts`):

```ts
import { COMPANY_IMAGE_URL } from "@/constants";

export const getImageName = (name: string): string | null => {
  const company = COMPANY_IMAGE_URL.find((item) => item.name === name);
  return company ? company.url : null;
};
```

### Example 3: Constants File

**Input** (`index.js`):

```js
export const GENDER_OPTIONS = [
  { value: "Nam", label: <span>Nam</span> },
  { value: "Nữ", label: <span>Nữ</span> },
];
```

**Output** (`index.ts`):

```ts
import type React from "react";

interface GenderOption {
  value: string;
  label: React.ReactNode;
}

export const GENDER_OPTIONS: GenderOption[] = [
  { value: "Nam", label: <span>Nam</span> },
  { value: "Nữ", label: <span>Nữ</span> },
];
```

Note: JSX (`<span>`) is still valid in `.ts` files when used in type declarations.
