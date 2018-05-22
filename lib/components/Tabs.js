'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

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

        _this.state = {
            theme: __getDerivedTheme(props.theme)
        };
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
                style = _props2.style;


            var tabs = __getTabs(children);

            __detectDescendantTypeMismatches(tabs);
            __detectControlledUncontrolledPropMismatches(this.props.activeKey, this.props.defaultActiveKey, this.props.onSelect);

            var MenuWrapper = !stacked ? _common.TabList : _common.MenuList;

            return _react2.default.createElement(
                _glamorous.ThemeProvider,
                { theme: this.state.theme },
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

            var key = __hasValue(eventKey) ? eventKey : index;
            var isActive = key === this._getActiveKey();
            return _react2.default.createElement(
                ListItem,
                {
                    id: this._getId() + '-tab-item-' + key,
                    key: index,
                    isActive: isActive,
                    onClick: this._handleTabSelect.bind(this, key)
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

            return tabs.map(function (tab, index) {
                var key = __hasValue(tab.props.eventKey) ? tab.props.eventKey : index;
                if (key !== _this2._getActiveKey()) {
                    return null;
                }
                return _react2.default.cloneElement(tab, { key: key });
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
        key: '_getId',
        value: function _getId() {
            return this.props.id || DEFAULT_ID;
        }
    }]);

    return Tabs;
}(_react2.default.Component);

var __getTabs = function __getTabs(children) {
    var tabs = !Array.isArray(children) ? [children] : children;
    return tabs.filter(function (tab) {
        if (!tab) return false;
        var hide = tab.props.hide;

        if (typeof hide === 'function') {
            return hide();
        }
        return hide !== true;
    });
};

var __getDerivedTheme = function __getDerivedTheme(theme) {
    if (!theme || Object.keys(theme).length === 0) {
        return _common.DEFAULT_THEME;
    }
    var derivedTheme = {
        tabs: {},
        menu: {}
    };

    console.log('Building derived theme');
    if (!theme.tabs || __isEmpty(theme.tabs)) {
        derivedTheme.tabs = _common.DEFAULT_THEME.tabs;
    } else {
        derivedTheme.tabs = __getDerivedTabsTheme(theme.tabs, _common.DEFAULT_THEME.tabs);
    }

    if (!theme.menu || __isEmpty(theme.menu)) {
        derivedTheme.menu = _common.DEFAULT_THEME.menu;
    } else {
        derivedTheme.menu = __getDerivedMenuTheme(theme.menu, _common.DEFAULT_THEME.menu);
    }

    return derivedTheme;
};

var __getDerivedTabsTheme = function __getDerivedTabsTheme(tabs, theme) {
    var active = tabs.active,
        hover = tabs.hover;

    return {
        color: __valOrDefault(function () {
            return tabs.color;
        }, theme.color),
        borderBottomColor: __valOrDefault(function () {
            return tabs.borderBottomColor;
        }, theme.borderBottomColor),
        active: {
            borderBottomColor: __valOrDefault(function () {
                return active.borderBottomColor;
            }, theme.active.borderBottomColor),
            color: __valOrDefault(function () {
                return active.color;
            }, theme.active.color)
        },
        hover: {
            borderBottomColor: __valOrDefault(function () {
                return hover.borderBottomColor;
            }, theme.hover.borderBottomColor),
            color: __valOrDefault(function () {
                return hover.color;
            }, theme.hover.color)
        }
    };
};

var __getDerivedMenuTheme = function __getDerivedMenuTheme(menu, theme) {
    var active = menu.active,
        hover = menu.hover;

    return {
        color: __valOrDefault(function () {
            return menu.color;
        }, theme.color),
        borderRight: __valOrDefault(function () {
            return menu.borderRight;
        }, theme.borderRight),
        active: {
            backgroundColor: __valOrDefault(function () {
                return active.backgroundColor;
            }, theme.active.backgroundColor),
            color: __valOrDefault(function () {
                return active.color;
            }, theme.active.color)
        },
        hover: {
            backgroundColor: __valOrDefault(function () {
                return hover.backgroundColor;
            }, theme.hover.backgroundColor),
            color: __valOrDefault(function () {
                return hover.color;
            }, theme.hover.color)
        }
    };
};

var __valOrDefault = function __valOrDefault(accessor, defaultValue) {
    return _maybeBaby2.default.of(accessor).orElse(defaultValue).join();
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

var __isEmpty = function __isEmpty(obj) {
    if (!obj) return true;
    return Object.keys(obj).length === 0;
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