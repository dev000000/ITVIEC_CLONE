---
name: git-commit
description: "Read staged changes and generate a conventional commit message, then confirm with user before committing. Use when: user wants to commit, generate commit message, write commit, staged changes ready to commit, git commit, tạo commit message, commit thay đổi."
argument-hint: "Optional: brief description of what your changes are about"
---

# Git Commit — Generate & Confirm

## When to Use

- User has staged changes (`git add`) and wants to commit
- User asks to "generate commit message", "tạo commit message", "commit thay đổi"
- User wants to commit but isn't sure what message to write
- Support both detailed messages (with body) and short form (subject only)

## Project Config (this repo)

- **Issue prefix**: Always prepend `#1-` — this repo has only one issue
- **Single-request flow**: The entire confirm → regenerate → commit loop runs inside **one AI request** using inline questions (`vscode_askQuestions`). Never ask the user to send another message to approve.

---

## Workflow

### Phase 1 — Read Staged Changes

Run `git diff --staged --name-status` and `git diff --staged` to read staged files and diff.

If **no staged changes** are found → stop and inform the user.

### Phase 2 — Generate Commit Message

Analyze the diff and generate a commit message:

```
#1-<type>(<scope>): <subject>

[optional body — bullet list of key changes if there are multiple]
```

**Types:**
| Type | When to use |
|---|---|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `refactor` | Code restructure without behavior change |
| `chore` | Tooling, config, dependencies, non-code changes |
| `style` | Formatting, naming, no logic change |
| `docs` | Documentation changes |
| `test` | Adding or updating tests |
| `perf` | Performance improvement |

**Scope** (optional): affected module, e.g., `helpers`, `constants`, `auth`, `job`, `seeker`, `skill`

**Subject rules:**

- Lowercase, no period at end
- Imperative mood ("add types" not "added types")
- ≤72 characters (excluding `#1-` prefix)

**Default: short commit (no body)**. A single subject line is almost always enough:

```
#1-refactor(typescript): migrate helper and constants modules to ts
```

**Body** (only when changes span multiple unrelated areas AND a single subject line cannot capture the intent — rare):

- Bullet list, each item ≤80 chars
- If in doubt, omit the body

### Phase 3 — Inline Confirmation Loop (single request)

**This entire loop runs within one AI request using `vscode_askQuestions`.**

**Step 3.1** — Ask for confirmation inline:

Use `vscode_askQuestions` with:

- The proposed commit message shown in the `message` field
- Options: `yes — commit này` / `no — chỉnh lại`
- If user selects "no", include a freeform text field for them to describe what the changes are about

**Step 3.2** — If approved → proceed to Phase 4a immediately.

**Step 3.3** — If rejected with a description → use that description to regenerate a better message, then loop back to Step 3.1 with the new message. Repeat until approved.

### Phase 4 — Execute Commit

Run:

```
git commit -m "#1-<type>(<scope>): <subject>" -m "<body>"
```

Omit `-m "<body>"` if no body. Show the commit hash output to confirm success.

---

## Rules

- **Always prepend `#1-`** — this project has one issue
- **Single-request flow** — use `vscode_askQuestions` for inline confirmation; never wait for a new user message to complete the loop
- **Never use `git commit -a`** — only commit what is staged
- **Never amend or force-push** without explicit request
- If staged is empty but unstaged changes exist, inform the user
- For large diffs (100+ lines), focus the message on _intent_ not every file detail

---

## Example (Single Request Flow)

> User: tạo commit message đi

Agent (within ONE request):

1. Reads `git diff --staged`
2. Generates: `#1-chore(skill): add git-commit skill for conventional commit generation`
3. Calls `vscode_askQuestions` → user sees the message and picks **yes**
4. Immediately runs `git commit -m "#1-chore(skill): add git-commit skill for conventional commit generation"`
5. Shows commit hash → done

> User: tạo commit message đi (with rejection)

Agent (within ONE request):

1. Reads diff → generates `#1-chore(skill): update commit workflow`
2. Calls `vscode_askQuestions` → user picks **no**, writes: "đây là update skill git-commit để tự động thêm #1- và confirm trong 1 request"
3. Regenerates: `#1-chore(skill): enforce single-request flow and auto #1- prefix`
4. Calls `vscode_askQuestions` again → user picks **yes**
5. Runs `git commit` → shows hash → done
