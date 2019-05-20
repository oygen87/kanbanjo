import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext, LOGOUT} from "../Store/AuthContext";
import {logoutFromGitHub} from "../Auth/FirebaseService";

const BottomMenu = () => {

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
        <div className="fixed-bottom">
            <nav className="nav nav-pills nav-fill p-2">
                <NavLink to="/" onClick={logout} className="nav-item nav-link nav-item nav-link btn btn-danger">Logout</NavLink>
                <NavLink to="/new" className="nav-item nav-link nav-item nav-link btn btn-info">New task</NavLink>
            </nav>
        </div>
    );
};

export default BottomMenu;