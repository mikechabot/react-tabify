'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Flex = require('./common/Flex');

var _Flex2 = _interopRequireDefault(_Flex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tab(_ref) {
    var id = _ref.id,
        style = _ref.style,
        children = _ref.children,
        stacked = _ref.stacked;

    return _react2.default.createElement(
        _Flex2.default,
        {
            id: id,
            className: (!stacked ? 'slds-tabs--default__content' : '') + ' slds-show',
            style: _extends({ width: '100%' }, { height: !stacked ? 'calc(100% - 40px)' : '100%', overflowY: 'auto' }, style)
        },
        children
    );
}

Tab.propTypes = {
    id: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    children: _react2.default.PropTypes.node,
    style: _react2.default.PropTypes.object,
    show: _react2.default.PropTypes.bool,
    stacked: _react2.default.PropTypes.bool,
    eventKey: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
};

exports.default = Tab;