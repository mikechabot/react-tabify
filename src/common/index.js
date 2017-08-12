'use strict';

export default {
    __clone (obj) {
        if (!obj) return;
        return JSON.parse(JSON.stringify(obj));
    },
    __hasValue (val) {
        return val !== undefined && val !== null;
    },
    __hasChanged (o1, o2) {
        return JSON.stringify(o1) !== JSON.stringify(o2);
    }
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
