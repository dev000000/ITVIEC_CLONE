import Configs from "@/configurations/appConfig";
import apiClient from "./apiClient";
const API_PATH = Configs.API_ENDPOINT + "/api/v1/auth";

// API đăng nhập với email và password
export const loginWithEmailAndPass = (email: string, password: string) => {
  const url = API_PATH + "/login";
  return apiClient.post(url, { email, password });
}

export const checkToken = () => {
  const url = API_PATH + "/introspect";
  return apiClient.get(url);
}

// API refresh token cookies
export const refreshTokenCookie = () => {
  const url = API_PATH + "/refresh_token";
  return apiClient.post(url);
}

export const signUpSeeker = () => {

}