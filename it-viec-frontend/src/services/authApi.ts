import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
import {
  type AuthenticationRequest,
  type RegisterUserSeekerRequest,
} from "@/types/request.types";
import {
  type AuthenticationResponse,
  type RegisterUserSeekerResponse,
  type APIResponse,
} from "@/types/response.types";

const API_PATH = Configs.API_ENDPOINT + "/api/v1/auth";

/**
 * API đăng nhập với email và password.
 * @param request - Đối tượng chứa email và password: `AuthenticationRequest`
 * @returns Promise giải quyết thành `APIResponse<AuthenticationResponse>`
 */
export const loginApi = (request: AuthenticationRequest) => {
  const url = API_PATH + "/login";
  return apiClient.post<APIResponse<AuthenticationResponse>>(url, request);
};

/**
 * API lấy thông tin user hiện tại từ HttpOnly cookie.
 * @returns Promise giải quyết thành `APIResponse<AuthenticationResponse>`
 */
export const getMeApi = () => {
  const url = API_PATH + "/me";
  return apiClient.get<APIResponse<AuthenticationResponse>>(url);
};

/**
 * API đăng ký một tài khoản cho người tìm việc (seeker).
 * @param request - Đối tượng chứa thông tin đăng ký: `RegisterUserSeekerRequest`
 * @returns Promise giải quyết thành `APIResponse<RegisterUserSeekerResponse>`
 */
export const registerSeekerApi = (request: RegisterUserSeekerRequest) => {
  const url = API_PATH + "/register/seekers";
  return apiClient.post<APIResponse<RegisterUserSeekerResponse>>(url, request);
};

/**
 * API làm mới token sử dụng cookies (HttpOnly).
 * @returns Promise giải quyết thành `APIResponse<void>`
 */
export const refreshTokenCookieApi = () => {
  const url = API_PATH + "/refresh-token";
  return apiClient.post<APIResponse<void>>(url);
};

/**
 * API đăng xuất, xóa HttpOnly cookie ở phía server.
 * @returns Promise giải quyết thành `APIResponse<void>`
 */
export const logoutApi = () => {
  const url = API_PATH + "/logout";
  return apiClient.post<APIResponse<void>>(url);
};

export default {
  loginApi,
  getMeApi,
  registerSeekerApi,
  refreshTokenCookieApi,
  logoutApi,
};
