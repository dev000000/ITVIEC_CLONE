export function setLocalStorageUser (result) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("id", result.id);
    localStorage.setItem("userType",result.userType);
}
export function setLocalStorageCompanyId (result) {
    localStorage.setItem("companyId", result);
}
export function clearStorage () {
    localStorage.clear();
}