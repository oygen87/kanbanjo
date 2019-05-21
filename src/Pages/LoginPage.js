import React, {useEffect} from 'react';
import LoginButton from "../Components/LoginButton";
import {currentUser, fetchTasks, loginWithRedirect, readProfile} from "../Auth/FirebaseService";
import {TODO} from "../Store/ViewContext";
import {UPDATE} from "../Store/TaskContext";

const LoginPage = (props) => {/*
    const successful = loginWithRedirect();
    if (successful) {
        console.log(successful);
        props.history.push({pathname: '/kanban', state: {view: TODO}});
    }*//*
    const logUser = () => {
        console.log(currentUser());
    };
    const checkUser = setInterval(() => {
        console.log(currentUser());
        if (currentUser()){
            clearInterval(checkUser);
            props.history.push({pathname: '/kanban', state: {view: TODO}});
        }
    },100);
*/
    return (
        <div id="login">
            {/*<button onClick={logUser}>  loguser </button>*/}
            <h1 id="kanbanjo-title">KANBANJO.</h1>
            <LoginButton props={props}/>
        </div>

    )
};

export default LoginPage;