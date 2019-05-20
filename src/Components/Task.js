import React, {useContext, useState} from 'react';
import {EDIT} from "../Store/ViewContext";
import {TaskContext} from "../Store/TaskContext";

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
        <div className={bgColor(color) + " card mt-2 p-2 task"} id={id} onClick={handleExpand}>
            <strong>{title}</strong>
            <p className={isExpanded ? "visible" : "d-none"}>{description}</p>
            <button className={isExpanded ? "visible btn btn-outline-light" : "d-none"} onClick={handleEdit}>Edit</button>
        </div>
    );
};

export default Task;