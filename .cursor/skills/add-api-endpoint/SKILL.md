---
name: add-api-endpoint
description: Add a REST endpoint across Spring Boot backend, frontend service, and types. Use when adding API, endpoint, DTO, controller, or integrating frontend with backend.
---

# Add API Endpoint

## Checklist

```
- [ ] Backend: Request DTO (dto/request)
- [ ] Backend: Response DTO (dto/response) if needed
- [ ] Backend: Service method (+ impl)
- [ ] Backend: Mapper if entity involved
- [ ] Backend: Controller endpoint under /api/v1
- [ ] Frontend: types in request.types.ts / response.types.ts
- [ ] Frontend: function in src/services/*Api.ts
- [ ] Mock: database/database.json (only if local json-server dev)
- [ ] Verify: backend test + npm run type-check in frontend
```

## Backend template

```java
@PostMapping("/resource")
public ApiResponse<ResourceResponse> create(
        @RequestBody @Valid ResourceCreateRequest request) {
    ResourceResponse result = resourceService.create(request);
    return ApiResponse.<ResourceResponse>builder()
            .code(1000)
            .result(result)
            .build();
}
```

## Frontend template

```typescript
export const createResourceApi = (request: ResourceCreateRequest) => {
  const url = Configs.API_ENDPOINT + "/api/v1/resource";
  return apiClient.post<APIResponse<ResourceResponse>>(url, request);
};
```

## Response access in pages

```typescript
const res = await createResourceApi(payload);
const data = res.data.result;
```

## Reference files

- Controller: `it-viec-backend/.../controller/AuthenticationController.java`
- Service: `it-viec-frontend/src/services/authApi.ts`
- Types: `it-viec-frontend/src/types/response.types.ts`
