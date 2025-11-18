import { get, patch, post } from "../utils/request";

export const getSeekerInforByUserId = async (data) => {
    const result = await get(`seekerDetails?userId=${data}`);
    return result;
}
export const getSeekerInforById = async (data) => {
    const result = await get(`seekerDetails/${data}`);
    return result;
}
export const updateSeekerInfor = async (id,data) => {
    const result = await patch(`seekerDetails/${id}`, data);
    return result;
}
export const getJobDetailBySlug = async (data) => {
    const result = await get(`jobs?slug=${data}`);
    return result;
}
export const postApplication = async (data) => {
    const result = await post(`applications`,data);
    return result;
}
export const checkApplicationExist = async (data) => {
    const result = await get(`applications?jobId=${data.jobId}&seekerId=${data.seekerId}`);
    return result;
}
export const getApplicationsBySeekerId = async (data) => {
    const result = await get(`applications?seekerId=${data}&_expand=job&_expand=company`);
    return result;
}
export const getApplicationsBySeekerIdWithPagination = async (data) => {
    const result = await get(`applications?seekerId=${data.id}&_expand=job&_expand=company&_start=${data.start}&_limit=${data.limit}&_sort=appliedAt&_order=${data.sort}`);
    return result;
}
export const createSeekerDetail = async (data) => {
    const result = await post("seekerDetails",data);
    return result;
}