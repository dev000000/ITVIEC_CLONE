import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import type {
  APIResponse,
  MergeSkillResponse,
  PageResponse,
  SkillAdminResponse,
} from "@/types/response.types";
import type {
  GetAdminSkillsParams,
  SkillCreateRequest,
  SkillMergeRequest,
  SkillUpdateRequest,
} from "@/types/request.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/admin/skills";

export const getAdminSkillsApi = (params?: GetAdminSkillsParams) => {
  return apiClient.get<APIResponse<PageResponse<SkillAdminResponse>>>(API_PATH, { params });
};

export const createSkillAdminApi = (request: SkillCreateRequest) => {
  return apiClient.post<APIResponse<SkillAdminResponse>>(API_PATH, request);
};

export const updateSkillAdminApi = (id: number, request: SkillUpdateRequest) => {
  return apiClient.patch<APIResponse<SkillAdminResponse>>(`${API_PATH}/${id}`, request);
};

export const deprecateSkillAdminApi = (id: number) => {
  return apiClient.delete<APIResponse<SkillAdminResponse>>(`${API_PATH}/${id}`);
};

export const mergeSkillAdminApi = (id: number, request: SkillMergeRequest) => {
  return apiClient.post<APIResponse<MergeSkillResponse>>(`${API_PATH}/${id}/merge`, request);
};

export const restoreSkillAdminApi = (id: number) => {
  return apiClient.patch<APIResponse<SkillAdminResponse>>(`${API_PATH}/${id}/restore`);
};

export default {
  getAdminSkillsApi,
  createSkillAdminApi,
  updateSkillAdminApi,
  deprecateSkillAdminApi,
  mergeSkillAdminApi,
  restoreSkillAdminApi,
};
