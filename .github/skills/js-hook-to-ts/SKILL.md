---
name: js-hook-to-ts
description: "Migrate a JS React hook to TS. Use for files with React hooks (useState, useEffect, etc.) but NO JSX markup. Steps: rename file, convert relative imports to @/ alias, add TypeScript types to hook params/return/state. Logic is preserved exactly — no refactoring."
argument-hint: "Path to the JS hook file to migrate, e.g. src/hooks/use-menu-navigation.js"
---

# JS Hook → TS Migration (React Hooks without JSX)

## When to Use

- Converting an existing **custom React hook** (`.js`) to `.ts`
- File uses React hooks (`useState`, `useEffect`, `useRef`, etc.) but contains **NO JSX markup**
- Examples: `hooks/use-menu-navigation.js`, `hooks/use-cursor-visibility.js`
- User says "migrate hook", "convert hook to TypeScript", or "chuyển hook sang ts"

**Note:**

- For React components **with JSX**, use the **jsx-to-tsx** skill instead.
- For pure utility modules **without React**, use the **jsx-to-ts** skill instead.

---

## Rules (Non-Negotiable)

- **Do NOT change logic** — only add types and fix imports
- **Do NOT refactor** — keep the same structure, hook name, exports
- **Never use `any`** — infer types from usage; use `unknown` if truly unclear
- Use `import type` for type-only imports
- All new imports must use `@/` alias (never relative paths) **EXCEPT** local SCSS imports
- Do NOT add `"use client"` directives unless they already exist in the source

---

## Procedure

### Step 1 — Read the source file

Read the full content of the target `.js` hook file before making any changes.

### Step 2 — Rename the file

- `.js` → `.ts` (hooks have no JSX, so never `.tsx`)

Use the terminal `Rename-Item` command since file rename is a destructive action:

```powershell
Rename-Item "src/hooks/use-foo.js" "use-foo.ts"
```

### Step 3 — Convert relative imports to `@/`

Replace every relative import (`../`, `./`) pointing **outside** the current folder:

```ts
// Before
import { useWindowSize } from "./use-window-size";
import { apiClient } from "../../services_new/apiClient";

// After
import { useWindowSize } from "@/hooks/use-window-size";
import { apiClient } from "@/services_new/apiClient";
```

> **Exception:** Imports that are **sibling hook files in the same folder** may stay relative OR use `@/hooks/` — be consistent with the file's existing style.

### Step 4 — Define an interface for the options parameter

Hooks that accept a single destructured object parameter need an explicit interface:

```ts
// Before
export function useCursorVisibility({
  editor,
  overlayHeight = 0,
  elementRef = null,
}) {
  // ...
}

// After
interface UseCursorVisibilityOptions {
  editor: Editor | null;
  overlayHeight?: number;
  elementRef?: React.RefObject<HTMLElement> | null;
}

export function useCursorVisibility({
  editor,
  overlayHeight = 0,
  elementRef = null,
}: UseCursorVisibilityOptions) {
  // ...
}
```

Name the interface `Use<HookName>Options` (PascalCase, matching the hook name).

### Step 5 — Type the return value

Add an explicit return type annotation to the hook function:

```ts
// Hook that returns an object
export function useCursorVisibility(...): { x: number; y: number; width: number; height: number } {
  // ...
}

// Hook that returns void
export function useMenuNavigation(...): void {
  // ...
}

// Hook that returns a tuple
export function useMobile(): [boolean, () => void] {
  // ...
}
```

If the return shape is complex, define a named interface:

```ts
interface UseCursorVisibilityResult {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useCursorVisibility(...): UseCursorVisibilityResult {
  // ...
}
```

### Step 6 — Type `useState` generics

Add generics to `useState` calls where the inferred type is too broad:

```ts
// Simple — TypeScript infers boolean, no annotation needed
const [isOpen, setIsOpen] = useState(false);

// Non-obvious initial value — annotate explicitly
const [rect, setRect] = useState<DOMRect | null>(null);

// Object state — annotate with an interface
interface RectState {
  x: number;
  y: number;
  width: number;
  height: number;
}
const [rect, setRect] = useState<RectState>({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});
```

### Step 7 — Type inline function parameters

Type any callback or event handler parameter TypeScript cannot infer:

```ts
// Before
const handleKeydown = (event) => { ... }
containerRef.current.addEventListener("keydown", handleKeydown)

// After
const handleKeydown = (event: KeyboardEvent): boolean | void => { ... }
```

Common event types in hooks:

- `KeyboardEvent` — `addEventListener("keydown", ...)`
- `MouseEvent` — `addEventListener("click", ...)`
- `Event` — generic fallback

### Step 8 — Use correct React and third-party types

| Pattern                       | Type                                          |
| ----------------------------- | --------------------------------------------- |
| `useRef` for DOM element      | `React.RefObject<HTMLDivElement>`             |
| `useRef` for mutable value    | `React.MutableRefObject<number>`              |
| Optional ref param            | `React.RefObject<HTMLElement> \| null`        |
| TipTap editor instance        | `import type { Editor } from "@tiptap/react"` |
| ResizeObserver callback entry | `ResizeObserverEntry`                         |

### Step 9 — Add `import type` where applicable

If an import is only used as a type (not called as a value), change to `import type`:

```ts
import type { Editor } from "@tiptap/react";
import type { RefObject } from "react";
```

### Step 10 — Fix ESLint issues

Check for:

- `@typescript-eslint/no-unused-vars` — remove or prefix with `_`
- `@typescript-eslint/no-explicit-any` — replace with a specific type
- `react-hooks/rules-of-hooks` — hooks must be at top level (should already be fine)

### Step 11 — Verify

Before finishing, confirm:

- [ ] File extension is `.ts` (not `.tsx`)
- [ ] No relative `../` imports remaining (except sibling hooks in same folder)
- [ ] Hook options object has a named `Use<HookName>Options` interface
- [ ] Return type is explicitly annotated
- [ ] All `useState` generics are declared for non-trivial initial values
- [ ] All inline function params are typed
- [ ] Zero `any` in the new file
- [ ] Logic is identical to the original — no added/removed behavior

---

## Example: Full Migration

**Input** (`use-cursor-visibility.js`):

```js
"use client";
import * as React from "react";
import { useWindowSize } from "./use-window-size";

export function useCursorVisibility({
  editor,
  overlayHeight = 0,
  elementRef = null,
}) {
  const { height: windowHeight } = useWindowSize();
  const [rect, setRect] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

  const updateRect = React.useCallback(() => {
    const element = elementRef?.current ?? document.body;
    const { x, y, width, height } = element.getBoundingClientRect();
    setRect({ x, y, width, height });
  }, [elementRef]);

  React.useEffect(() => {
    const element = elementRef?.current ?? document.body;
    updateRect();
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateRect);
    });
    resizeObserver.observe(element);
    window.addEventListener("scroll", updateRect, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateRect);
    };
  }, [elementRef, updateRect]);

  return rect;
}
```

**Output** (`use-cursor-visibility.ts`):

```ts
"use client";
import * as React from "react";
import type { Editor } from "@tiptap/react";
import { useWindowSize } from "@/hooks/use-window-size";

interface RectState {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseCursorVisibilityOptions {
  editor: Editor | null;
  overlayHeight?: number;
  elementRef?: React.RefObject<HTMLElement> | null;
}

export function useCursorVisibility({
  editor,
  overlayHeight = 0,
  elementRef = null,
}: UseCursorVisibilityOptions): RectState {
  const { height: windowHeight } = useWindowSize();
  const [rect, setRect] = React.useState<RectState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const updateRect = React.useCallback(() => {
    const element = elementRef?.current ?? document.body;
    const { x, y, width, height } = element.getBoundingClientRect();
    setRect({ x, y, width, height });
  }, [elementRef]);

  React.useEffect(() => {
    const element = elementRef?.current ?? document.body;
    updateRect();
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateRect);
    });
    resizeObserver.observe(element);
    window.addEventListener("scroll", updateRect, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateRect);
    };
  }, [elementRef, updateRect]);

  return rect;
}
```
