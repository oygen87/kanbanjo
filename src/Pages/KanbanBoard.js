import React, {useContext, useEffect, useState} from 'react';
import {fetchTasks, readProfile} from "../Auth/FirebaseService";
import {ViewContext, NEW, TODO, DOING, DONE, EDIT} from "../Store/ViewContext";
import BottomMenu from "../Components/BottomMenu";
import NewTask from "../Views/NewTask";
import {TaskContext, UPDATE} from "../Store/TaskContext";
import TaskList from "../Views/TaskList";
import LogoutButton from "../Components/LogoutButton";
import EditTask from "../Views/EditTask";
import BackButton from "../Components/BackButton";

const KanbanBoard = () => {

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [view, setView] = useState(null);

    const viewContext = useContext(ViewContext);
    const taskContext = useContext(TaskContext);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                const user = await readProfile();
                setUser(user);
            }

            const fetchedTasks = await fetchTasks();
            taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
            setTasks(fetchedTasks);
            setView(viewContext.state.currentView);
        };
        fetchData();
    }, [viewContext]);

    const setViewComponent = (view) => {
        if (tasks) {
            switch (view) {
                case TODO:
                    return <TaskList list={tasks.filter(t => t.status === TODO)}/>;
                case DOING:
                    return <TaskList list={tasks.filter(t => t.status === DOING)}/>;
                case DONE:
                    return <TaskList list={tasks.filter(t => t.status === DONE)}/>;
                case NEW:
                    return <NewTask/>;
                case EDIT:
                    return <EditTask/>;
            }
        } else if (view === NEW) {
            return <NewTask/>;
        } else {
            return "";
        }
    };

    return (
        <div>
            <div className="container mt-2">
                <div className="d-flex justify-content-between">
                    <BackButton />
                    <LogoutButton/>
                </div>
                {/*<h4>Hello {user && user.name} !</h4>*/}
                {setViewComponent(view)}
            </div>
            <BottomMenu/>
        </div>
    );
};

export default KanbanBoard;