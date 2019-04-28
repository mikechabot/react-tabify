"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__getTypeMismatches = exports.__logTypeMismatches = exports.__getType = exports.__valOrDefault = exports.__isEmpty = exports.__hasValue = exports.__hasValues = void 0;

var _react = _interopRequireDefault(require("react"));

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

var _components = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __hasValues = function __hasValues() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return values.every(function (value) {
    return __hasValue(value);
  });
};

exports.__hasValues = __hasValues;

var __hasValue = function __hasValue(val) {
  return val !== undefined && val !== null;
};

exports.__hasValue = __hasValue;

var __isEmpty = function __isEmpty(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

exports.__isEmpty = __isEmpty;

var __valOrDefault = function __valOrDefault(accessor, defaultValue) {
  return _maybeBaby["default"].of(accessor).orElse(defaultValue).join();
};

exports.__valOrDefault = __valOrDefault;

var __getType = function __getType(instance) {
  if (!instance.type) return 'Unknown';

  if (typeof instance.type === 'function') {
    return instance.type.name;
  }

  return instance.type;
};

exports.__getType = __getType;

var __logTypeMismatches = function __logTypeMismatches(typeMismatches) {
  if (!typeMismatches) return;
  typeMismatches.forEach(function (typeMismatch) {
    console.error("Expected children of \"Tabs\" to be of type \"Tab\", but found type \"".concat(__getType(typeMismatch), "\""));
  });
};

exports.__logTypeMismatches = __logTypeMismatches;

var __getTypeMismatches = function __getTypeMismatches(tabs) {
  if (!tabs) return [];
  return tabs.filter(function (child) {
    return child.type !== _react["default"].createElement(_components.Tab, null).type;
  });
};

exports.__getTypeMismatches = __getTypeMismatches;