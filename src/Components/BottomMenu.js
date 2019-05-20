import React, {useContext} from 'react';
import {ViewContext, NEW, TODO, DOING, DONE} from "../Store/ViewContext";
import LogoutButton from "./LogoutButton";
import StatusMenu from "./StatusMenu";

const BottomMenu = () => {

    const viewContext = useContext(ViewContext);

    const setViewToNew = () => {
        viewContext.dispatch({type: NEW});
    };

    return (
        <div className="fixed-bottom">
            <nav className="nav nav-pills nav-fill p-2">
                <a href="#" className="nav-item nav-link btn btn-success" onClick={setViewToNew}>New Task</a>
            </nav>
            <StatusMenu/>
        </div>
    );
};

export default BottomMenu;