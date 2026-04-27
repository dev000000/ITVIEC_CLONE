const KEY_ACCESS_TOKEN = "accessToken" as const;
const KEY_REFRESH_TOKEN = "refreshToken" as const;
const KEY_AUTH = "isAuthenticated" as const;

export const setAccessToken = (token: string): void => {
  localStorage.setItem(KEY_ACCESS_TOKEN,token);
}
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(KEY_REFRESH_TOKEN,token);
}
export const getAccessToken = (): string | null => {
  return localStorage.getItem(KEY_ACCESS_TOKEN);
}
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(KEY_REFRESH_TOKEN);
}
export const removeAccessToken = (): void => {
  localStorage.removeItem(KEY_ACCESS_TOKEN);
}
export const removeRefreshToken = (): void => {
  localStorage.removeItem(KEY_REFRESH_TOKEN);
}
export const setAuthenticated = (value: boolean): void => {
  localStorage.setItem(KEY_AUTH, String(value));
}
export const getAuthenticated = (): boolean => {
  return localStorage.getItem(KEY_AUTH) === "true";
}