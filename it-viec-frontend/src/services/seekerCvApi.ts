import apiClient from "./apiClient";
import Configs from "@/configurations/appConfig";

import type { APIResponse } from "../types/response.types";
import type { SeekerResponse } from "../types/response.types";
import type { SeekerCvMetadataResponse } from "../types/seekerCv.types";

const CV_BASE = Configs.API_ENDPOINT + "/api/v1/seekers";

/**
 * Lấy danh sách metadata tất cả CV của seeker hiện tại (tối đa 3).
 */
export const getMyCvsMetadataApi = async () => {
  const response = await apiClient.get<APIResponse<SeekerCvMetadataResponse[]>>(
    `${CV_BASE}/me/cvs`
  );
  return response.data;
};

/**
 * Backward-compat wrapper: trả về metadata CV chính (isPrimary) từ danh sách,
 * hoặc CV đầu tiên nếu chưa có primary.
 */
export const getMyCvMetadataApi = async (): Promise<APIResponse<SeekerCvMetadataResponse>> => {
  const response = await getMyCvsMetadataApi();
  const list = response.result ?? [];
  const primary = list.find((cv) => cv.isPrimary) ?? list[0] ?? null;
  if (!primary) {
    // Mimic 404 behaviour so callers can detect "no CV"
    const err = Object.assign(new Error("No CV found"), {
      response: { status: 404 },
    });
    throw err;
  }
  return { ...response, result: primary };
};

/**
 * Upload CV (PDF/DOCX, tối đa 5MB) cho seeker hiện tại.
 */
export const uploadMyCvApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post<APIResponse<SeekerResponse>>(
    `${CV_BASE}/me/cv`,
    formData,
  );
  return response.data;
};

/**
 * Xóa một CV cụ thể của seeker theo SeekerCv.id.
 */
export const deleteMyCvApi = async (cvId: string) => {
  const response = await apiClient.delete<APIResponse<void>>(
    `${CV_BASE}/me/cvs/${cvId}`
  );
  return response.data;
};

/**
 * Đặt CV chính cho seeker theo SeekerCv.id.
 */
export const setPrimaryCvApi = async (cvId: string) => {
  const response = await apiClient.put<APIResponse<void>>(
    `${CV_BASE}/me/cvs/${cvId}/primary`
  );
  return response.data;
};

/**
 * Trả về URL preview cho một CV cụ thể (dùng để mở tab mới).
 */
export const getCvPreviewUrl = (cvId: string) => {
  return `${CV_BASE}/me/cvs/${cvId}/preview`;
};

/**
 * @deprecated Dùng getCvPreviewUrl(cvId) thay thế.
 * Giữ lại để backward-compat với code chưa cập nhật.
 */
export const getMyCvPreviewUrl = () => {
  return `${CV_BASE}/me/cv/preview`;
};
