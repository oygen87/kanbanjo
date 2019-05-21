import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthProvider} from "./Store/AuthContext";
import {ViewProvider} from "./Store/ViewContext";
import * as serviceWorker from './serviceWorker';
import {TaskProvider} from "./Store/TaskContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.css";

ReactDOM.render(
    <AuthProvider>
        <ViewProvider>
            <TaskProvider>
                <App/>
            </TaskProvider>
        </ViewProvider>
    </AuthProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
