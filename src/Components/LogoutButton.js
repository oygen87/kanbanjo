import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext, LOGOUT} from "../Store/AuthContext";

const LogoutButton = () => {
    const authContext = useContext(AuthContext);
    const logout = async () => {
        try {
            authContext.dispatch({type: LOGOUT});
        } catch (error) {
            // TODO : implement error handling
        }
    };
    return (
        <>
            <NavLink to={{ pathname: '/', state: { loggedOut: true} }} className="btn border-0 logout-button" onClick={logout}><i className="fas fa-sign-out-alt"/> Sign out</NavLink>
        </>
    );
};

export default LogoutButton;