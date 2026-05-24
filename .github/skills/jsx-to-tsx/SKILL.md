---
name: jsx-to-tsx
description: "Migrate a JSX React component to TSX with TypeScript. Use for files with JSX markup (React components). Steps: rename file, convert relative imports to @/ alias, add TypeScript types to props/state/hooks/functions. Logic is preserved exactly — no refactoring."
argument-hint: "Path to the JSX component file to migrate, e.g. src/components/Header/index.jsx"
---

# JSX → TSX Migration (React Components)

## When to Use

- Converting an existing **React component** (`.jsx`) to `.tsx`
- File contains **JSX markup** (e.g., `<Component />`, hooks like `useState`, `useEffect`)
- User says "migrate component", "convert to TypeScript", or "chuyển component sang tsx"

**Note:** For utility/helper modules **without JSX**, use the **jsx-to-ts** skill instead.

## Rules (Non-Negotiable)

- **Do NOT change logic** — only add types and fix imports
- **Do NOT refactor** — keep the same structure, hooks, variable names
- **Never use `any`** — infer types from usage; use `unknown` if truly unclear
- Use `import type` for type-only imports
- All new imports must use `@/` alias (never relative paths) **EXCEPT** SCSS module imports — keep them as relative (e.g., `./ComponentName.scss`) because the folder moves as a unit

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

**Exception:** SCSS module imports in the same folder stay as relative paths:

```ts
// ✅ Correct — keep as relative because the folder moves as a unit
import "./ComponentName.scss";

// ❌ Do NOT convert SCSS imports to @/
import "@/components/ComponentName/ComponentName.scss"; // Wrong!
```

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
- [ ] No relative `../` imports remaining (except SCSS module imports in same folder)
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
      if (!token) {
        setIsChecking(false);
        return;
      }
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
      if (!token) {
        setIsChecking(false);
        return;
      }
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
