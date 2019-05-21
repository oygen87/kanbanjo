import React from 'react';
import Task from "../Components/Task";

const TaskList = ({props, list}) => {
    const taskList = list.sort().map(item => <Task props={props} key={item.id} id={item.id} title={item.title} description={item.description} status={item.status} color={item.color}/>);
    return (
        <div>
            {taskList}
        </div>
    );
};

export default TaskList;