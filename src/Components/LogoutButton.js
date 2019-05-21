import React, {useContext} from 'react';
import {logoutFromGitHub} from "../Auth/FirebaseService";
import {NavLink} from "react-router-dom";
import {AuthContext, LOGOUT} from "../Store/AuthContext";
import {TODO} from "../Store/ViewContext";

const LogoutButton = ({props}) => {
    //console.log(props);
    const authContext = useContext(AuthContext);
    const logout = async () => {
        try {
            //await logoutFromGitHub();
            authContext.dispatch({type: LOGOUT});
            //props.history.push("/");
            //props.props.history.push({pathname: '/lol', state: {loggedOut: true}});
        } catch (error) {
            //console.log("LOGOUT ERROR");
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