interface LocalUserData {
  token: string;
  id: string;
  userType: string;
}

export function setLocalStorageUser(result: LocalUserData): void {
    localStorage.setItem("token", result.token);
    localStorage.setItem("id", result.id);
    localStorage.setItem("userType", result.userType);
}
export function setLocalStorageCompanyId(result: string): void {
    localStorage.setItem("companyId", result);
}
export function clearStorage(): void {
    localStorage.clear();
}