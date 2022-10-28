import React from "react";
import { Redirect } from "react-router-dom";


function home({authorized}) {
    if (!authorized){
        return <Redirect to="/Login"/>;
        
    }
    return <div>Welcome to Home!!</div>

    
}

export default home;
