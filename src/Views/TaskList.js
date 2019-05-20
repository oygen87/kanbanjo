import React from 'react';
import Task from "../Components/Task";

const TaskList = ({list}) => {
    return (
        <div>
            {list.map(item => <Task key={item.id} id={item.id} title={item.title} description={item.description} status={item.status} color={item.color}/>)}
        </div>
    );
};

export default TaskList;