import React, {useContext, useState} from 'react';
import {EDIT} from "../Store/ViewContext";
import {TaskContext} from "../Store/TaskContext";
import Remarkable from "remarkable";

const Task = ({props, id, title, description, status, color}) => {
    const taskContext = useContext(TaskContext);

    const [isExpanded, setExpanded] = useState(false);

    const handleEdit = async () => {
        taskContext.dispatch({type: EDIT, payload: {id, title, description, status, color}});
        props.history.push('/edit');
    };

    const handleExpand = () => {
        setExpanded(!isExpanded);
    };

    const getRawMarkup = () => {
        var md = new Remarkable('full');
        return { __html: md.render(description) };
    };

    const bgColor = (color) => {
        switch (color) {
            case "green":
                return "bg-success";
            case "blue":
                return "bg-info";
            case "yellow":
                return "bg-warning";
            case "red":
                return "bg-danger";
        }
    };

    return (
        <div className={bgColor(color) + " card mt-2 p-2 task"} id={id}>
            <strong onClick={handleExpand}>{title}</strong>
            <p className={isExpanded ? "visible" : "d-none"} dangerouslySetInnerHTML={getRawMarkup()} />
            <button className={isExpanded ? "visible btn btn-outline-dark" : "d-none"} onClick={handleEdit}>EDIT</button>
        </div>
    );
};

export default Task;