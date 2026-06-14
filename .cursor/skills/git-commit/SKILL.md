---
name: git-commit
description: Read staged changes and generate a Conventional Commits message, confirm with user, then commit. Use when user wants to commit, generate commit message, write commit, staged changes ready, git commit, tạo commit message, commit thay đổi, or /git-commit.
---

# Git Commit — Conventional Commits

Based on [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

## When to Use

- User has staged changes (`git add`) and wants to commit
- User asks to generate/write a commit message
- User invokes `/git-commit` **with or without** a short description of what changed

## Inputs for Generate (Phase 3)

Use **both** sources when available:

| Source | Role |
|--------|------|
| **User message** | Intent, scope, type hint, issue (`Refs: #5`), breaking note |
| **`git diff --staged`** | Ground truth — files touched, actual code changes |

**Priority when they differ:**

1. **Diff wins** for facts (which files, what code did)
2. **User narrative wins** for intent/why when diff alone is ambiguous (refactor vs feat, scope name)
3. If user description **contradicts** diff → mention briefly in confirm step; prefer diff unless user clarifies on reject

**Examples of slash + description:**

> `/git-commit` đoạn này tao làm top job domain api + home suggest tags, refs #1

→ type `feat`, scope `job`, subject from user + diff; footer `Refs: #1`; skip issue AskQuestion.

> `/git-commit` fix lỗi filter job domain không apply từ url`

→ type `fix`, verify in diff; subject reflects fix.

If user gives **only** `/git-commit` with no description → rely entirely on diff.

## Project Config

- **Issue tracking**: footer `Refs: #<issue>` — **always ask issue number before generating** (Phase 2)
- **Confirm loop**: read → ask issue → generate → confirm → commit in **one agent turn**; use `AskQuestion`

---

## Workflow

### Phase 1 — Read Staged Changes

Run in parallel:

```bash
git diff --staged --name-status
git diff --staged
```

If **no staged changes** → stop. Tell user to `git add` first.

### Phase 2 — Ask Issue (before generate)

Use `AskQuestion` **before** writing the commit message:

- **Prompt**: `Footer Refs: — chọn hoặc nhập số issue cho commit này`
- **Options**: common issues if known (e.g. `#1`) + rely on **Other** for custom `#123`
- Parse answer → issue id (digits only), footer line: `Refs: #<issue>`

Do **not** skip this step unless the user already stated the issue number in the same request (e.g. "commit refs #5").

### Phase 3 — Generate Message

Combine **user description** (if any) + **staged diff** per [Inputs for Generate](#inputs-for-generate-phase-3).

Structure ([spec](https://www.conventionalcommits.org/en/v1.0.0/)):

```text
<type>[optional scope][optional !]: <description>

[optional body]

Refs: #<issue>
[optional BREAKING CHANGE: ...]
```

**Types:** `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `style`, `chore`, `build`, `ci`

**Breaking changes:** `feat!:` / `fix(scope)!:` and/or footer `BREAKING CHANGE: <description>`

**Scope** (optional): `frontend`, `backend`, `auth`, `job`, `employer`, `seeker`, `admin`, `skill`, `i18n`, `db`

**Description rules:** imperative, lowercase, no trailing period, ≤72 chars, summarize **intent**

**Body** — default omit; add only when subject alone is insufficient (bullets ≤80 chars)

**Footers** (blank line before footers):

- **`Refs: #<issue>`** — required (from Phase 2)
- **`BREAKING CHANGE: ...`** — only when breaking

**Default: subject + `Refs` footer** (no body).

```text
feat(job): add top job domains endpoint for home suggestions

Refs: #1
```

### Phase 4 — Confirm (AskQuestion)

- **Prompt**: show full message (subject, body if any, footers)
- **Options**: `yes — commit này` (first) / `no — chỉnh lại`
- **Other** for custom feedback → regenerate → ask again until approved

### Phase 5 — Commit

Commit **staged only** — never `git commit -a`.

**Subject + Refs footer:**

```bash
git commit -m "feat(job): add top job domains endpoint for home suggestions" -m "Refs: #1"
```

**With body + footers** (multiple `-m`; blank line between body and footers is implicit):

```bash
git commit -m "feat: expand multi-domain jobs and nhieuviec rebrand" -m "- add top job domains api and home filter" -m "- seed diverse domain jobs in data.sql" -m "Refs: #1"
```

**With breaking change:**

```bash
git commit -m "feat(api)!: rename job search response field" -m "BREAKING CHANGE: clients must read result instead of data" -m "Refs: #1"
```

Show commit hash and `git status` after success.

---

## Rules

- Always include footer `Refs: #<issue>`; ask issue in Phase 2 unless user already gave it
- Do **not** put `#issue` in the subject line — issue goes in footer only
- Never amend or force-push unless user explicitly asks
- Never update git config
- Large diffs: message reflects **why**, not every file

---

## Examples

**Subject + Refs only:**

```text
feat(backend): expose GET /api/v1/job-domains/top

Refs: #1
```

**With body:**

```text
feat: expand multi-domain jobs and nhieuviec rebrand

- add top job domains api and home suggestion tags
- rebrand UI, i18n and email templates

Refs: #1
```

**Breaking change:**

```text
feat(api)!: rename job search response wrapper field

BREAKING CHANGE: clients must read result instead of data on search endpoint
Refs: #1
```

---

## Cursor vs Copilot

Same workflow as `.github/skills/git-commit/SKILL.md`; Cursor uses `AskQuestion` instead of `vscode_askQuestions`.

Keep both files in sync when commit rules change.
