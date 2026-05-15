import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import { type CompanyUpdateRequest } from "@/types/request.types";
import {
  type CompanyCardResponse,
  type CompanyDetailResponse,
  type APIResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/companies";

/**
 * Lấy toàn bộ danh sách công ty kèm số lượng job đang active (Hiển thị trang chủ).
 * @returns Promise giải quyết thành `APIResponse<CompanyCardResponse[]>`
 */
export const getAllCompaniesApi = () => {
  const url = API_PATH;
  return apiClient.get<APIResponse<CompanyCardResponse[]>>(url);
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

export default {
  getAllCompaniesApi,
  getCompanyBySlugApi,
  updateMyCompanyApi,
  getMyCompanyApi,
};
