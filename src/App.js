import React, {useContext, useState} from 'react';
import './App.css';

import { BrowserRouter, Route } from "react-router-dom";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import {isLoggedIn, loginWithGitHub, logoutFromGitHub} from "./Auth/FirebaseService";
import LoginPage from "./Pages/LoginPage";
import KanbanBoard from "./Pages/KanbanBoard";
import {AuthContext} from "./Store/AuthContext";

const App = () => {

    const authContext = useContext(AuthContext);

    return (
        <div id="App">
            {authContext.state.isLoggedIn ? <KanbanBoard/> : <LoginPage/>}
        </div>
    );
};

export default App;
