'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { verifyToken } from "../database/actions";
const LoginRedirect = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.user);

    useEffect(()=>{
        const token = sessionStorage.getItem("user");
        if(!token){return;}
        dispatch(verifyToken(token)as any)
    }, [])

    useEffect(()=>{
        if(userState.Verifysuccess === "success") {
            router.push("/dashboard");
        } else if (userState.Verifysuccess === "error") {
            router.push("/signin")
        }
    },[userState.Verifysuccess]);


    return ( 
        <div>Please wait...</div>
     );
}
 
export default LoginRedirect;