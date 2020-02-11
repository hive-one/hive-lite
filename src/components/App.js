import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Header from './header';

import Home from '../routes/Home';
import Profile from '../routes/Profile';


function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path='/profile'>
                    <Profile />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
