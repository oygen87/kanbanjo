import React from "react";

export const TODO = "TODO";
export const DOING = "DOING";
export const DONE = "DONE";
export const NEW = "NEW";
export const EDIT = "EDIT";

const initialState = {
    currentView: TODO,
};

export const ViewContext = React.createContext(initialState);

const viewReducer = (state, action) => {
    switch (action.type) {
        case TODO:
            return { ...state, currentView: TODO };
            break;
        case DOING:
            return { ...state, currentView: DOING};
            break;
        case DONE:
            return { ...state, currentView: DONE};
            break;
        case NEW:
            return { ...state, currentView: NEW};
            break;
        case EDIT:
            return { ...state, currentView: EDIT};
            break;
        default:
            return state;
    }
};

export const ViewProvider = props => {
    const [state, dispatch] = React.useReducer(viewReducer, initialState);
    const value = { state, dispatch };
    return (
        <ViewContext.Provider value={value}>
            {props.children}
        </ViewContext.Provider>
    );
};