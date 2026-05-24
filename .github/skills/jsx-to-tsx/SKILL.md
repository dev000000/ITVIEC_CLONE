---
name: jsx-to-tsx
description: "Migrate a JSX/JS file to TSX/TS. Use when converting existing React components to TypeScript. Steps: rename file, convert relative imports to @/ alias, add TypeScript types to props/state/functions. Logic is preserved exactly — no refactoring."
argument-hint: "Path to the JSX file to migrate, e.g. src/components/Header/index.jsx"
---

# JSX → TSX Migration

## When to Use
- Converting an existing `.jsx` component to `.tsx`
- Converting an existing `.js` module to `.ts`
- User says "migrate", "convert to TypeScript", or "chuyển sang tsx"

## Rules (Non-Negotiable)
- **Do NOT change logic** — only add types and fix imports
- **Do NOT refactor** — keep the same structure, hooks, variable names
- **Never use `any`** — infer types from usage; use `unknown` if truly unclear
- Use `import type` for type-only imports
- All new imports must use `@/` alias (never relative paths)

---

## Procedure

### Step 1 — Read the source file
Read the full content of the target `.jsx` / `.js` file before making any changes.

### Step 2 — Rename the file
- `.jsx` → `.tsx`
- `.js` → `.ts` (if no JSX present)

Use the terminal `mv` / `Rename-Item` command or ask the user to rename it, since file rename is a destructive action.

### Step 3 — Convert relative imports to `@/`

Find every `import` that uses a relative path (`../`, `./`) pointing **outside** the current component folder and replace with `@/`:

```ts
// Before
import { checkTokenUsers } from "../../services/UserServices";
import { setLogin } from "../../actions/User";
import { clearStorage } from "../../helpers/localStorage";

// After
import { checkTokenUsers } from "@/services/UserServices";
import { setLogin } from "@/actions/User";
import { clearStorage } from "@/helpers/localStorage";
```

> Imports within the same folder (e.g. `./MyComponent.scss`) stay as-is.

### Step 4 — Type the component props

Add an explicit `interface` or `type` for the component's props. Derive the shape from how props are used inside the component.

```tsx
// Before
function MyComponent({ checkRole }) { ... }

// After
interface MyComponentProps {
  checkRole: string;   // infer from usage
}

function MyComponent({ checkRole }: MyComponentProps) { ... }
```

If the component takes no props, no interface needed.

### Step 5 — Type useState hooks

Add generics to `useState` calls where the inferred type is too broad:

```tsx
// Before
const [isCheckingToken, setIsCheckingToken] = useState(true);

// After — boolean is inferred, no change needed
const [isCheckingToken, setIsCheckingToken] = useState(true);

// Before (non-obvious initial value)
const [data, setData] = useState(null);

// After
const [data, setData] = useState<UserData | null>(null);
```

### Step 6 — Type function parameters and return values

Type any inline function parameters that TypeScript cannot infer:

```tsx
// Before
const handleChange = (e) => { ... }

// After
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
```

### Step 7 — Add `import type` where applicable

If an import is only used as a type (not a value), change to `import type`:

```ts
import type { UserData } from "@/types/response.types";
```

### Step 8 — Fix ESLint issues

Check for:
- `@typescript-eslint/no-unused-vars` — remove or prefix with `_`
- `react-hooks/rules-of-hooks` — hooks must be at top level
- `@typescript-eslint/no-explicit-any` — replace with a specific type

### Step 9 — Verify

Before finishing, confirm:
- [ ] File extension is `.tsx` / `.ts`
- [ ] No relative `../` imports remaining (except same-folder assets)
- [ ] All props and state variables are typed
- [ ] Zero `any` in the new file
- [ ] Logic is identical to the original — no added/removed behavior

---

## Example: Full Migration

**Input** (`index.jsx`):
```jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkTokenUsers } from "../../services/UserServices";
import { clearStorage } from "../../helpers/localStorage";

function LayoutCheckToken({ checkRole }) {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setIsChecking(false); return; }
      await checkTokenUsers(token, checkRole);
      setIsChecking(false);
    };
    run();
  }, []);

  if (isChecking) return <div>Loading...</div>;
  return <Outlet />;
}
export default LayoutCheckToken;
```

**Output** (`index.tsx`):
```tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { checkTokenUsers } from "@/services/UserServices";
import { clearStorage } from "@/helpers/localStorage";

interface LayoutCheckTokenProps {
  checkRole: string;
}

function LayoutCheckToken({ checkRole }: LayoutCheckTokenProps) {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setIsChecking(false); return; }
      await checkTokenUsers(token, checkRole);
      setIsChecking(false);
    };
    run();
  }, []);

  if (isChecking) return <div>Loading...</div>;
  return <Outlet />;
}
export default LayoutCheckToken;
```
