import React from 'react';
import Task from "../Components/Task";

const TaskList = ({props, list}) => {
    const sortByOrderProp = (a, b) => {
        return b.name < a.name ?  1 : b.name > a.name ? -1 : 0;
    };
    const taskList = list.sort(sortByOrderProp).map(item => <Task props={props}
                                                   key={item.id}
                                                   id={item.id}
                                                   title={item.title}
                                                   description={item.description}
                                                   status={item.status}
                                                   color={item.color} order={item.order}/>);
    return (
        <div>
            {taskList}
        </div>
    );
};

export default TaskList;