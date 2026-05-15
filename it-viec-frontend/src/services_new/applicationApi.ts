import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import {
  type ApplicationRequest,
  type ApplicationUpdateRequest,
} from "@/types/request.types";
import {
  type ApplicationCreateResponse,
  type ApplicationResponse,
  type APIResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1";

/**
 * Nộp đơn ứng tuyển cho một công việc cụ thể (Người tìm việc).
 * @param jobId - ID của công việc
 * @param request - Đối tượng chứa thông tin ứng tuyển: `ApplicationRequest`
 * @returns Promise giải quyết thành `APIResponse<ApplicationCreateResponse>`
 */
export const applyToJobApi = (jobId: number, request: ApplicationRequest) => {
  const url = API_PATH + `/jobs/${jobId}/applications`;
  return apiClient.post<APIResponse<ApplicationCreateResponse>>(url, request);
};

/**
 * Lấy danh sách đơn ứng tuyển của người tìm việc hiện tại.
 * @returns Promise giải quyết thành `APIResponse<ApplicationResponse[]>`
 */
export const getMyApplicationsApi = () => {
  const url = API_PATH + "/seekers/me/applications";
  return apiClient.get<APIResponse<ApplicationResponse[]>>(url);
};

/**
 * Lấy danh sách tất cả đơn ứng tuyển của công ty hiện tại (Nhà tuyển dụng).
 * @returns Promise giải quyết thành `APIResponse<ApplicationResponse[]>`
 */
export const getMyCompanyApplicationsApi = () => {
  const url = API_PATH + "/companies/me/applications";
  return apiClient.get<APIResponse<ApplicationResponse[]>>(url);
};

/**
 * Cập nhật trạng thái đơn ứng tuyển (Nhà tuyển dụng).
 * @param id - ID của đơn ứng tuyển
 * @param request - Đối tượng chứa trạng thái mới: `ApplicationUpdateRequest`
 * @returns Promise giải quyết thành `APIResponse<ApplicationResponse>`
 */
export const updateApplicationStatusApi = (
  id: string,
  request: ApplicationUpdateRequest,
) => {
  const url = API_PATH + `/companies/me/applications/${id}`;
  return apiClient.patch<APIResponse<ApplicationResponse>>(url, request);
};

/**
 * Xem chi tiết một đơn ứng tuyển (Nhà tuyển dụng).
 * @param id - ID của đơn ứng tuyển
 * @returns Promise giải quyết thành `APIResponse<ApplicationResponse>`
 */
export const getApplicationByIdApi = (id: string) => {
  const url = API_PATH + `/companies/me/applications/${id}`;
  return apiClient.get<APIResponse<ApplicationResponse>>(url);
};

/**
 * Lấy toàn bộ danh sách đơn ứng tuyển trong hệ thống (Quyền Admin).
 * @returns Promise giải quyết thành `APIResponse<ApplicationResponse[]>`
 */
export const getAllApplicationsApi = () => {
  const url = API_PATH + "/applications";
  return apiClient.get<APIResponse<ApplicationResponse[]>>(url);
};

/**
 * Xem chi tiết một đơn ứng tuyển của bản thân (Người tìm việc).
 * @param id - ID của đơn ứng tuyển
 * @returns Promise giải quyết thành `APIResponse<ApplicationResponse>`
 */
export const getMyApplicationByIdApi = (id: string) => {
  const url = API_PATH + `/seekers/me/applications/${id}`;
  return apiClient.get<APIResponse<ApplicationResponse>>(url);
};

/**
 * Lấy danh sách đơn ứng tuyển của một công việc cụ thể thuộc công ty hiện tại.
 * @param jobId - ID của công việc
 * @returns Promise giải quyết thành `APIResponse<ApplicationResponse[]>`
 */
export const getApplicationsByJobIdApi = (jobId: number) => {
  const url = API_PATH + `/companies/me/jobs/${jobId}/applications`;
  return apiClient.get<APIResponse<ApplicationResponse[]>>(url);
};

export default {
  applyToJobApi,
  getMyApplicationsApi,
  getMyCompanyApplicationsApi,
  updateApplicationStatusApi,
  getApplicationByIdApi,
  getAllApplicationsApi,
  getMyApplicationByIdApi,
  getApplicationsByJobIdApi,
};
