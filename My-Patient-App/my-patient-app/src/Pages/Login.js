import React from "react";
import { useNavigate} from "react-router-dom";

function Login(){
    const navigate =useNavigate();

    return (
        <div>
            <input type ="text" placeholder ="username"/>
            <input type ="text" placeholder ="password"/>
            <button onClick={ () => {
                navigate("/home");

            }}>Login</button>


            </div>
    );

}
export default Login;