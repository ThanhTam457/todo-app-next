'use client'

import React, { use, useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { ValidateLogin, verifyToken } from "@/app/database/actions";
import { useAppDispatch, useAppSelector } from "@/app/redux/store"; 
import {useRouter} from "next/navigation";
import jwt from 'jsonwebtoken';

const SignIn_Form = () => {
    const userState = useAppSelector((state) => state.user)
    
    const dispatch = useAppDispatch();

    interface validateUser{
        email: string,
        password: string,
    }

    const [s_email, setEmail] = useState("");
    const [s_password, setPassword] = useState("");
    const router = useRouter();
    const [decoded, setDecoded] = useState('')

    useEffect(()=>{
       if(sessionStorage.getItem('user')!==null && sessionStorage.getItem('user')!==undefined && !userState.Verifysuccess){        
        router.push('/redirect');
       }
       else if(userState.Verifysuccess == "error"){
        alert("Please sign in again");
        router.push('/signin')
       }
    },[])
    

    function validateUserSignInForm(email_input:string, password_input:string):boolean {
        if (email_input === "")
            { alert('Email is empty!!'); return false; }
        else if(password_input === "")
            { alert("Password is empty!!"); return false; }
        
        return true;
    }

    function handlerSubmit(event: React.MouseEvent){
        const user: validateUser = {
            email: s_email,
            password: s_password,
        }

        const isValid: boolean = validateUserSignInForm(s_email, s_password);
        if(isValid){
            dispatch(ValidateLogin(user) as any);
            
        }
        else{
            alert('Dont have that account!');
        }
    }

   
    

    console.log(useAppSelector((state)=>state.user));


    return ( 
        <form style={{padding: "0px 200px"}}> 
            <div className="form-floating mb-3">
                <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" value={s_email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" value={s_password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button style={{backgroundColor: "#F700C4", height: "70px", width: "250px", textDecoration: "bold", fontSize: "25px"}} onClick={handlerSubmit}>SignIn</button>
        </form>
     );
}
 
export default SignIn_Form;