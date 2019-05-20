import React, {useContext} from 'react';
import {logoutFromGitHub} from "../Auth/FirebaseService";
import {NavLink} from "react-router-dom";
import {AuthContext, LOGOUT} from "../Store/AuthContext";

const LogoutButton = (props) => {
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
            <NavLink to="/" className="btn border-0 logout-button" onClick={logout}><i className="fas fa-sign-out-alt"/> Sign out</NavLink>

        </>
    );
};

export default LogoutButton;