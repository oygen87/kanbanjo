import React from 'react';
import Task from "../Components/Task";

const TaskList = ({props, list}) => {

    const taskList = list.map(item => <Task props={props}
                           key={item.id}
                           id={item.id}
                           task={item}/>);

    return (
        <div>
            {taskList}
        </div>
    );
};

export default TaskList;