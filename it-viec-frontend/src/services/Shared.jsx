import { get } from "../utils/request";

import ConstaintList from "../configurations/appConfig";
import axios from "axios";
const API_PATH = ConstaintList.API_ENDPOINT + "/api/v1/jobs";
const API_PATH_2 = ConstaintList.API_ENDPOINT + "/api/v1/users";

export const getCompanyDetails = async () => {
    const result = await get(`companies?_embed=jobs`);
    return result;
}
// export const getJobDetails = async () => {
//     const result = await get(`jobs?status=Active&_expand=company`);
//     return result;
// }
export const getJobDetailByID = async (data) => {
    const result = await get(`jobs/${data}?_expand=company`);
    return result;
}
export const getCompanyWithJobsBySlug = async (data) => {
    const result = await get(`companies?slug=${data}&_embed=jobs`);
    return result;
}
export const getJobBySlug = async (data) => {
    const result = await get(`jobs?slug=${data}&status=Active&_expand=company`);
    return result;
}
export const getJobsSearch = async (data) => {
    const { keyword, city } = data;
    let url = `jobs?status=Active&_expand=company`;
    if (keyword) {
        url += `&title_like=${encodeURIComponent(keyword)}`;
    }
    if (city) {
        url += `&city_like=${encodeURIComponent(city)}`;
    }
    const result = await get(url);
    return result;
}
export const checkApplication = async (data) => {
    const result = await get(`applications?seekerId=${data.seekerId}&jobId=${data.jobId}`);
    return result;
}


// api backend


export const getJobDetails = () => {
  var url = API_PATH;
  return axios.get(url);
}