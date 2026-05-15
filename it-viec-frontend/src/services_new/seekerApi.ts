import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import { type SeekerUpdateRequest } from "@/types/request.types";
import { type SeekerResponse, type APIResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/seekers";

/**
 * Lấy danh sách tất cả người tìm việc trong hệ thống (Quyền Admin).
 * @returns Promise giải quyết thành `APIResponse<SeekerResponse[]>`
 */
export const getAllSeekersApi = () => {
  const url = API_PATH;
  return apiClient.get<APIResponse<SeekerResponse[]>>(url);
};

/**
 * Lấy thông tin profile của người tìm việc hiện tại (dựa vào cookie).
 * @returns Promise giải quyết thành `APIResponse<SeekerResponse>`
 */
export const getMyProfileApi = () => {
  const url = API_PATH + "/me";
  return apiClient.get<APIResponse<SeekerResponse>>(url);
};

/**
 * Cập nhật thông tin profile của người tìm việc hiện tại.
 * @param request - Đối tượng chứa thông tin cập nhật: `SeekerUpdateRequest`
 * @returns Promise giải quyết thành `APIResponse<SeekerResponse>`
 */
export const updateMyProfileApi = (request: SeekerUpdateRequest) => {
  const url = API_PATH + "/me";
  return apiClient.put<APIResponse<SeekerResponse>>(url, request);
};

/**
 * Lấy thông tin chi tiết của một người tìm việc theo ID (Quyền Admin).
 * @param id - ID của người tìm việc
 * @returns Promise giải quyết thành `APIResponse<SeekerResponse>`
 */
export const getSeekerByIdApi = (id: string) => {
  const url = API_PATH + `/${id}`;
  return apiClient.get<APIResponse<SeekerResponse>>(url);
};

export default {
  getAllSeekersApi,
  getMyProfileApi,
  updateMyProfileApi,
  getSeekerByIdApi,
};
