'use client'

import Header from "../components/Header";
import Dashboard from "../components/Dashboard/DashBoard";

const dashboard = () => {
    return ( 
        <div style={{backgroundColor: "#F5F5F5", height: "715px", textAlign: "center", alignItems: "center"}}>
            <Header/>
            <h4 style={{textAlign: "end", paddingRight: "50px"}}>Good Evening!</h4>
            <div className="flex items-center justify-center p-5">
                <img src="/images/img5.png" alt="" />
            </div>
            <h4 style={{textAlign: "start", paddingLeft: "50px", color: "#610101"}}>Task List</h4>
            <div style={{padding: "20px 150px"}}>
                <Dashboard/>
            </div>
        </div>
     );
}
 
export default dashboard;