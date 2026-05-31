import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import { type SkillCreateRequest } from "@/types/request.types";
import { type SkillResponse, type APIResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/skills";

/**
 * Lấy danh sách tất cả các kỹ năng trong hệ thống (Dùng cho select box).
 * @returns Promise giải quyết thành `APIResponse<SkillResponse[]>`
 */
export const getAllSkillsApi = () => {
  const url = API_PATH;
  return apiClient.get<APIResponse<SkillResponse[]>>(url);
};

/**
 * Thêm một kỹ năng mới vào hệ thống (Quyền Admin).
 * @param request - Đối tượng chứa tên kỹ năng: `SkillCreateRequest`
 * @returns Promise giải quyết thành `APIResponse<SkillResponse>`
 */
export const createSkillApi = (request: SkillCreateRequest) => {
  const url = API_PATH;
  return apiClient.post<APIResponse<SkillResponse>>(url, request);
};

export default {
  getAllSkillsApi,
  createSkillApi,
};
