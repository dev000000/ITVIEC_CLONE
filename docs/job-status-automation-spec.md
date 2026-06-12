# itviec — Job status automation spec (reference)

Source: user-provided `itviec-job-status-spec.md`. Pre-fix applied: public seeker APIs now filter `ACTIVE` + `posted_at <= NOW()` + `(expires_at IS NULL OR expires_at > NOW())`.

## Gap analysis vs codebase (before full implementation)

| Area | Spec | Current (partial) |
|------|------|-------------------|
| State machine | DRAFT→ACTIVE (publish), ACTIVE→CLOSED/EXPIRED, CLOSED/EXPIRED→ACTIVE (repost) | `updateJob` allows arbitrary status; delete sets CLOSED |
| Publish/Close/Repost APIs | PATCH `/jobs/{id}/publish`, `/close`, `/repost` | Not implemented |
| Visibility | Filter posted_at/expires_at for seekers | Fixed in search, getJobCards, getJobBySlug |
| Auto EXPIRED | Scheduled job Option B (hourly) | Not implemented |
| Schema | `published_at`, `closed_at`, indexes | Only `posted_at`, `expires_at` in schema |
| effective_status | Optional computed field | Not implemented |
| Tests | Unit + integration for transitions | Minimal coverage |
| Frontend | Employer publish/close/repost UX | Create/update with status in form only |

## Implementation checklist (for plan)

- Schema: `published_at`, `closed_at`, indexes `idx_jobs_status_expires`, `idx_jobs_status_posted`
- Endpoints: publish, close, repost with validation
- Scheduled task: `expireOverdueJobs(now)` hourly
- State machine guards in service layer
- Error codes + i18n messages
- Unit/integration tests
- Frontend: employer job actions + API integration
- Optional: admin manual expire endpoint, `effective_status` in responses
