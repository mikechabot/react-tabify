export default {
    __clone (obj) {
        if (!obj) return;
        return JSON.parse(JSON.stringify(obj));
    },
    __hasValue (val) {
        return val !== undefined && val !== null;
    }
};