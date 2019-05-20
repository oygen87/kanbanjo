import React, {useContext} from 'react';
import {ViewContext, TODO, DOING, DONE} from "../Store/ViewContext";

const StatusMenu = () => {
    const viewContext = useContext(ViewContext);

    const setView = (view) => {
        viewContext.dispatch({type: view});
    };

    return (
        <div>
            <nav className="nav nav-pills nav-fill p-2">
                <a href="#" className={viewContext.state.currentView === TODO ? "nav-item nav-link active" : "nav-item nav-link"} onClick={() => setView(TODO)}>TODO</a>
                <a href="#" className={viewContext.state.currentView === DOING ? "nav-item nav-link active" : "nav-item nav-link"} onClick={() => setView(DOING)}>DOING</a>
                <a href="#" className={viewContext.state.currentView === DONE ? "nav-item nav-link active" : "nav-item nav-link"} onClick={() => setView(DONE)}>DONE</a>
            </nav>
        </div>
    );
};

export default StatusMenu;