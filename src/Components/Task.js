import React, {useContext, useState} from 'react';
import {DOING, DONE, EDIT, TODO} from "../Store/ViewContext";
import {TaskContext, UPDATE} from "../Store/TaskContext";
import Remarkable from "remarkable";
import { Swipeable } from 'react-swipeable'
import {fetchTasks, updateTask} from "../Auth/FirebaseService";
import {bgColor} from "../Util/Util";

const Task = ({props, id, title, description, status, color, order}) => {
    const taskContext = useContext(TaskContext);

    const [isExpanded, setExpanded] = useState(false);
    const [hasSwipedLeft, setSwipedLeft] = useState(false);
    const [hasSwipedRight, setSwipedRight] = useState(false);

    const handleEdit = async () => {
        taskContext.dispatch({type: EDIT, payload: {id, title, description, status, color, order}});
        props.history.push('/edit');
    };

    const handleExpand = () => {
        setExpanded(!isExpanded);
    };

    const getRawMarkup = () => {
        var md = new Remarkable('full');
        return { __html: md.render(description) };
    };

    const handleSwipeLeft = async (data) => {

        if (data.absX < 70) {
            return;
        }

        let fetchedTasks;
        switch (status) {
            case DOING:
                setSwipedLeft(true);
                await updateTask({id, title, description, status: TODO, color});
                fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                break;
            case DONE:
                setSwipedLeft(true);
                await updateTask({id, title, description, status: DOING, color});
                fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                break;
            default:
                return;
        }
    };

    const handleSwipeRight = async (data) => {

        if (data.absX < 70) {
            return;
        }

        let fetchedTasks;
        switch (status) {
            case TODO:
                setSwipedRight(true);
                await updateTask({id, title, description, status: DOING, color});
                fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                break;
            case DOING:
                setSwipedRight(true);
                await updateTask({id, title, description, status: DONE, color});
                fetchedTasks = await fetchTasks(props);
                taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
                break;
            default:
                return;
        }
    };

    const handleSwipeUp = async (data) => {
        const index = taskContext.state.tasks.findIndex(i => i.order === order);
        if (data.absY < 40) {
            return;
        }
        if (index === 0) {
            return;
        }
        const nextIndex = index - 1;
        const above = taskContext.state.tasks[nextIndex];
        const curr = {id, title, description, status, color, order};
        const newArr = JSON.parse(JSON.stringify(taskContext.state.tasks));
        newArr[nextIndex] = curr;
        newArr[index] = above;
        taskContext.dispatch({type: UPDATE, payload: newArr});

    };

    const handleSwipeDown = (data) => {
        const index = taskContext.state.tasks.findIndex(i => i.order === order);
        if (data.absY < 40) {
            return;
        }
        if (index === taskContext.state.tasks.length -1 ) {
            return;
        }
        const nextIndex = index + 1;
        const below = taskContext.state.tasks[nextIndex];
        const curr = {id, title, description, status, color, order};
        const newArr = JSON.parse(JSON.stringify(taskContext.state.tasks));
        newArr[nextIndex] = curr;
        newArr[index] = below;
        taskContext.dispatch({type: UPDATE, payload: newArr});
    };

    const taskClassName = () => {
        let className = bgColor(color) + " card mt-2 p-3 task ";
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
            <div className={taskClassName()} id={id}>
                <strong onClick={handleExpand}>{title}</strong>
                <p className={isExpanded ? "visible" : "d-none"} dangerouslySetInnerHTML={getRawMarkup()} />
                <button className={isExpanded ? "visible btn btn-outline-dark" : "d-none"} onClick={handleEdit}>EDIT</button>
            </div>
        </Swipeable>
    );
};

export default Task;