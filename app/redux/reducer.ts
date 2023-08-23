import { combineReducers } from "@reduxjs/toolkit"; 
import { userReducer } from "./userSlice";
import { taskReducer } from "./taskSlice";

export const rootReducer = combineReducers({
    user: userReducer,
    task: taskReducer,
})