import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import {
  type CompanyUpdateRequest,
  type GetAdminCompaniesParams,
} from "@/types/request.types";
import {
  type CompanyBriefResponse,
  type CompanyCardResponse,
  type CompanyDetailResponse,
  type CompanyOptionResponse,
  type APIResponse,
  type PageResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/companies";

/**
 * Lấy danh sách công ty kèm số lượng job đang active có phân trang (Hiển thị trang chủ).
 * @param page - Chỉ mục trang (mặc định 0)
 * @param size - Kích thước trang (mặc định 10)
 * @returns Promise giải quyết thành `APIResponse<PageResponse<CompanyCardResponse>>`
 */
export const getAllCompaniesApi = (page: number = 0, size: number = 10) => {
  const url = API_PATH;
  return apiClient.get<APIResponse<PageResponse<CompanyCardResponse>>>(url, {
    params: { page, size },
  });
};

export const getAdminCompaniesApi = (params?: GetAdminCompaniesParams) => {
  const url = `${Configs.API_ENDPOINT}/api/v1/admin/companies`;
  return apiClient.get<APIResponse<PageResponse<CompanyBriefResponse>>>(url, {
    params,
  });
};

export const getAdminCompanyOptionsApi = () => {
  const url = `${Configs.API_ENDPOINT}/api/v1/admin/companies/options`;
  return apiClient.get<APIResponse<CompanyOptionResponse[]>>(url);
};

/**
 * Lấy thông tin chi tiết của công ty theo slug (bao gồm các job đang active).
 * @param slug - Slug của công ty
 * @returns Promise giải quyết thành `APIResponse<CompanyDetailResponse>`
 */
export const getCompanyBySlugApi = (slug: string) => {
  const url = `${API_PATH}/slug/${slug}`;
  return apiClient.get<APIResponse<CompanyDetailResponse>>(url);
};

/**
 * Cập nhật thông tin công ty của nhà tuyển dụng hiện tại.
 * @param request - Đối tượng chứa thông tin cập nhật: `CompanyUpdateRequest`
 * @returns Promise giải quyết thành `APIResponse<CompanyDetailResponse>`
 */
export const updateMyCompanyApi = (request: CompanyUpdateRequest) => {
  const url = `${API_PATH}/me`;
  return apiClient.put<APIResponse<CompanyDetailResponse>>(url, request);
};

/**
 * Lấy thông tin công ty của nhà tuyển dụng hiện tại.
 * @returns Promise giải quyết thành `APIResponse<CompanyDetailResponse>`
 */
export const getMyCompanyApi = () => {
  const url = `${API_PATH}/me`;
  return apiClient.get<APIResponse<CompanyDetailResponse>>(url);
};

/**
 * Tải lên logo công ty của nhà tuyển dụng hiện tại.
 * Gửi file ảnh dưới dạng `multipart/form-data` với field name `file`.
 * @param file - File ảnh logo cần upload
 * @returns Promise giải quyết thành `APIResponse<CompanyDetailResponse>` với thông tin công ty đã cập nhật logo
 */
export const uploadMyCompanyLogoApi = (file: File) => {
  const url = `${API_PATH}/me/logo`;
  const formData = new FormData();
  formData.append("file", file);
  return apiClient.put<APIResponse<CompanyDetailResponse>>(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * Xóa logo công ty của nhà tuyển dụng hiện tại.
 * @returns Promise giải quyết thành `APIResponse<CompanyDetailResponse>` với thông tin công ty sau khi xóa logo
 */
export const deleteMyCompanyLogoApi = () => {
  const url = `${API_PATH}/me/logo`;
  return apiClient.delete<APIResponse<CompanyDetailResponse>>(url);
};

export default {
  getAllCompaniesApi,
  getAdminCompaniesApi,
  getAdminCompanyOptionsApi,
  getCompanyBySlugApi,
  updateMyCompanyApi,
  getMyCompanyApi,
  uploadMyCompanyLogoApi,
  deleteMyCompanyLogoApi,
};
