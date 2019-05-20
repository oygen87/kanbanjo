import React, {useContext, useState} from 'react';
import {removeTask} from "../Auth/FirebaseService";
import {TODO, EDIT, ViewContext} from "../Store/ViewContext";
import {TaskContext} from "../Store/TaskContext";

const Task = ({id, title, description, status, color}) => {
    const viewContext = useContext(ViewContext);
    const taskContext = useContext(TaskContext);

    const [isExpanded, setExpanded] = useState(false);

    const handleEdit = async () => {
        viewContext.dispatch({type: EDIT});
        taskContext.dispatch({type: EDIT, payload: {id, title, description, status, color}});
    };

    const handleExpand = () => {
        setExpanded(!isExpanded);
        console.log(isExpanded);
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
        <div className={bgColor(color) + " card mt-2 p-2"} id={id} onClick={handleExpand}>
            <strong>{title}</strong>
            <p className={isExpanded ? "visible" : "d-none"}>{description}</p>
            <button className={isExpanded ? "visible btn btn-outline-dark" : "d-none"} onClick={handleEdit}>Edit</button>
        </div>
    );
};

export default Task;