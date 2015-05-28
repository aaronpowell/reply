'use strict';

const storageKey = 'reply:user';

class UserService {
    constructor() {

    }

    get authenticated() {
        return !!this.currentUser();
    }

    get currentUser() {
        return localStorage.getItem(storageKey);
    }

    store(user) {
        localStorage.setItem(storageKey, user);
    }

    logout() {
        localStorage.removeItem(storageKey);
    }
}

export default new UserService();
