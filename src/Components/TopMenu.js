import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {DOING, DONE, TODO} from "../Store/ViewContext";

const TopMenu = () => {

    const [isActive, setActive] = useState(TODO);

    return (
        <div>

            <nav className="nav nav-pills nav-fill p-2 fixed-top top-menu">
                <NavLink onClick={()=>setActive(TODO)} to={{
                    pathname: '/kanban',
                    state: {
                        view: TODO
                    }
                }} className={isActive===TODO ? "nav-item nav-link top-menu-active" : "nav-item nav-link"}>Todo</NavLink>
                <NavLink onClick={()=>setActive(DOING)} to={{
                    pathname: '/kanban',
                    state: {
                        view: DOING
                    }
                }} className={isActive===DOING ? "nav-item nav-link top-menu-active" : "nav-item nav-link"}>In Progress</NavLink>
                <NavLink onClick={()=>setActive(DONE)} to={{
                    pathname: '/kanban',
                    state: {
                        view: DONE
                    }
                }} className={isActive===DONE ? "nav-item nav-link top-menu-active" : "nav-item nav-link"}>Done</NavLink>
            </nav>
        </div>
    );
};

export default TopMenu;