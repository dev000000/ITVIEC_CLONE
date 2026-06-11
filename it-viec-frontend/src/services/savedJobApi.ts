import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import type { GetSavedJobsParams } from "@/types/request.types";
import type {
  APIResponse,
  PageResponse,
  SavedJobResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/seekers/me/saved-jobs";

/**
 * Lưu việc làm vào danh sách yêu thích.
 * @param jobId - ID của công việc
 */
export const saveJobApi = (jobId: number) => {
  return apiClient.post<APIResponse<SavedJobResponse>>(`${API_PATH}/${jobId}`);
};

/**
 * Bỏ lưu việc làm.
 * @param jobId - ID của công việc
 */
export const unsaveJobApi = (jobId: number) => {
  return apiClient.delete<APIResponse<void>>(`${API_PATH}/${jobId}`);
};

/**
 * Lấy danh sách việc làm đã lưu (phân trang, sắp xếp theo expiresAt).
 */
export const getMySavedJobsApi = (params?: GetSavedJobsParams) => {
  return apiClient.get<APIResponse<PageResponse<SavedJobResponse>>>(API_PATH, {
    params,
  });
};

/**
 * Lấy danh sách job ID đã lưu (dùng để hydrate store).
 */
export const getMySavedJobIdsApi = () => {
  return apiClient.get<APIResponse<number[]>>(`${API_PATH}/ids`);
};

export default {
  saveJobApi,
  unsaveJobApi,
  getMySavedJobsApi,
  getMySavedJobIdsApi,
};
