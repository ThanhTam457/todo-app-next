import React from "react";
import SignUp_Form from "./SignUp_Form";
import Link from "next/link";

const SignUp = () => {
    return ( 
        <div style={{backgroundColor: "#F5F5F5", height: "715px", textAlign: "center", alignItems: "center"}}>
            <div style={{paddingTop: "100px"}}>
                <h1 className="text-4xl text-center">Welcome User!</h1>
                <p style={{fontSize: "25px"}}>Lets Get Signup to add tasks</p>
                <div className="flex items-center justify-center p-5">
                    <img src="/images/img2.png" alt="" width={70} className='mb-3'/>
                </div>
                <SignUp_Form/>
                <p style={{fontSize: "25px"}}>Already have an Account ?  <Link href="signin" style={{textDecoration: "none", color: "#F700C4"}}>SignIn</Link></p>
            </div>
        </div>
     );
}
 
export default SignUp;