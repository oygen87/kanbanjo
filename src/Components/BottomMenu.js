import React from 'react';
import {NavLink} from "react-router-dom";
import LogoutButton from "./LogoutButton";

const BottomMenu = (props) => {

    return (
        <div className="fixed-bottom bottom-menu">
            <nav className="p-2 bottom-menu-container">
                <LogoutButton props={props}/>
                <NavLink to="/new" id="new-task" className="nav-item nav-link nav-item nav-link btn btn-info">New task</NavLink>
            </nav>
        </div>
    );
};

export default BottomMenu;