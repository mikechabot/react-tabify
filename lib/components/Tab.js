"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _common = require("./common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Tab(_ref) {
  var id = _ref.id,
      style = _ref.style,
      children = _ref.children;
  return _react["default"].createElement(_common.TabDiv, {
    id: id,
    style: style
  }, children);
}

Tab.propTypes = {
  id: _propTypes["default"].string,
  label: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].node]),
  children: _propTypes["default"].node,
  style: _propTypes["default"].object,
  hide: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),
  eventKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
};
var _default = Tab;
exports["default"] = _default;