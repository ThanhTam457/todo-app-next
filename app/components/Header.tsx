'use client'

import React from "react";
import {Button} from 'react-bootstrap';
import { useRouter } from "next/navigation";
import { clearUser } from "../redux/userSlice";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/store";


const Header = () => {
    'use client'
    const dispatch = useAppDispatch();
    const handleLogout = () =>{
        dispatch(clearUser());
    }

    return ( 
        <div style={{backgroundImage : "url(/images/img4.png)", height: "200px", textAlign: "center"}}>
            <h2 style={{paddingTop: "100px"}}>Welcome Thanh Tam</h2>
            <Link href={"/signup"}>
                <Button style={{color: 'black'}} onClick={handleLogout}>Log out</Button>
            </Link>
        </div>
     );
}
 
export default Header;