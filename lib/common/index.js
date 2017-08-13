"use strict";

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
    }
};