'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    __clone: function __clone(obj) {
        if (!obj) return;
        return JSON.parse(JSON.stringify(obj));
    },
    __hasValue: function __hasValue(val) {
        return val !== undefined && val !== null;
    },
    __hasChanged: function __hasChanged(o1, o2) {
        return JSON.stringify(o1) !== JSON.stringify(o2);
    }
};


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};