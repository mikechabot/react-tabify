import isStorageAvailable from './is-storage-available';
const _noop = () => {};

const REACT_TABIFY_PREFIX = '__react-tabify__';

const STICKY_PREFIX = {
    TAB: 'TAB__'
};

let storage;
if (isStorageAvailable()) {
    storage = window.localStorage;
} else {
    storage = {
        clear: _noop,
        getItem: _noop,
        key: _noop,
        removeItem: _noop,
        setItem: _noop
    };
    console.warn('LocalStorage not supported. Sticky settings will not work.');
}

const LocalStorageService = {
    setStickyTab(key, value) {
        this.set(STICKY_PREFIX.TAB + key, value);
    },
    getStickyTab(key) {
        return this.get(STICKY_PREFIX.TAB + key);
    },
    set(key, value) {
        try {
            storage.setItem(REACT_TABIFY_PREFIX + key, JSON.stringify(value));
        } catch (error) {
            console.warn(error);
        }
    },
    get(key) {
        const value = storage.getItem(REACT_TABIFY_PREFIX + key);
        if (value) {
            return JSON.parse(value);
        }
    }
};

export default LocalStorageService;
