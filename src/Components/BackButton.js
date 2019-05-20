import React from 'react';
import {TODO} from "../Store/ViewContext";

const BackButton = ({props}) => {
    const back = () => {
        props.history.push({pathname: '/kanban', state: {view: TODO}});
    };

    return (
        <>
            <button className="btn btn-outline-dark border-0 form-control" onClick={back}>BACK</button>
        </>
    );
};

export default BackButton;