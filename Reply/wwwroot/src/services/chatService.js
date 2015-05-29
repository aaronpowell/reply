'use strict';

import moment from 'moment';

class ChatService {
    constructor() {
        this.connection = $.hubConnection();

        this.proxy = this.connection.createHubProxy('chatHub');
        this.proxy.on('receiveMessage', ({ Id, Who, What, When }) => this.receiveMessage(Id, Who, What, When));
        this.proxy.on('loggedIn', () => this.loggedIn());
        this.proxy.on('usernameTaken', () => this.usernameTaken());
        this.proxy.on('userJoined', user => this.receiveMessage(Math.random(), 'replybot', `user ${user} has entered the building`, moment()));
        this.proxy.on('receiveMessageHistory', msgs => msgs.forEach(({ Id, Who, What, When }) => this.receiveMessage(Id, Who, What, When)));

        this.listeners = {
            login: [],
            message: [],
            connected: [],
            usernameTaken: []
        };
    }

    addEventListener(what, fn) {
        this.listeners[what].push(fn);
    }

    removeEventListener(what, fn) {
        var index = this.listeners[what].indexOf(fn);
        this.listeners[what].splice(index, 1);
    }

    connect(user) {
        this.connection.qs = { user };
        this.connection.start()
            .then(() => this.listeners.connected.forEach(fn => fn()))
            .then(() => this.proxy.invoke('getHistory'));
    }

    login(user) {
        this.connection.qs = { user };
        this.connection.start()
            .then(() => this.proxy.invoke('login'));
    }

    loggedIn() {
        this.listeners.login.forEach(fn => fn());
    }

    receiveMessage(id, who, what, when) {
        this.listeners.message.forEach(fn => fn({ id, who, what, when }));
    }

    usernameTaken() {
        this.connection.stop();
        this.listeners.usernameTaken.forEach(fn => fn());
    }
}

let chat = new ChatService();

export default {
    login(user) {
        chat.login(user);
    },

    connect(user) {
        chat.connect(user);
    },

    addEventListener(what, fn) {
        chat.addEventListener(what, fn);
    },

    removeEventListener(what, fn) {
        chat.removeEventListener(what, fn);
    },

    chat(msg) {
        chat.proxy.invoke('sendMessage', msg);
    }
};
