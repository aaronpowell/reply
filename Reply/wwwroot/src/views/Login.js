'use strict';

import React from 'react';
import { Modal, Input, Button } from 'react-bootstrap';
import chatService from '../services/chatService';
import userService from '../services/userService';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { username: undefined };
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount() {
        chatService.addEventListener('login', this.onLogin);
    }

    componentDidUnmount() {
        chatService.removeEventListener('login', this.onLogin);
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
                </div>
                <div className="modal-footer">
                    <Button onClick={this.login.bind(this)}>Login</Button>
                </div>
            </Modal>
        );
    }

    login() {
        if (this.state.username) {
            chatService.login(this.username);
        }
    }

    setUsername(e) {
        this.setState({ username: e.target.value });
    }

    onLogin(status) {
        if (!status) {
            this.setState({ alert: true });
        } else {
            this.setState({ alert: false });
            userService.store(this.state.username);
            this.context.router.transitionTo('/');
        }
    }
}

Login.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Login;
