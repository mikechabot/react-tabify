'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamorous = require('glamorous');

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_ID = '__react-tabify__';

var Tabs = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                activeKey = _props.activeKey,
                defaultActiveKey = _props.defaultActiveKey;


            if (__hasValue(activeKey)) {
                return;
            }

            var uncontrolledActiveKey = 0;
            if (__hasValue(defaultActiveKey)) {
                uncontrolledActiveKey = defaultActiveKey;
            }

            this.setState({ uncontrolledActiveKey: uncontrolledActiveKey });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                stacked = _props2.stacked,
                theme = _props2.theme,
                style = _props2.style;


            var tabs = __getTabs(children);

            __detectDescendantTypeMismatches(tabs);
            __detectControlledUncontrolledPropMismatches(this.props.activeKey, this.props.defaultActiveKey, this.props.onSelect);

            var MenuWrapper = !stacked ? _common.TabList : _common.MenuList;

            var derivedTheme = _extends({}, _common.DEFAULT_THEME, theme || {});

            return _react2.default.createElement(
                _glamorous.ThemeProvider,
                { theme: derivedTheme },
                _react2.default.createElement(
                    _common.Flex,
                    { id: this._getId(), column: !stacked, flex: 1, style: style },
                    _react2.default.createElement(
                        MenuWrapper,
                        null,
                        this._renderTabLinks(tabs, stacked)
                    ),
                    _react2.default.createElement(
                        _common.Flex,
                        { overflow: 'hidden', flex: 1, id: 'tab-content-' + this._getId() },
                        this._renderTabContent(tabs)
                    )
                )
            );
        }
    }, {
        key: '_renderTabLinks',
        value: function _renderTabLinks(tabs, stacked) {
            if (!stacked) {
                return this._renderHorizontalTabLinks(tabs);
            }
            return this._renderVerticalTabLinks(tabs);
        }
    }, {
        key: '_renderHorizontalTabLinks',
        value: function _renderHorizontalTabLinks(tabs) {
            return _react2.default.createElement(
                _common.TabUL,
                null,
                tabs.map(this._renderTabLink.bind(this, _common.TabLI, _common.TabLink))
            );
        }
    }, {
        key: '_renderVerticalTabLinks',
        value: function _renderVerticalTabLinks(tabs) {
            return _react2.default.createElement(
                _common.MenuUL,
                null,
                tabs.map(this._renderTabLink.bind(this, _common.MenuLI, _common.MenuLink))
            );
        }
    }, {
        key: '_renderTabLink',
        value: function _renderTabLink(ListItem, Anchor, child, index) {
            var _child$props = child.props,
                label = _child$props.label,
                eventKey = _child$props.eventKey;

            var isActive = eventKey === this._getActiveKey();
            return _react2.default.createElement(
                ListItem,
                {
                    id: this._getId() + '-tab-item-' + eventKey,
                    key: index,
                    isActive: isActive,
                    onClick: this._handleTabSelect.bind(this, eventKey)
                },
                _react2.default.createElement(
                    Anchor,
                    { isActive: isActive },
                    label
                )
            );
        }
    }, {
        key: '_renderTabContent',
        value: function _renderTabContent(tabs) {
            var _this2 = this;

            return tabs.map(function (tab, key) {
                return tab.props.eventKey === _this2._getActiveKey() ? _react2.default.cloneElement(tab, { stacked: _this2._isStacked(), key: key }) : null;
            }).filter(function (tab) {
                return tab;
            });
        }
    }, {
        key: '_handleTabSelect',
        value: function _handleTabSelect(eventKey) {
            if (this.props.onSelect) {
                this.props.onSelect(eventKey);
            } else if (eventKey !== this.state.uncontrolledActiveKey) {
                this.setState({ uncontrolledActiveKey: eventKey });
            }
        }
    }, {
        key: '_getActiveKey',
        value: function _getActiveKey() {
            return __hasValue(this.props.activeKey) ? this.props.activeKey : this.state.uncontrolledActiveKey;
        }
    }, {
        key: '_isStacked',
        value: function _isStacked() {
            return this.props.stacked === true;
        }
    }, {
        key: '_getId',
        value: function _getId() {
            return this.props.id || DEFAULT_ID;
        }
    }]);

    return Tabs;
}(_react2.default.Component);

var __getTabs = function __getTabs(children) {
    var tabs = !Array.isArray(children) ? [children] : children;
    return tabs.map(function (tab, index) {
        if (!tab) return false;
        if (!__hasValue(tab.eventKey)) {
            tab.eventKey = index;
        }
        return tab.hide !== false;
    }).filter(function (tab) {
        return tab;
    });
};

var __detectDescendantTypeMismatches = function __detectDescendantTypeMismatches(tabs) {
    var typeMismatches = __getTypeMismatches(tabs);
    if (typeMismatches.length > 0) {
        __logTypeMismatches(typeMismatches);
        throw new Error('Descendant type mismatches detected');
    }
};

var __getTypeMismatches = function __getTypeMismatches(tabs) {
    if (!tabs) return [];
    return tabs.filter(function (child) {
        return child.type !== _react2.default.createElement(_Tab2.default, null).type;
    });
};

var __logTypeMismatches = function __logTypeMismatches(typeMismatches) {
    if (!typeMismatches) return;
    typeMismatches.forEach(function (typeMismatch) {
        console.error('Expected children of "Tabs" to be of type "Tab", but found type "' + __getType(typeMismatch) + '"');
    });
};

var __detectControlledUncontrolledPropMismatches = function __detectControlledUncontrolledPropMismatches(activeKey, defaultActiveKey, onSelect) {
    if (__hasValues(activeKey, defaultActiveKey)) {
        throw new Error('Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both');
    }
    if (__hasValues(defaultActiveKey, onSelect)) {
        throw new Error('Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey');
    }
};

var __getType = function __getType(instance) {
    if (!instance.type) return 'Unknown';
    if (typeof instance.type === 'function') {
        return instance.type.name;
    }
    return instance.type;
};

var __hasValues = function __hasValues() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
    }

    return values.every(function (value) {
        return __hasValue(value);
    });
};

var __hasValue = function __hasValue(val) {
    return val !== undefined && val !== null;
};

Tabs.propTypes = {
    id: _propTypes2.default.string,
    defaultActiveKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    activeKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    stacked: _propTypes2.default.bool,
    onSelect: _propTypes2.default.func,
    style: _propTypes2.default.object,
    children: _propTypes2.default.node.isRequired
};

exports.default = Tabs;