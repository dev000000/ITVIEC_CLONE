import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import { type EmployerUpdateRequest } from "@/types/request.types";
import {
  type EmployerResponse,
  type APIResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/employers";

/**
 * Lấy thông tin profile của nhà tuyển dụng hiện tại (dựa vào cookie).
 * @returns Promise giải quyết thành `APIResponse<EmployerResponse>`
 */
export const getMyEmployerProfileApi = () => {
  const url = API_PATH + "/me";
  return apiClient.get<APIResponse<EmployerResponse>>(url);
};

/**
 * Cập nhật thông tin profile của nhà tuyển dụng hiện tại.
 * @param request - Đối tượng chứa thông tin cập nhật: `EmployerUpdateRequest`
 * @returns Promise giải quyết thành `APIResponse<EmployerResponse>`
 */
export const updateMyEmployerProfileApi = (request: EmployerUpdateRequest) => {
  const url = API_PATH + "/me";
  return apiClient.put<APIResponse<EmployerResponse>>(url, request);
};

/**
 * Lấy danh sách tất cả nhà tuyển dụng trong hệ thống (Quyền Admin).
 * @returns Promise giải quyết thành `APIResponse<EmployerResponse[]>`
 */
export const getAllEmployersApi = () => {
  const url = API_PATH;
  return apiClient.get<APIResponse<EmployerResponse[]>>(url);
};

/**
 * Lấy thông tin chi tiết của một nhà tuyển dụng theo ID (Quyền Admin).
 * @param id - ID của nhà tuyển dụng
 * @returns Promise giải quyết thành `APIResponse<EmployerResponse>`
 */
export const getEmployerByIdApi = (id: string) => {
  const url = API_PATH + `/${id}`;
  return apiClient.get<APIResponse<EmployerResponse>>(url);
};

export default {
  getMyEmployerProfileApi,
  updateMyEmployerProfileApi,
  getAllEmployersApi,
  getEmployerByIdApi,
};
