import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import { type PopularTagCreateRequest } from "@/types/request.types";
import { type APIResponse, type PopularTagResponse } from "@/types/response.types";

const API_PATH = `${Configs.API_ENDPOINT}/api/v1/tag/popular`;

export const getPopularTagsApi = () => {
  return apiClient.get<APIResponse<PopularTagResponse[]>>(API_PATH);
};

export const createPopularTagApi = (request: PopularTagCreateRequest) => {
  return apiClient.post<APIResponse<PopularTagResponse>>(API_PATH, request);
};

export const deletePopularTagApi = (id: number) => {
  return apiClient.delete<APIResponse<void>>(`${API_PATH}/${id}`);
};

export default {
  getPopularTagsApi,
  createPopularTagApi,
  deletePopularTagApi,
};
