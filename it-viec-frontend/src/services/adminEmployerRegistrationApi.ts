import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import type { EmployerRegistrationResponse, APIResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/admin/employer-registrations";

export const getPendingEmployerRegistrationsApi = () => {
  return apiClient.get<APIResponse<EmployerRegistrationResponse[]>>(API_PATH);
};

export const approveEmployerRegistrationApi = (userId: string) => {
  return apiClient.post<APIResponse<string>>(`${API_PATH}/${userId}/approve`);
};

export const rejectEmployerRegistrationApi = (userId: string, reason?: string) => {
  return apiClient.post<APIResponse<string>>(`${API_PATH}/${userId}/reject`, null, {
    params: reason ? { reason } : undefined,
  });
};

export default {
  getPendingEmployerRegistrationsApi,
  approveEmployerRegistrationApi,
  rejectEmployerRegistrationApi,
};
