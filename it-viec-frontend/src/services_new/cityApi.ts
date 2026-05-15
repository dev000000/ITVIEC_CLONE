import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import { type CityCreateRequest } from "@/types/request.types";
import { type CityResponse, type APIResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/cities";

/**
 * Lấy danh sách tất cả các thành phố trong hệ thống (Dùng cho select box).
 * @returns Promise giải quyết thành `APIResponse<CityResponse[]>`
 */
export const getAllCitiesApi = () => {
  const url = API_PATH;
  return apiClient.get<APIResponse<CityResponse[]>>(url);
};

/**
 * Thêm một thành phố mới vào hệ thống (Quyền Admin).
 * @param request - Đối tượng chứa tên thành phố: `CityCreateRequest`
 * @returns Promise giải quyết thành `APIResponse<CityResponse>`
 */
export const createCityApi = (request: CityCreateRequest) => {
  const url = API_PATH;
  return apiClient.post<APIResponse<CityResponse>>(url, request);
};

export default {
  getAllCitiesApi,
  createCityApi,
};
