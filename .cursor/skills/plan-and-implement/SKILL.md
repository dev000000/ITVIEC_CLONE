---
name: plan-and-implement
description: >-
  Orchestrate a 3-agent pipeline to plan and implement a new feature for the
  project-itviec monorepo (Spring Boot backend + React frontend). Agent A
  (Opus 4.6 high) writes the plan to docs/, Agent B (Composer 2.5 fast)
  implements the backend, Agent C (Sonnet 4.6 high) implements the frontend.
  Use when the user asks to add a feature, endpoint, or page using the
  plan-first workflow, or says "plan and implement", "tạo plan và triển khai",
  "dùng pipeline 3 agent".
disable-model-invocation: true
---

# Plan-and-Implement Pipeline

Three specialized subagents: Plan (blocking) → Backend + Frontend (parallel).

## Model assignment (fixed)

| Role | Model | Slug |
|------|-------|------|
| **Plan** | Opus 4.6 high | `claude-4.6-opus-high-thinking` |
| **Backend** | Composer 2.5 fast | `composer-2.5-fast` |
| **Frontend** | Sonnet 4.6 high | `claude-4.6-sonnet-high-thinking` |

## Step 1 — Extract feature name and requirements

From the user request, identify:
- `FEATURE_NAME`: plan filename slug (e.g. `password-reset`)
- `REQUIREMENTS`: user request + relevant context from open files

## Step 2 — Spawn Planning Agent (blocking)

```
Task(
  description: "Plan: <FEATURE_NAME>",
  model: "claude-4.6-opus-high-thinking",
  subagent_type: "generalPurpose",
  run_in_background: false,
  prompt: """
    You are writing a feature plan for the project-itviec monorepo.
    Stack: Spring Boot 3 / Java 17 backend (port 8081), React 19 / Vite / TypeScript / Ant Design frontend (port 5173).
    API contract: /api/v1/*, ApiResponse<T> with code:1000, cookies JWT, withCredentials.
    
    Feature: <REQUIREMENTS>
    
    Read existing related code before designing.
    Write the plan to docs/<FEATURE_NAME>-plan.md with sections:
    - Summary
    - Backend (entities, repos, services, controllers, DTOs, error codes, security config, configs)
    - Frontend (types, API service, pages/components, routes, i18n keys)
    - Verification (unit tests, integration tests, manual checklist)
    
    Be precise: include package paths, class names, method signatures, SQL equivalents.
    Return: the absolute path of the plan file you wrote.
  """
)
```

Wait for completion. Read the plan path from the result.

## Step 3 — Spawn Backend + Frontend agents in parallel

Send **one message** with **two Task tool calls** simultaneously:

**Backend agent (Composer 2.5 fast):**
```
Task(
  description: "Backend: <FEATURE_NAME>",
  model: "composer-2.5-fast",
  subagent_type: "generalPurpose",
  run_in_background: true,
  prompt: """
    Implement ONLY the backend portion of this plan:
    <full plan contents or path to docs/<FEATURE_NAME>-plan.md>
    
    Project: F:/CODE/Project/project-itviec/it-viec-backend
    - Read relevant existing files before editing.
    - Follow existing patterns: AppException(ErrorCode), ApiResponse builder, @Transactional, Lombok.
    - Do NOT touch frontend files.
    - Run ./mvnw test or targeted test class when done.
  """
)
```

**Frontend agent (Sonnet 4.6 high):**
```
Task(
  description: "Frontend: <FEATURE_NAME>",
  model: "claude-4.6-sonnet-high-thinking",
  subagent_type: "generalPurpose",
  run_in_background: true,
  prompt: """
    Implement ONLY the frontend portion of this plan:
    <full plan contents or path to docs/<FEATURE_NAME>-plan.md>
    
    Project: F:/CODE/Project/project-itviec/it-viec-frontend
    - Read existing related files before editing.
    - API calls through src/services/*Api.ts using apiClient (withCredentials).
    - Types in src/types/request.types.ts and response.types.ts.
    - i18n keys in public/locales/{vi,en}/*.json.
    - Do NOT touch backend files.
    - Run npm run type-check when done.
  """
)
```

## Parallel vs Sequential guidance

| Situation | Use |
|-----------|-----|
| Backend and frontend loosely coupled | Parallel (default) |
| Frontend depends on exact backend DTO names | Sequential: backend first, then frontend |
| Unsure | Parallel — both read the same plan doc |

## Step 4 — Report to user

After both background agents complete, summarize:
- Plan: `docs/<FEATURE_NAME>-plan.md`
- Backend: files created/edited
- Frontend: files created/edited
- Verify: `./mvnw test`, `npm run type-check`
