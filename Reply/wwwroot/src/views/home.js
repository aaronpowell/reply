'use strict';

import React from 'react';
import chatService from '../services/chatService';
import userService from '../services/userService';
import MessageList from './MessageList';
import ChatBox from './ChatBox';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.onConnect = this.onConnect.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.state = { ready: false, msgs: [] };
    }

    componentDidMount() {
        chatService.addEventListener('connected', this.onConnect);
        chatService.addEventListener('message', this.onMessageReceived);
        chatService.connect(userService.currentUser);
    }

    render() {
        if (!this.state.ready) {
            return <h1>Connecting...</h1>;
        }

        return (
            <div>
                <MessageList messages={this.state.msgs.slice(0, 50)} />
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
