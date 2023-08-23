import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { ValidateLogin } from "../database/actions";
import jwt from 'jsonwebtoken';
import { verifyToken } from "../database/actions";


interface IUser {
    id?: number
    name: string,
    email: string,
    password: string,
    token: string,
    Loginsuccess: string,
    Verifysuccess: string,
}

const initialState: IUser = {
    name: "",
    email: "",
    password: "",
    token: "",
    Loginsuccess: "",
    Verifysuccess: "",
} 
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser(state){
            state.id = -1;
            state.name = "";
            state.token = "";
            state.password =  "",
            state.Loginsuccess =  "";
            state.Verifysuccess = "";
        }
    },
    extraReducers : (builder) => {
        builder 
        .addCase(ValidateLogin.fulfilled,(state, action) =>{
            state.id= action.payload.n_user.id
            state.name = action.payload.n_user.name
            state.token = action.payload.token
            state.Loginsuccess = "success"
            sessionStorage.setItem('token', action.payload.token);
        })
        .addCase(verifyToken.rejected, (state, action)=>{
            state.Verifysuccess = "error"
        })
        .addCase(verifyToken.pending, (state, action)=>{
            state.Verifysuccess = "loading"
        })
        .addCase(verifyToken.fulfilled, (state, action)=>{
            state.Verifysuccess = "success"
        })
    }
});

export const {clearUser} = userSlice.actions;
export const userReducer = userSlice.reducer;



