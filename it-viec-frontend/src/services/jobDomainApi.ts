import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import type { APIResponse, JobDomainResponse } from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/job-domains";

export const getAllJobDomainsApi = () => {
  return apiClient.get<APIResponse<JobDomainResponse[]>>(API_PATH);
};

export default { getAllJobDomainsApi };
