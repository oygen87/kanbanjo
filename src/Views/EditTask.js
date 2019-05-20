import React, {useContext, useState} from 'react';
import {TODO, DOING, DONE, ViewContext} from "../Store/ViewContext";
import {updateTask, removeTask} from "../Auth/FirebaseService";
import {TaskContext} from "../Store/TaskContext";

const EditTask = () => {
    const viewContext = useContext(ViewContext);
    const taskContext = useContext(TaskContext);

    const [state, setState] = useState(taskContext.state.edit);

    const saveTask = async () => {
        await updateTask(state);
        viewContext.dispatch({type: TODO});

    };

    const handleRemove = async () => {
        await removeTask(state.id);
        viewContext.dispatch({type: TODO});
    };

    const handleChangeTitle = (e) => {
        setState({...state, title : e.target.value});
    };

    const handleChangeDescription = (e) => {
        setState({...state, description : e.target.value});
    };

    const handleChangeColor = (color) => {
        setState({...state, color});
    };

    const handleChangeStatus = (status) => {
        setState({...state, status});
    };

//todo duplicate
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
            default:
                return "";
        }
    };

    return (
        <div className={bgColor(state.color) + " card p-2 mt-2"}>
            <div className="form-group">
                <input className="mb-2 form-control" onChange={handleChangeTitle} type="text" placeholder="title" value={state.title}/>
            </div>
            <div className="form-group">
                <textarea className="mb-2 form-control" onChange={handleChangeDescription} type="text" placeholder="description" value={state.description}/>
            </div>
            <div className="form-group">
                <div className="btn-group mb-2" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={() => handleChangeColor("green")}>Green</button>
                    <button type="button" className="btn btn-info" onClick={() => handleChangeColor("blue")}>Blue</button>
                    <button type="button" className="btn btn-warning" onClick={() => handleChangeColor("yellow")}>Yellow</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleChangeColor("red")}>Red</button>
                </div>
            </div>
            <div className="form-group">
                <div className="btn-group mb-2" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-light" onClick={() => handleChangeStatus(TODO)}>Todo</button>
                    <button type="button" className="btn btn-light" onClick={() => handleChangeStatus(DOING)}>Doing</button>
                    <button type="button" className="btn btn-light" onClick={() => handleChangeStatus(DONE)}>Done</button>
                </div>
            </div>
            <div className="form-group">
                <button className="btn btn-light form-control" onClick={handleRemove}>REMOVE</button>
            </div>
            <div className="form-group">
                <button className="btn btn-light form-control" onClick={saveTask}>SAVE</button>
            </div>
        </div>
    );
};

export default EditTask;