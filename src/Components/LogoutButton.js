import React, {useContext} from 'react';
import {AuthContext, LOGOUT} from "../Store/AuthContext";
import {logoutFromGitHub} from "../Auth/FirebaseService";

const LogoutButton = () => {
    const authContext = useContext(AuthContext);
    const logout = async () => {
        try {
            await logoutFromGitHub();
            authContext.dispatch({type: LOGOUT});
        } catch (error) {
            // TODO : implement error handling
        }
    };
    return (
        <>
            <button className="btn btn-outline-danger" onClick={logout}>logout</button>
        </>
    );
};

export default LogoutButton;