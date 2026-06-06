# Search Suggestions And Popular Tags Plan

## Summary

Implement popular search tags, backend-powered job search, and shared frontend suggestion behavior for Home/Search pages.

Chosen decisions:

- Public tag API returns `category`, `name`, plus redirect-safe metadata.
- Public job search uses a new `GET /api/v1/jobs/search` endpoint.

## API And Backend Changes

- Add `popular_tags` backend model with admin-managed entries sourced from either `Skill` or `Company`.
- Add endpoints:
  - `GET /api/v1/tag/popular`: public, returns:
    ```json
    {
      "id": 1,
      "category": "Skill and Expertise",
      "name": "Power Automate",
      "sourceId": "48",
      "companySlug": null
    }
    ```
    Company tags return `companySlug` for redirect.
  - `POST /api/v1/tag/popular`: admin only, body:
    ```json
    { "category": "Skill and Expertise", "sourceId": "48" }
    ```
    For company, `sourceId` is the company UUID.
  - `DELETE /api/v1/tag/popular/{id}`: admin only.
  - `GET /api/v1/admin/companies/options`: admin only, returns company `id`, `companyName`, and `slug` for select options.
  - `GET /api/v1/jobs/search`: public, params `page`, `size`, `keyword`, `cityId`, `jobType`, `experienceLevel`.

- Job search behavior:
  - Always search only active jobs.
  - Blank keyword means all jobs.
  - Keyword matches job title OR company name OR skill name.
  - `cityId`, `jobType`, and `experienceLevel` are AND filters.
  - Use `distinct` when joining skills to avoid duplicate jobs.

- Fix frontend/backend slug contract mismatch by changing frontend job slug calls to `/api/v1/jobs/slug/{slug}`.

## Frontend Changes

- Add frontend API/types for popular tags, company options, and job search params/results.
- Create a reusable search input/suggestion component used by:
  - `SearchFormHome`
  - `pages/Shared/JobSearch`
- Suggestion behavior:
  - Fetch `/tag/popular`.
  - Filter as user types.
  - Group results by `Skill and Expertise` and `Company`, matching the provided UI.
  - Selecting a company redirects to `/nha-tuyen-dung/{companySlug}`.
  - Selecting a skill fills the keyword and searches jobs with the current selected city.
- Home search:
  - Blank keyword and "all cities" navigates to `/viec-lam-it`.
  - Normal search redirects to the search page.
- Search page:
  - Replace client-side filtering of `getAllJobsApi(0, 100)` with `searchJobsApi`.
  - Add filter selects for `experienceLevel` and `jobType`.
  - Changing filters calls search again with current keyword/city.
  - Pressing Search resets filters before calling search.
- Route behavior:
  - `/viec-lam-it/{slug}` first checks job slug.
  - If slug exists, render job detail.
  - If slug does not exist, render search page and fill keyword by converting slug-like text from hyphen to spaces.
  - If single path segment matches a city name, treat it as city-only search.

## Admin UI Changes

- Add admin page `/admin/popular-tags`.
- Add sidebar menu item "Popular Tags".
- Page loads skills, company options, and current popular tags.
- Admin can:
  - Choose category: `Skill and Expertise` or `Company`.
  - Choose source item from skill/company select.
  - Add tag.
  - Delete tag from table.
- Use existing admin Ant Design table/card/toolbar style and add i18n keys to `public/locales/vi/admin.json` and `public/locales/en/admin.json`.

## Test Plan

- Backend:
  - Unit test popular tag create/list/delete for skill and company.
  - Test duplicate tag rejection.
  - Test company options returns id/name/slug.
  - Test `/jobs/search` keyword behavior for title/company/skill and filters for city/jobType/experienceLevel.
  - Run `.\mvnw.cmd test` or smallest targeted Maven tests.
- Frontend:
  - Run `npm run type-check`.
  - Run `npm run build`.
  - Manually verify Home and Search suggestion flows, company redirect, skill search, invalid slug fallback, and filter reset behavior.

## Assumptions

- Category response labels stay exactly `Skill and Expertise` and `Company`.
- `sourceId` is a string in the API because skill IDs are numeric and company IDs are UUID strings.
- `GET /api/v1/skills` already satisfies admin skill selection.
- Backend keeps `ddl-auto: update`, so the new table is created by JPA like the rest of the project.
