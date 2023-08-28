"use client"

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { addUserToDb } from '@/app/database/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignUp_Form = () => {

    sessionStorage.clear();
    // dispatch
    const dispatch = useAppDispatch();
    
    // define 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cf_password, setCf_password] = useState('');
    let count = 0
    const router = useRouter();

    
    useEffect(()=>{
        if(sessionStorage.getItem('user')!==null && sessionStorage.getItem('user')!==undefined && !userState.Verifysuccess){        
            router.push('/redirect');
           }
        console.log('Already redirect!');
        
     },[])


    // redux
    const onClickChange = ()=>{
        if(password !== cf_password){
            alert('Password not match!!!');
        }
        else{
            dispatch(addUserToDb({
                name: name,
                email: email,
                password: password
            }));
            count ++;
        }        
    }


    return ( 
        <form style={{padding: "0px 250px"}}> 
            <div className="form-floating mb-3">
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your full name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-floating mb-3">
                <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Confirm password" value={cf_password} onChange={(e) => setCf_password(e.target.value)}/>
            </div> 
            <Link href='/signin'>
                <button style={{backgroundColor: "#F700C4", height: "70px", width: "250px", textDecoration: "bold", fontSize: "25px"}} onClick={onClickChange}>SignUp</button>
            </Link>
        </form>
     );
}
 
export default SignUp_Form;