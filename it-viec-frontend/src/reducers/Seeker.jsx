const initialState = {
    id: 0,
    userId: 0,
    fullName: "",
    jobTitle: "",
    phoneNumber: "",
    skills:[],
    dateOfBirth: "",
    gender: "",
    city: "",
    address: "",
    personalLink: "",
    gmail: "",
    coverLetter: "",
    desiredLocation: [],
    isLoaded: false,
};
const SeekerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SEEKER_FULL_INFO":
            return {
                ...state,
                ...action.data,
                isLoaded: true,
            };
        case "UPDATE_SEEKER_FIELD":
            return {
                ...state,
                [action.field]: action.value,
            };
        case "CLEAR_SEEKER_INFO":
            return initialState; 
        default:
            return state;
    }

};
export default SeekerReducer;