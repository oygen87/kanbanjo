import React from 'react';
import {isLoggedIn} from "../Auth/FirebaseService";
import LoginButton from "../Components/LoginButton";

const LoginPage = () => {

    return (
        <div id="Login">
            <LoginButton/>
        </div>

    )
};

export default LoginPage;