import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import { type UserUpdateRequest } from "@/types/request.types";
import { type UserResponse, type APIResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/users";

/**
 * Lấy danh sách tất cả người dùng trong hệ thống (Quyền Admin).
 * @returns Promise giải quyết thành `APIResponse<UserResponse[]>`
 */
export const getUsersApi = () => {
  const url = API_PATH;
  return apiClient.get<APIResponse<UserResponse[]>>(url);
};

/**
 * Lấy thông tin chi tiết của một người dùng theo ID (Quyền Admin).
 * @param id - ID của người dùng
 * @returns Promise giải quyết thành `APIResponse<UserResponse>`
 */
export const getUserDetailApi = (id: string) => {
  const url = `${API_PATH}/${id}`;
  return apiClient.get<APIResponse<UserResponse>>(url);
};

/**
 * Cập nhật trạng thái người dùng (Khóa/Mở khóa tài khoản) (Quyền Admin).
 * @param id - ID của người dùng
 * @param request - Đối tượng chứa trạng thái mới: `UserUpdateRequest`
 * @returns Promise giải quyết thành `APIResponse<UserResponse>`
 */
export const updateUserStatusApi = (id: string, request: UserUpdateRequest) => {
  const url = `${API_PATH}/${id}`;
  return apiClient.patch<APIResponse<UserResponse>>(url, request);
};

export default {
  getUsersApi,
  getUserDetailApi,
  updateUserStatusApi,
};
