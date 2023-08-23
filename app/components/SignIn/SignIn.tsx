import React from "react";
import SignIn_Form from "./SignIn_Form";

const SignIn = () => {
    return ( 
        <div style={{backgroundColor: "#F5F5F5", height: "715px", textAlign: "center", alignItems: "center"}}>
            <div style={{paddingTop: "100px"}}>
                <h1 className="text-4xl text-center">Welcome back!</h1>
                <div className="flex items-center justify-center p-5">
                    <img src="/images/img3.png" alt="" className="mb-3"/>
                </div>
                <SignIn_Form/>
                <p style={{fontSize: "25px"}}>Don't have an Account ?  <a href="signup" style={{textDecoration: "none", color: "#F700C4"}}>SignUp</a></p>
            </div>
        </div>
     );
}
 
export default SignIn;