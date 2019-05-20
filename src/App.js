import React, {useContext} from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import LoginPage from "./Pages/LoginPage";
import {AuthContext} from "./Store/AuthContext";
import TodoPage from "./Pages/TodoPage";
import DoingPage from "./Pages/DoingPage";
import DonePage from "./Pages/DonePage";
import EditPage from "./Pages/EditPage";
import NewPage from "./Pages/NewPage";
import TopMenu from "./Components/TopMenu";
import BottomMenu from "./Components/BottomMenu";
import Kanban from "./Components/Kanban";

const App = () => {

    const authContext = useContext(AuthContext);

    return (
        <BrowserRouter>
            <div className="App">
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/todo" component={TodoPage} />
                <Route exact path="/doing" component={DoingPage} />
                <Route exact path="/done" component={DonePage} />
                <Route exact path="/edit" component={EditPage} />
                <Route exact path="/new" component={NewPage} />
                <Route exact path="/kanban" component={Kanban} />
            </div>
        </BrowserRouter>
    );
};

export default App;
