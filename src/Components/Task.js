import React, {useContext, useState} from 'react';
import {DOING, DONE, EDIT, TODO} from "../Store/ViewContext";
import {TaskContext, UPDATE} from "../Store/TaskContext";
import Remarkable from "remarkable";
import { Swipeable } from 'react-swipeable'
import {fetchTasks, updateTask} from "../Auth/FirebaseService";
import {bgColor} from "../Util/Util";

const Task = ({props, task}) => {
    const taskContext = useContext(TaskContext);

    const [isExpanded, setExpanded] = useState(false);
    const [hasSwipedLeft, setSwipedLeft] = useState(false);
    const [hasSwipedRight, setSwipedRight] = useState(false);

    const handleEdit = async () => {
        taskContext.dispatch({type: EDIT, payload: task});
        props.history.push('/edit');
    };

    const handleExpand = () => {
        setExpanded(!isExpanded);
    };

    const getRawMarkup = () => {
        var md = new Remarkable('full');
        return { __html: md.render(task.description) };
    };

    const handleSwipeLeft = async (data) => {
        if (isExpanded) {
            return;
        }
        if (data.absX < 70) {
            return;
        }

        let fetchedTasks;
        switch (task.status) {
            case DOING:
                setSwipedLeft(true);
                await updateTask({...task, status: TODO});
                fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                break;
            case DONE:
                setSwipedLeft(true);
                await updateTask({...task, status: DOING});
                fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                break;
            default:
                return;
        }
    };

    const handleSwipeRight = async (data) => {
        if (isExpanded) {
            return;
        }
        if (data.absX < 70) {
            return;
        }

        let fetchedTasks;
        switch (task.status) {
            case TODO:
                setSwipedRight(true);
                await updateTask({...task, status: DOING});
                fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                break;
            case DOING:
                setSwipedRight(true);
                await updateTask({...task, status: DONE});
                fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                break;
            default:
                return;
        }
    };

    const handleSwipeUp = async (data) => {
        const index = taskContext.state.tasks.findIndex(i => i.order === task.order);
        if (isExpanded) {
            return;
        }
        if (data.absY < 30) {
            return;
        }
        if (index === 0) {
            return;
        }

        const nextIndex = index - 1;
        const above = taskContext.state.tasks[nextIndex];
        await updateTask({...task, order: above.order});
        await updateTask({...above, order: task.order});
        const fetchedTasks = await fetchTasks(props);
        taskContext.dispatch({type: UPDATE, payload: fetchedTasks});

    };

    const handleSwipeDown = async (data) => {
        const index = taskContext.state.tasks.findIndex(i => i.order === task.order);
        if (isExpanded) {
            return;
        }
        if (data.absY < 30) {
            return;
        }
        if (index === taskContext.state.tasks.length - 1 ) {
            return;
        }

        const nextIndex = index + 1;
        const below = taskContext.state.tasks[nextIndex];
        await updateTask({...task, order: below.order});
        await updateTask({...below, order: task.order});
        const fetchedTasks = await fetchTasks(props);
        taskContext.dispatch({type: UPDATE, payload: fetchedTasks});

    };

    const taskClassName = () => {
        let className = bgColor(task.color) + " card mt-2 p-3 task ";
        if (hasSwipedLeft) {
            className += " animated fadeOutLeftBig";
        }
        if (hasSwipedRight) {
            className += " animated fadeOutRightBig";
        }
        return className;
    };

    return (
        <Swipeable onSwipedLeft={handleSwipeLeft}
                   onSwipedRight={handleSwipeRight}
                   onSwipedDown={handleSwipeDown}
                   onSwipedUp={handleSwipeUp}>
            <div className={taskClassName()} id={task.id}>
                <strong onClick={handleExpand}>{task.title}</strong>
                <p className={isExpanded ? "visible" : "d-none"} dangerouslySetInnerHTML={getRawMarkup()} />
                <button className={isExpanded ? "visible btn btn-outline-dark" : "d-none"} onClick={handleEdit}>EDIT</button>
            </div>
        </Swipeable>
    );
};

export default Task;