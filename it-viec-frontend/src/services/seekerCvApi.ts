import apiClient from "./apiClient";
import Configs from "@/configurations/appConfig";

import type { APIResponse } from "../types/response.types";
import type { SeekerResponse } from "../types/response.types";
import type { SeekerCvMetadataResponse } from "../types/seekerCv.types";

// Base path — khớp với pattern trong seekerApi.ts (dùng full URL, không dùng relative path)
const CV_BASE = Configs.API_ENDPOINT + "/api/v1/seekers";

/**
 * Lấy metadata CV của seeker hiện tại (fileName, contentType, size, updatedAt).
 * Ném lỗi 404 nếu chưa có CV.
 */
export const getMyCvMetadataApi = async () => {
  const response = await apiClient.get<APIResponse<SeekerCvMetadataResponse>>(
    `${CV_BASE}/me/cv/metadata`
  );
  return response.data;
};

/**
 * Upload CV (PDF/DOCX, tối đa 5MB) cho seeker hiện tại.
 * Sử dụng multipart/form-data, field name là "file".
 */
export const uploadMyCvApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post<APIResponse<SeekerResponse>>(
    `${CV_BASE}/me/cv`,
    formData,
    // Không set Content-Type thủ công: để axios/browser tự tạo boundary cho multipart
  );
  return response.data;
};

/**
 * Xóa CV của seeker hiện tại.
 */
export const deleteMyCvApi = async () => {
  const response = await apiClient.delete<APIResponse<SeekerResponse>>(
    `${CV_BASE}/me/cv`
  );
  return response.data;
};

/**
 * Trả về URL preview CV của seeker hiện tại (dùng để mở tab mới).
 * PDF sẽ được browser render inline; DOCX sẽ được download.
 */
export const getMyCvPreviewUrl = () => {
  return `${CV_BASE}/me/cv/preview`;
};
