'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Flex;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Flex(_ref) {
    var id = _ref.id,
        style = _ref.style,
        className = _ref.className,
        column = _ref.column,
        vAlignCenter = _ref.vAlignCenter,
        hAlignCenter = _ref.hAlignCenter,
        alignItems = _ref.alignItems,
        justifyContent = _ref.justifyContent,
        flexShrink = _ref.flexShrink,
        flex = _ref.flex,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        border = _ref.border,
        margin = _ref.margin,
        padding = _ref.padding,
        backgroundColor = _ref.backgroundColor,
        onMouseOver = _ref.onMouseOver,
        onMouseOut = _ref.onMouseOut,
        onClick = _ref.onClick,
        children = _ref.children;

    var cssClasses = (className || '') + ' xcms-flex';
    return _react2.default.createElement(
        'div',
        {
            id: id,
            className: cssClasses,
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut,
            onClick: onClick,
            style: _extends(_extends({}, column ? { flexDirection: 'column' } : {}), { alignItems: alignItems, justifyContent: justifyContent }, vAlignCenter ? column ? { justifyContent: 'center' } : { alignItems: 'center' } : {}, hAlignCenter ? column ? { alignItems: 'center' } : { justifyContent: 'center' } : {}, { color: color, border: border, backgroundColor: backgroundColor, width: width, height: height, margin: margin, padding: padding, flex: flex, flexShrink: flexShrink }, style) },
        children
    );
}

Flex.propTypes = {
    id: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string,
    column: _react2.default.PropTypes.bool,
    vAlignCenter: _react2.default.PropTypes.bool,
    hAlignCenter: _react2.default.PropTypes.bool,
    alignItems: _react2.default.PropTypes.string,
    justifyContent: _react2.default.PropTypes.string,
    flexShrink: _react2.default.PropTypes.number,
    flex: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    height: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    color: _react2.default.PropTypes.string,
    border: _react2.default.PropTypes.string,
    margin: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    padding: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    backgroundColor: _react2.default.PropTypes.string,
    onMouseOver: _react2.default.PropTypes.func,
    onMouseOut: _react2.default.PropTypes.func,
    onClick: _react2.default.PropTypes.func,
    children: _react2.default.PropTypes.node
};