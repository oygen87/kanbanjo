import React, {useState} from 'react';
import LoginButton from "../Components/LoginButton";
import {
    currentUser,
    logoutFromGitHub,
} from "../Auth/FirebaseService";
import {TODO} from "../Store/ViewContext";

const LoginPage = (props) => {
    const [isWaiting, setWaiting] = useState(true);

    if (props.location.state && props.location.state.loggedOut) {
        logoutFromGitHub();
    } else {
        const checkUser = setInterval(() => {
            if (currentUser()) {
                clearInterval(checkUser);
                props.history.push({pathname: '/kanban', state: {view: TODO}});
            }
        }, 300);
    }

    setTimeout(() => {
        setWaiting(false);
    }, 3500);


    return (
        <div id="login">
            <h1 id="kanbanjo-title">KANBANJO.</h1>
            {isWaiting ?
                (<div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)
                : <LoginButton props={props}/>}
        </div>

    )
};

export default LoginPage;