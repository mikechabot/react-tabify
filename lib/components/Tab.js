'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tab(_ref) {
    var id = _ref.id,
        style = _ref.style,
        stacked = _ref.stacked,
        children = _ref.children;

    return _react2.default.createElement(
        _common.Flex,
        {
            id: id,
            style: style,
            stacked: stacked,
            height: '100%',
            width: '100%' },
        children
    );
}

Tab.propTypes = {
    id: _propTypes2.default.string,
    label: _propTypes2.default.string,
    children: _propTypes2.default.node,
    style: _propTypes2.default.object,
    show: _propTypes2.default.bool,
    stacked: _propTypes2.default.bool,
    eventKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = Tab;