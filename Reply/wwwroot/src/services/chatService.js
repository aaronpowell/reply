'use strict';

class ChatService {
    constructor() {
        this.connection = $.hubConnection();

        this.proxy = this.connection.createHubProxy('chatHub');
        this.proxy.on('receiveMessage', (id, who, what, when) => this.receiveMessage(id, who, what, when));
        this.proxy.on('loggedIn', status => this.loggedIn(status));

        this.listeners = {
            login: [],
            message: [],
            connected: []
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
            .then(() => this.listeners.connected.forEach(fn => fn()));
    }

    login(user) {
        this.connection.qs = { user };
        this.connection.start()
            .then(() => this.proxy.invoke('login'));
    }

    loggedIn(status) {
        this.listeners.login.forEach(fn => fn(status));
    }

    receiveMessage(id, who, what, when) {
        this.listeners.message.forEach(fn => fn({ id, who, what, when }));
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
