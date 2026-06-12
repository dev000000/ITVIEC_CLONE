import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import type { APIResponse, IndustryResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/industries";

export const getAllIndustriesApi = () => {
  return apiClient.get<APIResponse<IndustryResponse[]>>(API_PATH);
};

export default { getAllIndustriesApi };
