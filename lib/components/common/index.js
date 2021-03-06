"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabDiv = exports.MenuLink = exports.MenuLI = exports.MenuUL = exports.MenuList = exports.TabLI = exports.TabUL = exports.TabLink = exports.TabList = exports.Flex = exports.DEFAULT_THEME = void 0;

var _glamorous = _interopRequireDefault(require("glamorous"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var COLOR = {
  LINK: '#3273dc',
  GREY_DARK: '#4a4a4a',
  GREY_DARKER: '#363636',
  GREY_LIGHTER: '#dbdbdb',
  WHITESMOKE: 'whitesmoke',
  WHITE: '#FFFFFF'
};
var DEFAULT_THEME = {
  tabs: {
    color: COLOR.GREY_DARK,
    borderBottomColor: COLOR.GREY_LIGHTER,
    active: {
      borderBottomColor: COLOR.LINK,
      color: COLOR.LINK
    },
    hover: {
      borderBottomColor: COLOR.GREY_DARKER,
      color: COLOR.GREY_DARKER
    }
  },
  menu: {
    color: COLOR.GREY_DARK,
    borderRight: COLOR.GREY_LIGHTER,
    active: {
      backgroundColor: COLOR.LINK,
      color: COLOR.WHITE
    },
    hover: {
      color: COLOR.GREY_DARKER,
      backgroundColor: COLOR.WHITESMOKE
    }
  }
};
exports.DEFAULT_THEME = DEFAULT_THEME;
var ALLOWED_FLEX_PROPS = ['alignItems', 'background', 'backgroundColor', 'border', 'borderRadius', 'boxShadow', 'color', 'cursor', 'flex', 'flexGrow', 'flexShrink', 'flexWrap', 'fontSize', 'height', 'justifyContent', 'margin', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'overflow', 'overflowX', 'overflowY', 'padding', 'width'];

var __getExplicitFlexStyles = function __getExplicitFlexStyles(props, propKeys) {
  if (!propKeys) throw new Error('Missing required propKeys');
  if (!Array.isArray(propKeys)) throw new Error('propKeys must be an Array');
  return propKeys.map(function (prop) {
    return props[prop] !== null && props[prop] !== undefined ? _defineProperty({}, prop, props[prop]) : null;
  }).filter(function (rule) {
    return rule;
  });
};

var __getImplicitFlexProps = function __getImplicitFlexProps(props) {
  var implicit = [];

  if (props.column) {
    implicit.push({
      flexDirection: 'column '
    });
  }

  if (props.hAlignCenter) {
    implicit.push(props.column ? {
      alignItems: 'center'
    } : {
      justifyContent: 'center'
    });
  }

  if (props.vAlignCenter) {
    implicit.push(props.column ? {
      justifyContent: 'center'
    } : {
      alignItems: 'center'
    });
  }

  return implicit;
};

var Flex = _glamorous["default"].div({
  display: 'flex'
}, function (props) {
  return [].concat(_toConsumableArray(__getImplicitFlexProps(props)), _toConsumableArray(__getExplicitFlexStyles(props, ALLOWED_FLEX_PROPS)));
});

exports.Flex = Flex;

var TabList = _glamorous["default"].div({
  userSelect: 'none',
  alignItems: 'stretch',
  display: 'flex',
  fontSize: '1rem',
  justifyContent: 'space-between',
  overflow: 'hidden',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  WebkitOverflowScrolling: 'touch'
});

exports.TabList = TabList;

var TabLink = _glamorous["default"].a({
  cursor: 'pointer',
  alignItems: 'center',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '-1px',
  padding: '0.5em 1em',
  verticalAlign: 'top'
}, function (_ref2) {
  var isActive = _ref2.isActive,
      theme = _ref2.theme;
  var styles = [{
    color: theme.tabs.color,
    borderBottomColor: theme.tabs.borderBottomColor
  }];

  if (isActive) {
    var active = theme.tabs.active;
    styles.push({
      color: active.color,
      borderBottomColor: active.borderBottomColor,
      ':hover': active
    });
  } else {
    styles.push({
      ':hover': theme.tabs.hover
    });
  }

  return styles;
});

exports.TabLink = TabLink;

var TabUL = _glamorous["default"].ul({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  alignItems: 'center',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  display: 'flex',
  flexGrow: 1,
  flexShrink: 0,
  justifyContent: 'flex-start'
}, function (_ref3) {
  var theme = _ref3.theme;
  return [{
    borderBottomColor: theme.tabs.borderBottomColor
  }];
});

exports.TabUL = TabUL;

var TabLI = _glamorous["default"].li({
  display: 'block'
}); // Vertical Menu


exports.TabLI = TabLI;

var MenuList = _glamorous["default"].div({
  fontSize: '1rem',
  overflowY: 'auto'
}, function (_ref4) {
  var theme = _ref4.theme;
  return [{
    borderRight: "1px solid ".concat(theme.menu.borderRight)
  }];
});

exports.MenuList = MenuList;

var MenuUL = _glamorous["default"].ul({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  lineHeight: 1.25
});

exports.MenuUL = MenuUL;

var MenuLI = _glamorous["default"].li({});

exports.MenuLI = MenuLI;

var MenuLink = _glamorous["default"].a({
  cursor: 'pointer',
  display: 'block',
  padding: '0.5em 0.75em'
}, function (_ref5) {
  var isActive = _ref5.isActive,
      theme = _ref5.theme;
  var styles = [{
    color: theme.menu.color
  }];

  if (isActive) {
    var active = theme.menu.active;
    styles.push({
      color: active.color,
      backgroundColor: active.backgroundColor,
      ':hover': active
    });
  } else {
    styles.push({
      ':hover': theme.menu.hover
    });
  }

  return styles;
});

exports.MenuLink = MenuLink;

var TabDiv = _glamorous["default"].div({
  height: '100%',
  width: '100%',
  overflow: 'auto'
});

exports.TabDiv = TabDiv;