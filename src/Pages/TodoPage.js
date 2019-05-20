import React, {useContext, useEffect, useState} from 'react';
import {fetchTasks, readProfile} from "../Auth/FirebaseService";
import {TaskContext, UPDATE} from "../Store/TaskContext";
import TaskList from "../Views/TaskList";
import {TODO} from "../Store/ViewContext";

const TodoPage = (props) => {
    const taskContext = useContext(TaskContext);

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                const user = await readProfile(props);
                setUser(user);
            }

            const fetchedTasks = await fetchTasks(props);
            taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
            setTasks(fetchedTasks);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="container mt-2">
                <div className="task-list">
                    {tasks && <TaskList props={props} list={tasks.filter(t => t.status === TODO)}/>}
                </div>
            </div>
        </div>
    );
};

export default TodoPage;