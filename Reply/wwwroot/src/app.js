'use strict';
import React from 'react';
import Router, { Route, DefaultRoute, HistoryLocation } from 'react-router';
import Reply from './reply';
import Home from './views/home';
import Login from './views/Login';

const routes = (
    <Route handler={Reply} path='/'>
        <DefaultRoute handler={Home} />
        <Route name='login' handler={Login} path='/login/?:nextPath?' />
    </Route>
);

Router.run(routes, HistoryLocation, Handler => {
    React.render(<Handler />, document.getElementById('app'));
});
