const initialState = {
    id: 0,
    userId: 0,
    companyName: "",
    description: "",
    website: "",
    logoUrl: "",
    address: "",
    companyModel: "",
    industry: "",
    companySize: "",
    country: "",
    workingHours: "",
    overtimePolicy: "",
    openPositions: 0,
    rating: 0,
    reviewCount: 0,
    recommendationRate: 0,
    postCount: 0,
    createdAt: "",
    skills: [],
    companyIntroduction: "",
    ourExpertise: "",
    whyWorkHere: "",
    jobs: [],
    isLoaded: false,
}
const CompanyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_COMPANY_FULL_INFO":
            return {
                ...state,
                ...action.data,
                isLoaded: true,
            };
        case "UPDATE_COMPANY_FIELD":
            return {
                ...state,
                [action.field]: action.value,
            };
        case "CLEAR_COMPANY_INFO":
            return initialState; 
        default:
            return state;
    }

}
export default CompanyReducer;