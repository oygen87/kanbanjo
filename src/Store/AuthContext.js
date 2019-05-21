import React from "react";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const initialState = {
    isLoggedIn: false,
};

export const AuthContext = React.createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLoggedIn: true };
            break;
        case LOGOUT:
            return { ...state, isLoggedIn: false};
            break;
        default:
            return state;
    }
};

export const AuthProvider = props => {
    const [state, dispatch] = React.useReducer(authReducer, initialState);
    const value = { state, dispatch };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};
