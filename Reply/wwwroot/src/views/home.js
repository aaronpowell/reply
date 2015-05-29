/*eslint no-unused-vars:0*/
'use strict';

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AuthenticatedRoute from '../AuthenticatedRoute';
import chatService from '../services/chatService';
import userService from '../services/userService';
import MessageList from '../components/MessageList';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';

class Home extends AuthenticatedRoute {
    constructor(props) {
        super(props);

        this.onConnect = this.onConnect.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.state = { ready: false, msgs: [], users: [] };
    }

    componentDidMount() {
        chatService.addEventListener('connected', this.onConnect);
        chatService.addEventListener('message', this.onMessageReceived);
        chatService.connect(userService.currentUser);

        userService.addEventListener('updateUserList', () => this.setState({ users: userService.everyone }));
    }

    render() {
        if (!this.state.ready) {
            return <h1>Connecting...</h1>;
        }

        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={10}>
                            <MessageList messages={this.state.msgs.slice(0, 50)} />
                        </Col>
                        <Col xs={2}>
                            <UserList users={this.state.users} />
                        </Col>
                    </Row>
                </Grid>
                <ChatBox sendMessage={this.sendMessage.bind(this)} />
            </div>
        );
    }

    onConnect() {
        this.setState({ ready: true });
    }

    onMessageReceived(msg) {
        var msgs = this.state.msgs;
        msgs.push(msg);
        this.setState({ msgs });
    }

    sendMessage(msg) {
        chatService.chat(msg);
    }
}

export default Home;
