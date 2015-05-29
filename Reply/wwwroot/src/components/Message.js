'use strict';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { who, what, when } = this.props.msg;

        var formattedWhen = moment(when).format('d-MMM-YYYY H:m:s');

        return (
            <Row className="message">
                <Col xs={2}>
                    <strong>{who}</strong>
                    <time dateTime={formattedWhen}>{formattedWhen}</time>
                </Col>
                <Col xs={10}><p>{what}</p></Col>
            </Row>
        );
    }
}

export default Message;
