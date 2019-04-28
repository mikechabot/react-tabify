"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var LOCAL_STORAGE = 'localStorage';
var STORAGE_TEST = '__storage_test__';
var ERROR_TYPE = {
  QUOTA_EXCEEDED_ERROR: 'QuotaExceededError',
  NS_ERROR_DOM_QUOTA_REACHED: 'NS_ERROR_DOM_QUOTA_REACHED'
};
var ERROR_CODE = {
  NOT_FIREFOX: 22,
  FIREFOX: 1014
};
/**
 * Idiomatic way to check for the existence of LocalStorage
 * See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
 * @param type
 * @return {boolean}
 */

function isStorageAvailable() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LOCAL_STORAGE;
  var storage;

  try {
    storage = window[type];
    var x = STORAGE_TEST;
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (e.code === ERROR_CODE.NOT_FIREFOX || // Everything except Firefox
    e.code === ERROR_CODE.FIREFOX || // Firefox
    e.name === ERROR_TYPE.QUOTA_EXCEEDED_ERROR || // Everything except Firefox
    e.name === ERROR_TYPE.NS_ERROR_DOM_QUOTA_REACHED) && // Firefox
    storage.length !== 0;
  }
}

var _default = isStorageAvailable;
exports["default"] = _default;