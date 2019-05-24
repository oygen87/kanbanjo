import React from "react";
import {sortByOrderProp} from "../Util/Util";

export const UPDATE = "UPDATE";
export const EDIT = "EDIT";

export const TaskContext = React.createContext();

const initialState = {tasks: [], edit: {}};

const taskReducer = (state, action) => {
    switch (action.type) {
        case UPDATE:
            return { ...state, tasks: action.payload.sort(sortByOrderProp)};
            break;
        case EDIT:
            return { ...state, edit: action.payload};
            break;
        default:
            return state;
    }
};

export const TaskProvider = props => {


    const [state, dispatch] = React.useReducer(taskReducer, initialState);
    const value = { state, dispatch };

    return (
        <TaskContext.Provider value={value}>
            {props.children}
        </TaskContext.Provider>
    );
};