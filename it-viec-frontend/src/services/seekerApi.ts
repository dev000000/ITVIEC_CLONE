import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import {
  type SeekerUpdateRequest,
  type SeekerCoverLetterUpdateRequest,
  type SeekerBasicInfoUpdateRequest,
  type SeekerPersonalInfoUpdateRequest,
} from "@/types/request.types";
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
 * Form 1: Chỉ cập nhật cover letter của seeker hiện tại.
 * @param request - { coverLetter: string }
 * @returns Promise giải quyết thành `APIResponse<SeekerResponse>`
 */
export const updateMyCoverLetterApi = (request: SeekerCoverLetterUpdateRequest) => {
  const url = API_PATH + "/me/cover-letter";
  return apiClient.patch<APIResponse<SeekerResponse>>(url, request);
};

/**
 * Form 2: Cập nhật thông tin cơ bản — fullName, phoneNumber, desiredLocations.
 * @param request - `SeekerBasicInfoUpdateRequest`
 * @returns Promise giải quyết thành `APIResponse<SeekerResponse>`
 */
export const updateMyBasicInfoApi = (request: SeekerBasicInfoUpdateRequest) => {
  const url = API_PATH + "/me/basic-info";
  return apiClient.patch<APIResponse<SeekerResponse>>(url, request);
};

/**
 * Form 3: Cập nhật thông tin cá nhân đầy đủ — fullName, gender, jobTitle, personalLink, phoneNumber, dateOfBirth, city, address.
 * @param request - `SeekerPersonalInfoUpdateRequest`
 * @returns Promise giải quyết thành `APIResponse<SeekerResponse>`
 */
export const updateMyPersonalInfoApi = (request: SeekerPersonalInfoUpdateRequest) => {
  const url = API_PATH + "/me/personal-info";
  return apiClient.patch<APIResponse<SeekerResponse>>(url, request);
};

/**
 * Lấy thông tin chi tiết của một người tìm việc theo ID (Quyền Admin).
 * @param id - ID của người tìm việc
 * @returns Promise giải quyết thành `APIResponse<SeekerResponse>`
 */
export const uploadMyAvatarApi = (file: File) => {
  const url = API_PATH + "/me/avatar";
  const formData = new FormData();
  formData.append("file", file);
  return apiClient.put<APIResponse<SeekerResponse>>(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteMyAvatarApi = () => {
  const url = API_PATH + "/me/avatar";
  return apiClient.delete<APIResponse<SeekerResponse>>(url);
};

export const getSeekerByIdApi = (id: string) => {
  const url = API_PATH + `/${id}`;
  return apiClient.get<APIResponse<SeekerResponse>>(url);
};

export default {
  getAllSeekersApi,
  getMyProfileApi,
  updateMyProfileApi,
  updateMyCoverLetterApi,
  updateMyBasicInfoApi,
  updateMyPersonalInfoApi,
  uploadMyAvatarApi,
  deleteMyAvatarApi,
  getSeekerByIdApi,
};
