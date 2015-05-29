'use strict';

import React from 'react';
import Message from './Message';
import { Grid } from 'react-bootstrap';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid fluid>
                {this.props.messages.map(msg => <Message key={msg.id} msg={msg} />)}
            </Grid>
        );
    }
}

export default MessageList;
