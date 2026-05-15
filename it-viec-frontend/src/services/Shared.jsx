import { CgIfDesign } from "react-icons/cg";
import { get } from "../utils/request";
export const getCompanyDetails = async () => {
    const result = await get(`companies?_embed=jobs`);
    return result;
}
export const getJobDetails = async () => {
    const result = await get(`jobs?status=Active&_expand=company`);
    return result;
}
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