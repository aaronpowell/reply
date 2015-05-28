'use strict';

import React from 'react';
import userService from './services/userService';

class AuthenticatedRoute extends React.Component {
    static willTransitionTo(transition) {
        if (!userService.authenticated) {
            transition.redirect('login', {}, { 'nextPath': transition.path });
        }
    }

    constructor(props) {
        super(props);
    }
}

export default AuthenticatedRoute;
