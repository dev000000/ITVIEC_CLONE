import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import { type SkillResponse, type APIResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/skills";

/**
 * Lấy danh sách tất cả các kỹ năng đang active trong hệ thống (Dùng cho select box).
 * @returns Promise giải quyết thành `APIResponse<SkillResponse[]>`
 */
export const getAllSkillsApi = () => {
  const url = API_PATH;
  return apiClient.get<APIResponse<SkillResponse[]>>(url);
};

export default {
  getAllSkillsApi,
};
