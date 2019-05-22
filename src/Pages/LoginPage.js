import React, {useContext, useEffect, useState} from 'react';
import LoginButton from "../Components/LoginButton";
import {
    currentUser,
    fetchTasks,
    isRedirected,
    loginWithRedirect,
    logoutFromGitHub,
    readProfile
} from "../Auth/FirebaseService";
import {TODO} from "../Store/ViewContext";
import {UPDATE} from "../Store/TaskContext";
import {AuthContext, LOGOUT} from "../Store/AuthContext";

const LoginPage = (props) => {
    const authContext = useContext(AuthContext);
    const [isWaiting, setWaiting] = useState(true);
    /*
    const successful = loginWithRedirect();
    if (successful) {
        console.log(successful);
        props.history.push({pathname: '/kanban', state: {view: TODO}});
    }*//*
    const logUser = () => {
        console.log(currentUser());
    };*/

    /*
    const checkUser = setInterval(() => {
        console.log(currentUser());
        if (currentUser()){
            clearInterval(checkUser);
            props.history.push({pathname: '/kanban', state: {view: TODO}});
        }
    },300);

    */
    /*
    console.log(props.location.state);
    if (props.location.state) {
        if (props.location.state.loggedOut) {

        }
    }*/
    //console.log(props.location.state);
    if (props.location.state && props.location.state.loggedOut) {
        //console.log("loggin out from login page....");
        logoutFromGitHub();
        //authContext.dispatch({type: LOGOUT});
    } else {
        const checkUser = setInterval(() => {
            //console.log(currentUser());
            if (currentUser()){
                clearInterval(checkUser);
                props.history.push({pathname: '/kanban', state: {view: TODO}});
            }
        },300);
    }/* else {
        console.log(props.location.state);
        if (!props.location.state) {
            isRedirected().then(() => {
                console.log("IS REDIRECTED ");
                console.log(currentUser());
                props.history.push({pathname: '/kanban', state: {view: TODO}});
            });
        } else {
            logoutFromGitHub();
        }
    }*/

    setTimeout(() => {
        setWaiting(false);
    }, 3000);



    return (
        <div id="login">
            <h1 id="kanbanjo-title">KANBANJO.</h1>
            {isWaiting ?
                (<div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)
                : <LoginButton props={props}/> }
        </div>

    )
};

export default LoginPage;