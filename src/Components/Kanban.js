import React, {useContext, useEffect, useState} from 'react';
import {TaskContext, UPDATE} from "../Store/TaskContext";
import {fetchTasks, readProfile} from "../Auth/FirebaseService";
import TaskList from "../Views/TaskList";
import TopMenu from "./TopMenu";
import BottomMenu from "./BottomMenu";
import {AuthContext, LOGIN} from "../Store/AuthContext";

const Kanban = (props) => {
    const taskContext = useContext(TaskContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                //console.log("reading profile");
                const user = await readProfile(props);
                authContext.dispatch({type: LOGIN});
                setUser(user);
                const fetchedTasks = await fetchTasks(props);
                if (!fetchedTasks) {return;}
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
            }
            /*console.log(taskContext.state);
            if (taskContext.state.tasks.length == 0) {
                console.log("fetching tasks");
                const fetchedTasks = await fetchTasks(props);
                console.log(fetchedTasks);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
            }*/
        };
        fetchData();
    },[]);

    return (
        <div>
            <div className="container mt-2">
                <div className="task-list">
                    <TopMenu />
                    {taskContext.state.tasks && <TaskList props={props} list={taskContext.state.tasks.filter(t => t.status === props.location.state.view)}/>}
                    <BottomMenu props={props}/>
                </div>
            </div>
        </div>
    );
};

export default Kanban;