import React, {useContext, useState} from 'react';
import {createNewTask} from "../Auth/FirebaseService";
import {TODO, ViewContext} from "../Store/ViewContext";

const NewTask = () => {
    const viewContext = useContext(ViewContext);

    const [state, setState] = useState({title: null, description: null, status: TODO, color:"green"});

    const createTask = async () => {
        await createNewTask(state);
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

    //todo duplicate
    const bgColor = () => {
        switch (state.color) {
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
        <div className={bgColor() + " card mt-2 p-2"}>
            <div className="form-group">
                <input className="mb-2 form-control" onChange={handleChangeTitle} type="text" placeholder="title"/>
            </div>

            <div className="form-group">
                <textarea className="mb-2 form-control" onChange={handleChangeDescription} type="text" placeholder="description"/>
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
                <button className="btn btn-light form-control" onClick={createTask}>Create</button>
            </div>
        </div>
    );
};

export default NewTask;