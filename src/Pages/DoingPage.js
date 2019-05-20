import React, {useContext, useEffect, useState} from 'react';
import {TaskContext, UPDATE} from "../Store/TaskContext";
import {fetchTasks, readProfile} from "../Auth/FirebaseService";
import TaskList from "../Views/TaskList";
import {DOING} from "../Store/ViewContext";

const DoingPage = (props) => {
    const taskContext = useContext(TaskContext);

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState(taskContext.state.tasks);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                const user = await readProfile(props);
                setUser(user);
            }
            if (!tasks) {
                const fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                setTasks(fetchedTasks);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="container mt-2">
                <div className="task-list">
                    {tasks && <TaskList props={props} list={tasks.filter(t => t.status === DOING)}/>}
                </div>
            </div>
        </div>
    );
};

export default DoingPage;