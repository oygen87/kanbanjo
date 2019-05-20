import React from 'react';
import {logoutFromGitHub} from "../Auth/FirebaseService";

const LogoutButton = (props) => {
    const logout = async () => {
        try {
            await logoutFromGitHub();
            props.history.push('/');
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