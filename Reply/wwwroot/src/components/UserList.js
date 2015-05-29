'use strict';

import React from 'react';

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside className="user-list">
                <h4>Users online</h4>
                <ul>
                    {this.props.users.map(u => <li key={u}>{u}</li>)}
                </ul>
            </aside>
        );
    }
}

export default UserList;
