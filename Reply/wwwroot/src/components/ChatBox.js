'use strict';

import React from 'react';
import { Navbar, Nav, Grid, Row, Col, Input, Button } from 'react-bootstrap';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: null };
    }

    render() {
        return (
            <Navbar className="chat-box">
                <Nav>
                    <Grid>
                        <Row>
                            <Col xs={11}>
                                <Input type="textarea"
                                        placeholder="Say what?"
                                        value={this.state.value}
                                        onChange={this.setMessage.bind(this)} />
                            </Col>
                            <Col xs={1}>
                                <Button onClick={this.send.bind(this)}><i className="fa fa-paper-plane"></i></Button>
                            </Col>
                        </Row>
                    </Grid>
                </Nav>
            </Navbar>
        );
    }

    send() {
        if (this.state.value) {
            this.props.sendMessage(this.state.value);
            this.setState({ value: '' });
        }
    }

    setMessage(e) {
        this.setState({ value: e.target.value });
    }
}

export default ChatBox;
