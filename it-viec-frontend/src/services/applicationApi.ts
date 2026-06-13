import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import {
  type ApplicationRequest,
  type ApplicationUpdateRequest,
  type GetMyCompanyApplicationsParams,
} from "@/types/request.types";
import {
  type ApplicationCheckResponse,
  type ApplicationCreateResponse,
  type ApplicationResponse,
  type APIResponse,
  type PageResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1";

/**
 * Nộp đơn ứng tuyển cho một công việc cụ thể (Người tìm việc).
 * @param jobId - ID của công việc
 * @param request - Đối tượng chứa thông tin ứng tuyển: `ApplicationRequest`
 * @param options - CV đính kèm: `cvFile` (upload mới) hoặc `cvId` (chọn CV có sẵn)
 * @returns Promise giải quyết thành `APIResponse<ApplicationCreateResponse>`
 */
export const applyToJobApi = (
  jobId: number,
  request: ApplicationRequest,
  options?: { cvFile?: File | null; cvId?: string | null },
) => {
  const url = API_PATH + `/jobs/${jobId}/applications`;
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify(request)], { type: "application/json" }),
  );

  if (options?.cvFile) {
    formData.append("cvFile", options.cvFile);
  } else if (options?.cvId) {
    formData.append("cvId", options.cvId);
  }

  return apiClient.post<APIResponse<ApplicationCreateResponse>>(url, formData);
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
 * Kiểm tra người tìm việc hiện tại đã ứng tuyển công việc này chưa.
 * @param jobId - ID của công việc
 * @returns Promise giải quyết thành `APIResponse<ApplicationCheckResponse>`
 */
export const checkMyApplicationExistsApi = (jobId: number) => {
  const url = API_PATH + "/seekers/me/applications/check";
  return apiClient.get<APIResponse<ApplicationCheckResponse>>(url, {
    params: { jobId },
  });
};

/**
 * Lấy danh sách tất cả đơn ứng tuyển của công ty hiện tại (Nhà tuyển dụng).
 * @returns Promise giải quyết thành `APIResponse<ApplicationResponse[]>`
 */
export const getMyCompanyApplicationsApi = (
  params?: GetMyCompanyApplicationsParams,
) => {
  const url = API_PATH + "/companies/me/applications";
  return apiClient.get<APIResponse<PageResponse<ApplicationResponse>>>(url, {
    params,
  });
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

/**
 * Trả về URL preview/download CV từ resumePreviewUrl (relative path từ API).
 * Dùng cho Employer/Admin (truy cập qua /api/v1/cv-files/{id}/preview).
 */
export const getResumeFullUrl = (resumePreviewUrl: string) => {
  if (!resumePreviewUrl) return "";
  if (resumePreviewUrl.startsWith("http")) return resumePreviewUrl;
  return Configs.API_ENDPOINT + resumePreviewUrl;
};

/**
 * Trả về URL download CV (attachment) từ cvFileId.
 * Dùng cho Employer/Admin.
 */
export const getCvFileDownloadUrl = (cvFileId: string) => {
  return `${API_PATH}/cv-files/${cvFileId}`;
};

/**
 * Trả về URL preview CV (inline PDF) từ cvFileId.
 * Dùng cho Employer/Admin khi chỉ có `cvFileId` mà không có `resumePreviewUrl`.
 */
export const getCvFilePreviewUrl = (cvFileId: string) => {
  return `${API_PATH}/cv-files/${cvFileId}/preview`;
};

/**
 * Trích `cvFileId` từ `resumeUrl` cũ dạng `.../api/v1/cv-files/{id}`.
 * Backend lưu `resumeUrl` qua `buildCvUrl(cvFileId)` nên luôn có pattern này
 * đối với đơn ứng tuyển mới. Trả về null nếu không match.
 */
export const extractCvFileIdFromResumeUrl = (resumeUrl?: string | null): string | null => {
  if (!resumeUrl) return null;
  const match = resumeUrl.match(/\/cv-files\/([^/?#]+)(?:\/preview)?$/);
  return match ? match[1] : null;
};

/**
 * Trả về URL preview CV trong đơn ứng tuyển của seeker.
 * Dùng cho Seeker xem CV mình đã nộp (PDF inline).
 */
export const getMyApplicationCvPreviewUrl = (applicationId: string) => {
  return `${API_PATH}/seekers/me/applications/${applicationId}/cv/preview`;
};

/**
 * Trả về URL download CV trong đơn ứng tuyển của seeker.
 * Dùng cho Seeker tải về CV đã nộp (Word/doc attachment).
 */
export const getMyApplicationCvDownloadUrl = (applicationId: string) => {
  return `${API_PATH}/seekers/me/applications/${applicationId}/cv/download`;
};

/**
 * Kiểm tra URL/filename có phải file PDF không.
 */
export const isPdfFile = (fileNameOrUrl: string) => {
  return /\.pdf($|\?)/i.test(fileNameOrUrl);
};

export default {
  applyToJobApi,
  getMyApplicationsApi,
  checkMyApplicationExistsApi,
  getMyCompanyApplicationsApi,
  updateApplicationStatusApi,
  getApplicationByIdApi,
  getAllApplicationsApi,
  getMyApplicationByIdApi,
  getApplicationsByJobIdApi,
};
