import {  get, post } from "../utils/request";

export const getUser = async () => {
    const result = await get("users");
    return result;
}
export const register = async (data) => {
    const result = await post("users",data);
    return result;
}
export const checkExist = async (data) => {
    const result = await get(`users?email=${data.email}`);
    return result;
}
// #FIXME: su dung params de check login
export const checkLogin = async (data) => {
    const result = await get(`users?email=${data.email}&password=${data.password}&userType=${data.userType}`);
    return result;
}
// export const checkLoginEmployer = async (data) => {
//     const result = await get(`employers?email=${data.email}&password=${data.password}`);
//     return result;
// }
export const checkTokenUser = async (data) => {
    const result = await get(`users?token=${data}`);
    return result;
}
export const checkTokenEmployer = async (data) => {
    const result = await get(`employers?token=${data}`);
    return result;
}
export const checkTokenUsers = async (token, role) => {
    const result = await get(`users?token=${token}&userType=${role}`);
    return result;
}


