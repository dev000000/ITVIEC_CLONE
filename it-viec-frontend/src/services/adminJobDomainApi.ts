import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import type { APIResponse, JobDomainAdminResponse, PageResponse } from "@/types/response.types";
import type {
  GetAdminJobDomainsParams,
  JobDomainCreateRequest,
  JobDomainUpdateRequest,
} from "@/types/request.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/admin/job-domains";

export const getAdminJobDomainsApi = (params?: GetAdminJobDomainsParams) => {
  return apiClient.get<APIResponse<PageResponse<JobDomainAdminResponse>>>(API_PATH, { params });
};

export const createJobDomainAdminApi = (request: JobDomainCreateRequest) => {
  return apiClient.post<APIResponse<JobDomainAdminResponse>>(API_PATH, request);
};

export const updateJobDomainAdminApi = (id: number, request: JobDomainUpdateRequest) => {
  return apiClient.patch<APIResponse<JobDomainAdminResponse>>(`${API_PATH}/${id}`, request);
};

export const deprecateJobDomainAdminApi = (id: number) => {
  return apiClient.delete<APIResponse<JobDomainAdminResponse>>(`${API_PATH}/${id}`);
};

export const restoreJobDomainAdminApi = (id: number) => {
  return apiClient.patch<APIResponse<JobDomainAdminResponse>>(`${API_PATH}/${id}/restore`);
};

export default {
  getAdminJobDomainsApi,
  createJobDomainAdminApi,
  updateJobDomainAdminApi,
  deprecateJobDomainAdminApi,
  restoreJobDomainAdminApi,
};
