'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__getTypeMismatches = exports.__logTypeMismatches = exports.__getType = exports.__valOrDefault = exports.__isEmpty = exports.__hasValue = exports.__hasValues = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __hasValues = exports.__hasValues = function __hasValues() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
    }

    return values.every(function (value) {
        return __hasValue(value);
    });
};

var __hasValue = exports.__hasValue = function __hasValue(val) {
    return val !== undefined && val !== null;
};

var __isEmpty = exports.__isEmpty = function __isEmpty(obj) {
    if (!obj) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

var __valOrDefault = exports.__valOrDefault = function __valOrDefault(accessor, defaultValue) {
    return _maybeBaby2.default.of(accessor).orElse(defaultValue).join();
};

var __getType = exports.__getType = function __getType(instance) {
    if (!instance.type) return 'Unknown';
    if (typeof instance.type === 'function') {
        return instance.type.name;
    }
    return instance.type;
};

var __logTypeMismatches = exports.__logTypeMismatches = function __logTypeMismatches(typeMismatches) {
    if (!typeMismatches) return;
    typeMismatches.forEach(function (typeMismatch) {
        console.error('Expected children of "Tabs" to be of type "Tab", but found type "' + __getType(typeMismatch) + '"');
    });
};

var __getTypeMismatches = exports.__getTypeMismatches = function __getTypeMismatches(tabs) {
    if (!tabs) return [];
    return tabs.filter(function (child) {
        return child.type !== _react2.default.createElement(_components.Tab, null).type;
    });
};