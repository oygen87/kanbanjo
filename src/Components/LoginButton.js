import React, {useContext} from 'react';
import {AuthContext, LOGIN} from "../Store/AuthContext";
import {loginWithGitHub} from "../Auth/FirebaseService";

const LoginButton = ({props}) => {
    const authContext = useContext(AuthContext);
    const login = async () => {
        try {
            const user = await loginWithGitHub();
            authContext.dispatch({type: LOGIN});
            props.history.push('/todo');
        } catch (error) {
            // TODO : implement error handling
        }

    };
    return (
        <div>
            <button className="btn btn-success" onClick={login}>login with github</button>
        </div>
    );
};

export default LoginButton;