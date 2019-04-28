"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isStorageAvailable = _interopRequireDefault(require("./is-storage-available"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _noop = function _noop() {};

var REACT_TABIFY_PREFIX = '__react-tabify__';
var STICKY_PREFIX = {
  TAB: 'TAB__'
};
var storage;

if ((0, _isStorageAvailable["default"])()) {
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

var LocalStorageService = {
  setStickyTab: function setStickyTab(key, value) {
    this.set(STICKY_PREFIX.TAB + key, value);
  },
  getStickyTab: function getStickyTab(key) {
    return this.get(STICKY_PREFIX.TAB + key);
  },
  set: function set(key, value) {
    try {
      storage.setItem(REACT_TABIFY_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.warn(error);
    }
  },
  get: function get(key) {
    var value = storage.getItem(REACT_TABIFY_PREFIX + key);

    if (value) {
      return JSON.parse(value);
    }
  }
};
var _default = LocalStorageService;
exports["default"] = _default;