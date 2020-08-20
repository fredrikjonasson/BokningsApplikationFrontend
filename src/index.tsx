import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import AddEventPage from './events/AddEventPage';
import ShowEventPage from './events/ShowEvent';
import EditEventPage from './events/EditEventPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import EditAndListInvites from './participants/EditAndListInvites';
import ListParticipantsPage from './participants/ListParticipantsPage';
import InvitationPage from './participants/InvitationPage';
//import { Route, Link } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/edit" component={EditEventPage} />
                <Route path="/participant" component={ListParticipantsPage} />
                <Route path='/invitations/:id' component={InvitationPage} />
                <Route path="/">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/edit">edit</Link>
                            </li>
                        </ul>
                    </nav>
                    <AddEventPage />
                    <ShowEventPage />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
