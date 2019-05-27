import React, {useContext, useState} from 'react';
import {DOING, DONE, TODO} from "../Store/ViewContext";
import {TaskContext, UPDATE} from "../Store/TaskContext";
import {fetchTasks, removeTask, updateTask} from "../Auth/FirebaseService";
import BackButton from "../Components/BackButton";
import {bgColor} from "../Util/Util";

const EditPage = (props) => {
    const taskContext = useContext(TaskContext);

    const [state, setState] = useState(taskContext.state.edit);
    const [isValid, setValid] = useState(true);

    const saveTask = async () => {
        if (!state.title || !state.description) {
            setValid(false);
            return;
        } else {
            await updateTask(state);
            const fetchedTasks = await fetchTasks(props);
            taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
            props.history.push({pathname: '/kanban', state: {view: TODO}});
        }
    };

    const handleRemove = async () => {
        await removeTask(state.id);
        const fetchedTasks = await fetchTasks(props);
        taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
        props.history.push({pathname: '/kanban', state: {view: TODO}});
    };

    const handleChangeTitle = (e) => {
        setState({...state, title: e.target.value});
    };

    const handleChangeDescription = (e) => {
        setState({...state, description: e.target.value});
    };

    const handleChangeColor = (color) => {
        setState({...state, color});
    };

    const handleChangeStatus = (status) => {
        setState({...state, status});
    };

    return (
        <div className={bgColor(state.color) + " card p-2 edit-task"}>
            <div className="form-group">
                <input className="mb-2 form-control" onChange={handleChangeTitle} type="text" placeholder="title"
                       value={state.title}/>
            </div>
            <div className="form-group">
                <textarea rows="6" className="mb-2 form-control" onChange={handleChangeDescription} type="text"
                          placeholder="description" value={state.description}/>
            </div>
            <div className="form-group">
                <div className="btn-group mb-2 w-100" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={() => handleChangeColor("green")}>Green
                    </button>
                    <button type="button" className="btn btn-info" onClick={() => handleChangeColor("blue")}>Blue
                    </button>
                    <button type="button" className="btn btn-warning"
                            onClick={() => handleChangeColor("yellow")}>Yellow
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleChangeColor("red")}>Pink
                    </button>
                </div>
            </div>
            <div className="form-group">
                <div className="btn-group mb-2 w-100" role="group" aria-label="Basic example">
                    <button type="button"
                            className={state.status === TODO ? "btn btn-light status-active" : "btn btn-light"}
                            onClick={() => handleChangeStatus(TODO)}>Todo
                    </button>
                    <button type="button"
                            className={state.status === DOING ? "btn btn-light status-active" : "btn btn-light"}
                            onClick={() => handleChangeStatus(DOING)}>Week
                    </button>
                    <button type="button"
                            className={state.status === DONE ? "btn btn-light status-active" : "btn btn-light"}
                            onClick={() => handleChangeStatus(DONE)}>Other
                    </button>
                </div>
            </div>
            <div className="form-group">
                <BackButton props={props}/>
            </div>
            <div className="form-group">
                <button className="btn btn-outline-dark form-control" onClick={handleRemove}>REMOVE</button>
            </div>
            <div className={isValid ? "form-group" : "form-group animated shake"}>
                <button className="btn btn-dark form-control" onClick={saveTask}>SAVE</button>
            </div>
            {!isValid && <p className="text-center">Title or description is empty</p> }
        </div>
    );
};

export default EditPage;