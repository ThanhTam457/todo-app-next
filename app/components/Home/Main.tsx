import React from "react";
import Link from "next/link";


const Main = () => {
    return ( 
        <div style={{textAlign: "center", alignItems: "center", paddingTop: "70px", paddingLeft: "300px", paddingRight: "300px"}}>
            <div className="flex items-center justify-center p-5">
                <img src="/images/background.png" alt="" style={{width: "400px"}} />
            </div>
            <h1 className="text-3xl text-center  font-bold">Get Things Done With TODO </h1>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere neque recusandae harum quos culpa, temporibus ratione consequuntur quas, porro, quam fugiat accusamus corporis voluptatibus hic omnis ad mollitia quidem sit!</h4>
            <Link href={'/signup'}>
                <button style={{backgroundColor: "#F700C4", height: "100px", width: "500px", textDecoration: "bold", fontSize: "50px"}}>Get Started</button>
            </Link>
        </div>
     );
}
 
export default Main;