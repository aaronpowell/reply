'use strict';

import chatService from './chatService';

const storageKey = 'reply:user';

let storage = localStorage;
let allUsers = [];
let listeners = {
    updateUserList: []
};

class UserService {
    constructor() {
        chatService.addEventListener('updateUserList', users => {
            allUsers = allUsers.concat(users);
            listeners.updateUserList.forEach(fn => fn());
        });
    }

    get authenticated() {
        return !!this.currentUser;
    }

    get currentUser() {
        return storage.getItem(storageKey);
    }

    get everyone() {
        return allUsers.map(u => u);
    }

    store(user) {
        storage.setItem(storageKey, user);
    }

    logout() {
        storage.removeItem(storageKey);
    }

    addEventListener(what, fn) {
        listeners[what].push(fn);
    }
}

export default new UserService();
