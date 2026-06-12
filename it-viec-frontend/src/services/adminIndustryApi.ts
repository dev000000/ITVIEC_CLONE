import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import type { APIResponse, IndustryAdminResponse, PageResponse } from "@/types/response.types";
import type {
  GetAdminIndustriesParams,
  IndustryCreateRequest,
  IndustryUpdateRequest,
} from "@/types/request.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/admin/industries";

export const getAdminIndustriesApi = (params?: GetAdminIndustriesParams) => {
  return apiClient.get<APIResponse<PageResponse<IndustryAdminResponse>>>(API_PATH, { params });
};

export const createIndustryAdminApi = (request: IndustryCreateRequest) => {
  return apiClient.post<APIResponse<IndustryAdminResponse>>(API_PATH, request);
};

export const updateIndustryAdminApi = (id: number, request: IndustryUpdateRequest) => {
  return apiClient.patch<APIResponse<IndustryAdminResponse>>(`${API_PATH}/${id}`, request);
};

export const deprecateIndustryAdminApi = (id: number) => {
  return apiClient.delete<APIResponse<IndustryAdminResponse>>(`${API_PATH}/${id}`);
};

export const restoreIndustryAdminApi = (id: number) => {
  return apiClient.patch<APIResponse<IndustryAdminResponse>>(`${API_PATH}/${id}/restore`);
};

export default {
  getAdminIndustriesApi,
  createIndustryAdminApi,
  updateIndustryAdminApi,
  deprecateIndustryAdminApi,
  restoreIndustryAdminApi,
};
