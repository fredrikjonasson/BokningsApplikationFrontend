import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AddEventPage from './events/AddEventPage';
import ShowEventPage from './events/ShowEvent';
//import { Route, Link } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        {/* <App /> */}
        <AddEventPage />
        <ShowEventPage />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
