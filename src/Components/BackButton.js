import React, {useContext} from 'react';
import {ViewContext, TODO, DOING, DONE} from "../Store/ViewContext";

const BackButton = () => {

    const viewContext = useContext(ViewContext);

    const back = () => {
        viewContext.dispatch({type: TODO});
    };

    return (
        <>
            <button className={
                viewContext.state.currentView !== TODO &&
                viewContext.state.currentView !== DOING &&
                viewContext.state.currentView !== DONE ?
                    "btn btn-outline-secondary" : "invisible"} onClick={back}>back</button>
        </>
    );
};

export default BackButton;