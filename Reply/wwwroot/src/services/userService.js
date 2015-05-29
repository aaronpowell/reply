'use strict';

const storageKey = 'reply:user';

let storage = localStorage;

class UserService {
    constructor() {

    }

    get authenticated() {
        return !!this.currentUser;
    }

    get currentUser() {
        return storage.getItem(storageKey);
    }

    store(user) {
        storage.setItem(storageKey, user);
    }

    logout() {
        storage.removeItem(storageKey);
    }
}

export default new UserService();
