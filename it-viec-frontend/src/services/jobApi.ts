import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import {
  type JobCreateRequest,
  type JobUpdateRequest,
} from "@/types/request.types";
import {
  type JobCardResponse,
  type JobDetailResponse,
  type PageResponse,
  type APIResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1";

/**
 * Lấy danh sách công việc đang active có phân trang (Hiển thị trang chủ/tìm kiếm).
 * @param page - Chỉ mục trang (mặc định 0)
 * @param size - Kích thước trang (mặc định 10)
 * @returns Promise giải quyết thành `APIResponse<PageResponse<JobCardResponse>>`
 */
export const getAllJobsApi = (page: number = 0, size: number = 10) => {
  const url = `${API_PATH}/jobs`;
  return apiClient.get<APIResponse<PageResponse<JobCardResponse>>>(url, {
    params: { page, size },
  });
};

/**
 * Lấy thông tin chi tiết công việc theo slug (Công việc phải đang active).
 * @param slug - Slug của công việc
 * @returns Promise giải quyết thành `APIResponse<JobDetailResponse>`
 */
export const getJobBySlugApi = (slug: string) => {
  const url = `${API_PATH}/jobs/${slug}`;
  return apiClient.get<APIResponse<JobDetailResponse>>(url);
};

/**
 * Lấy toàn bộ công việc của công ty hiện tại (bất kể trạng thái).
 * @returns Promise giải quyết thành `APIResponse<JobDetailResponse[]>`
 */
export const getMyJobsApi = () => {
  const url = `${API_PATH}/companies/me/jobs`;
  return apiClient.get<APIResponse<JobDetailResponse[]>>(url);
};

/**
 * Tạo mới một công việc cho công ty hiện tại.
 * @param request - Đối tượng chứa thông tin công việc: `JobCreateRequest`
 * @returns Promise giải quyết thành `APIResponse<JobDetailResponse>`
 */
export const createJobApi = (request: JobCreateRequest) => {
  const url = `${API_PATH}/jobs`;
  return apiClient.post<APIResponse<JobDetailResponse>>(url, request);
};

/**
 * Cập nhật thông tin công việc của công ty hiện tại.
 * @param id - ID của công việc
 * @param request - Đối tượng chứa thông tin cập nhật: `JobUpdateRequest`
 * @returns Promise giải quyết thành `APIResponse<JobDetailResponse>`
 */
export const updateJobApi = (
  id: number | string,
  request: JobUpdateRequest,
) => {
  const url = `${API_PATH}/companies/me/jobs/${id}`;
  return apiClient.put<APIResponse<JobDetailResponse>>(url, request);
};

/**
 * Xóa mềm (soft delete) một công việc của công ty hiện tại.
 * @param id - ID của công việc
 * @returns Promise giải quyết thành `APIResponse<void>`
 */
export const deleteJobApi = (id: number | string) => {
  const url = `${API_PATH}/companies/me/jobs/${id}`;
  return apiClient.delete<APIResponse<void>>(url);
};

export default {
  getAllJobsApi,
  getJobBySlugApi,
  getMyJobsApi,
  createJobApi,
  updateJobApi,
  deleteJobApi,
};
