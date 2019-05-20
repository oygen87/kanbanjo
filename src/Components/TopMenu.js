import React, {useContext} from 'react';
import {ViewContext} from "../Store/ViewContext";
import {NavLink} from "react-router-dom";

const TopMenu = () => {
    const viewContext = useContext(ViewContext);

    const setView = (view) => {
        viewContext.dispatch({type: view});
    };

    return (
        <div>
            <nav className="nav nav-pills nav-fill p-2 fixed-top top-menu">
                <NavLink to="/todo" className="nav-item nav-link">Todo</NavLink>
                <NavLink to="/doing" className="nav-item nav-link">In Progress</NavLink>
                <NavLink to="/done" className="nav-item nav-link">Done</NavLink>
            </nav>
        </div>
    );
};

export default TopMenu;