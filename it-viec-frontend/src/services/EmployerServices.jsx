import { del, get, patch, post } from "../utils/request";

export const getCompanyWithJobsByUserID = async (data) => {
    const result = await get(`companies?userId=${data}&_embed=jobs`);
    return result;
}
export const getJobList = async () => {
    const result = await get(`jobs`);
    return result;
}
export const getJobs = async (data) => {
    const result = await get(`jobs?companyId=${data}`);
    return result;
}
export const getJobWithCompany = async (data) => {
    const result = await get(`jobs/${data}?_expand=company`);
    return result;
}
export const getCompanyInfor = async (data) => {
    const result = await get(`companies/${data}`);
    return result;
}
export const getEmployerInfor = async (data) => {
    const result = await get(`employerDetails?userId=${data}`);
    return result;
}
export const updateCompany = async (id,data) => {
    const result = await patch(`companies/${id}`,data)
    return result;
}
export const getSkills = async () => {
    const result = await get(`skills`);
    return result;
}

export const updateJob = async (id,data) => {
    const result = await patch(`jobs/${id}`,data)
    return result;
}
export const deleteJob = async (id) => {
    const result = await del(`jobs/${id}`)
    return result;
}
export const postJob = async (data) => {
    const result = await post(`jobs`,data);
    return result;
}
export const getApplications = async () => {
    const result = await get(`applications`);
    return result;
}
export const getApplicationsWithJob = async (id) => {
    const result = await get(`applications?companyId=${id}&_expand=job`);
    return result;
}
export const getApplicationsWithJobPagination = async (id,start, limit) => {
    const result = await get(`applications?companyId=${id}&_expand=job&_start=${start}&_limit=${limit}`);
    return result;
}
export const updateApplication = async (id,data) => {
    const result = await patch(`applications/${id}`,data)
    return result;
}


