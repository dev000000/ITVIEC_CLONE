export const setSeekerFullInfo = (data) => {
  return {
    type: "SET_SEEKER_FULL_INFO",
    data: data,
  };
};
export const updateSeekerField = (field, value) => {
  return {
    type: "UPDATE_SEEKER_FIELD",
    field,
    value,
  };
};
export const clearSeekerInfo = () => {
  return {
    type: "CLEAR_SEEKER_INFO",
  };
};
