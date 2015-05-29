'use strict';

import React from 'react';
import { Modal, Input, Button, Alert } from 'react-bootstrap';
import chatService from '../services/chatService';
import userService from '../services/userService';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { username: undefined };
        this.onLogin = this.onLogin.bind(this);
        this.onUsernameTaken = this.onUsernameTaken.bind(this);
    }

    componentDidMount() {
        chatService.addEventListener('login', this.onLogin);
        chatService.addEventListener('usernameTaken', this.onUsernameTaken);
    }

    componentDidUnmount() {
        chatService.removeEventListener('login', this.onLogin);
        chatService.removeEventListener('usernameTaken', this.onUsernameTaken);
    }

    render() {
        return (
            <Modal title="Login" onRequestHide={() => {}}>
                <div className="modal-body">
                    <Input type="text"
                            label="Username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.setUsername.bind(this)} />
                    {this.renderAlert()}
                </div>
                <div className="modal-footer">
                    <Button onClick={this.login.bind(this)}>Login</Button>
                </div>
            </Modal>
        );
    }

    renderAlert() {
        if (this.state.alert) {
            return (
                <Alert bsStyle="danger">
                    <h4>Dude!</h4>
                    <p>Someone else already has that username, you can't have it too. Be more original!</p>
                </Alert>
            );
        }
        return null;
    }

    login() {
        if (this.state.username) {
            chatService.login(this.state.username);
        }
    }

    setUsername(e) {
        this.setState({ username: e.target.value });
    }

    onLogin() {
        this.setState({ alert: false });
        userService.store(this.state.username);
        this.context.router.transitionTo('/');
    }

    onUsernameTaken() {
        this.setState({ alert: true });
    }
}

Login.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Login;
