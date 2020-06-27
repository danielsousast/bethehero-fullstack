import React from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import NewIncident from '../pages/NewIncident';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} isAuth/>
                <Route path="/register" component={Register} isAuth/>
                <Route path="/profile" component={Profile} isPrivate/>
                <Route path="/incidents/new" component={NewIncident} isPrivate/>
                <Route path="/incidents/edit/:id" component={NewIncident} isPrivate/>
            </Switch>
        </BrowserRouter>
    )
}