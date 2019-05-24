import React, {useContext, useState} from 'react';
import {TODO} from "../Store/ViewContext";
import {createNewTask, fetchTasks} from "../Auth/FirebaseService";
import BackButton from "../Components/BackButton";
import {TaskContext, UPDATE} from "../Store/TaskContext";
import {bgColor} from "../Util/Util";

const NewPage = (props) => {
    const taskContext = useContext(TaskContext);
    const [isValid, setValid] = useState(true);

    const [state, setState] = useState({title: null, description: null, status: TODO, color:"green"});

    const createTask = async () => {
        if (!state.title || !state.description) {
            setValid(false);
            return;
        }
        await createNewTask({...state, order: Date.now()});
        const fetchedTasks = await fetchTasks(props);
        taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
        props.history.push({pathname: '/kanban', state: {view: TODO}});

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

    return (
        <div className={bgColor(state.color) + " card p-2 new-task"}>
            <div className="form-group">
                <input className="mb-2 form-control" onChange={handleChangeTitle} type="text" placeholder="title"/>
            </div>

            <div className="form-group">
                <textarea rows="6" className="mb-2 form-control" onChange={handleChangeDescription} type="text" placeholder="description"/>
            </div>
            <div className="form-group">
                <div className="btn-group mb-2 w-100" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={() => handleChangeColor("green")}>Green</button>
                    <button type="button" className="btn btn-info" onClick={() => handleChangeColor("blue")}>Blue</button>
                    <button type="button" className="btn btn-warning" onClick={() => handleChangeColor("yellow")}>Yellow</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleChangeColor("red")}>Pink</button>
                </div>
            </div>
            <div className="form-group">
                <BackButton props={props}/>
            </div>
            <div className={isValid ? "form-group" : "form-group animated shake"}>
                <button className="btn btn-light form-control" onClick={createTask}>CREATE</button>
            </div>
            {!isValid && <p className="text-center">Title or description is empty</p> }
        </div>
    );
};

export default NewPage;