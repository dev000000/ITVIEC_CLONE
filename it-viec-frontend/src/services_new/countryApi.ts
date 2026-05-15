import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import {
  type CountryResponse,
  type APIResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1";

/**
 * Lấy danh sách tất cả các quốc gia trong hệ thống (Dùng cho select box).
 * @returns Promise giải quyết thành `APIResponse<CountryResponse[]>`
 */
export const getAllCountriesApi = () => {
  const url = API_PATH + "/countries";
  return apiClient.get<APIResponse<CountryResponse[]>>(url);
};

export default {
  getAllCountriesApi,
};
