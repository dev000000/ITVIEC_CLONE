# Salary Range Filter — Plan

## Summary

Replace free-text `salary VARCHAR(100)` with structured fields so jobs can be filtered by numeric range in VND or USD. Display is locale-aware; employer can leave salary empty → "Thương lượng" (negotiable).

## Data model

| Column | Type | Notes |
|--------|------|-------|
| `salary_min` | BIGINT NULL | Lower bound |
| `salary_max` | BIGINT NULL | Upper bound |
| `salary_currency` | ENUM('VND','USD') NULL | Required when not negotiable |
| `salary_negotiable` | BOOLEAN DEFAULT FALSE | When true, min/max/currency null |
| `salary` | VARCHAR(100) NULL | Legacy display fallback (deprecated) |

## Backend

- `SalaryCurrency` enum: VND, USD
- `Job` entity + `JobCreateRequest` / `JobUpdateRequest`: structured salary fields; remove `@NotBlank` on `salary`
- `JobCardResponse` / `JobDetailResponse`: expose structured fields
- `JobServiceImpl`: validate range (min ≤ max); search overlap filter by currency
- `GET /api/v1/jobs/search`: `salaryMin`, `salaryMax`, `salaryCurrency` query params

Search overlap: `job.salaryMax >= filterMin AND job.salaryMin <= filterMax AND job.salaryCurrency = filterCurrency AND salaryNegotiable = false`

## Frontend

- `formatJobSalary()` — VND compact `10m-20m` for round millions; full `10.000.000 - 20.000.000 VND`; USD `1,000 - 2,000$`
- `SalaryFormFields` — employer create/edit: negotiable checkbox + currency + min/max
- `SalaryRangeFilter` — search popover with Slider; currency from i18n (`vi` → VND, `en` → USD)
- Update all `job.salary` display sites to use formatter

## Migration

Hibernate `ddl-auto: update` adds columns. For existing rows run optional backfill or treat legacy `salary` text as fallback display.

```sql
ALTER TABLE jobs
  ADD COLUMN salary_min BIGINT NULL,
  ADD COLUMN salary_max BIGINT NULL,
  ADD COLUMN salary_currency ENUM('VND','USD') NULL,
  ADD COLUMN salary_negotiable BOOLEAN NOT NULL DEFAULT FALSE;
```
