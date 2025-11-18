export const setCompanyFullInfo = (data) => {
  return {
    type: "SET_COMPANY_FULL_INFO",
    data: data,
  };
};
export const updateCompanyField = (field, value) => {
  return {
    type: "UPDATE_COMPANY_FIELD",
    field,
    value,
  };
};
export const clearCompanyInfo = () => {
  return {
    type: "CLEAR_COMPANY_INFO",
  };
};
