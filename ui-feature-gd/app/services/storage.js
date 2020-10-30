

export function isSessionStorageAccessPermitted() {
    try {
        return !!window.sessionStorage;
    } catch (err) {
        return false;
    }
}

export function isLocalStorageAccessPermitted() {
    try {
        return !!window.localStorage;
    } catch (err) {
        return false;
    }
}

class MockStorage {
    static _storage = new Map();
    static getItem(key) {
        return MockStorage._storage.get(key);
    }
    static setItem(key, value) {
        return MockStorage._storage.set(key, value);
    }
    static clear() {
        return MockStorage._storage.clear();
    }
}

class BrowserStorage {
    static _storage;
    static initializeStorage() {
        
        if (isLocalStorageAccessPermitted()){
            BrowserStorage._storage = window.localStorage;
        }else if (isSessionStorageAccessPermitted()){
            BrowserStorage._storage = window.sessionStorage;
        } else{
            BrowserStorage._storage = MockStorage;
        }
        
         
        
                        
           
    }
    static getItem(...args) {
    
        return BrowserStorage._storage && BrowserStorage._storage.getItem(...args);
    }

    static setItem(...args) {

        return BrowserStorage._storage && BrowserStorage._storage.setItem(...args);
    }
    static removeItem(...args) {
        return BrowserStorage._storage && BrowserStorage._storage.removeItem(...args);
    }

    static clearAll() {
        if(isLocalStorageAccessPermitted()){
            localStorage.clear();
        }        
        return BrowserStorage._storage && BrowserStorage._storage.clear();
    }

    static setLocalSession(...args){
        if(isLocalStorageAccessPermitted()){
            return localStorage.setItem(...args);
        }
    }

    static getLocalSession(...args){
        if(isLocalStorageAccessPermitted()){
           return localStorage.getItem(...args);
        }else{
            return '';
        }
    }

    static removeLocalSession(...args){
        if(isLocalStorageAccessPermitted()){
            return localStorage.removeItem(...args);
        }
    }

    static clear(...args) {
        return BrowserStorage._storage && BrowserStorage._storage.clear(...args);
    }

}

export default BrowserStorage;