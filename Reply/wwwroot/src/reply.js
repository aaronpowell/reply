'use strict';

import React from 'react';
import { RouteHandler, Navigation, State } from 'react-router';
import { Navbar } from 'react-bootstrap';

class Reply extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar brand="Reply" className="navbar-inverse">
                </Navbar>
                <RouteHandler {...this.props} />
            </div>
        );
    }
}

Reply.mixins = [Navigation, State];

export default Reply;
