import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import cartReducer from  "../slices/cartSlice"
 import tanujCourseslice from "../slices/courseSlice"

 import viewCourseReducer from "../slices/viewCourseSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    //upar import meh naam aur yeh same hona chaiye
    course: tanujCourseslice,
    //add krna saarre function mat bhul
    viewCourse: viewCourseReducer
})

export default rootReducer