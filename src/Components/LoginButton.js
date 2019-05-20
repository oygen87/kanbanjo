import React, {useContext, useState} from 'react';
import {AuthContext, LOGIN} from "../Store/AuthContext";
import {fetchTasks, loginWithGitHub} from "../Auth/FirebaseService";
import {TaskContext, UPDATE} from "../Store/TaskContext";
import {TODO} from "../Store/ViewContext";

const LoginButton = ({props}) => {
    const authContext = useContext(AuthContext);
    const taskContext = useContext(TaskContext);

    const [isLoading, setLoading] = useState(false);

    const login = async () => {
        try {
            setLoading(true);
            await loginWithGitHub();
            const fetchedTasks = await fetchTasks(props);
            taskContext.dispatch({type: UPDATE, payload: fetchedTasks});
            authContext.dispatch({type: LOGIN});
            props.history.push({pathname: '/kanban', state: {view: TODO}});
        } catch (error) {
            setLoading(false);
            // TODO : implement error handling
        }
    };

    return (
        <>
            {isLoading &&
            <button className="btn btn-lg btn-success" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
            </button>}

            {!isLoading && <button className="btn btn-lg btn-success" onClick={login}><i className="fab fa-github"/> Login with Github</button>}

        </>
    );
};

export default LoginButton;