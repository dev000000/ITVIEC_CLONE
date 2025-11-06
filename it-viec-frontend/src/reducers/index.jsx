// #TODO: TAO RA BIEN ALL REDUCER , gom tat ca reducer vao 
import {combineReducers} from "redux"
import UserReducer from "./User";
import SeekerReducer from "./Seeker";
import CompanyReducer from "./Company";


const allReducers = combineReducers(
    {
        UserReducer,
        SeekerReducer,
        CompanyReducer
    }
)
export default allReducers;
