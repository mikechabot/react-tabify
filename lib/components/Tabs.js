'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamorous = require('glamorous');

var _tabService = require('../services/tab-service');

var _tabService2 = _interopRequireDefault(_tabService);

var _common = require('./common');

var _localStorageService = require('./services/local-storage-service');

var _localStorageService2 = _interopRequireDefault(_localStorageService);

var _common2 = require('../common');

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

        _tabService2.default.detectDescendantTypeMismatches(props.children);
        _tabService2.default.detectControlledUncontrolledPropMismatches(props.activeKey, props.defaultActiveKey, props.onSelect, props.sticky);

        _this.state = {
            theme: _tabService2.default.getDerivedTheme(props.theme)
        };
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                id = _props.id,
                sticky = _props.sticky,
                activeKey = _props.activeKey,
                defaultActiveKey = _props.defaultActiveKey;


            if ((0, _common2.__hasValue)(activeKey)) {
                return;
            }

            var uncontrolledActiveKey = 0;
            if ((0, _common2.__hasValue)(defaultActiveKey)) {
                uncontrolledActiveKey = defaultActiveKey;
            }

            if (sticky && _localStorageService2.default.getStickyTab(id)) {
                var persistedState = _localStorageService2.default.getStickyTab(id);
                uncontrolledActiveKey = persistedState.activeKey;
            }

            this.setState({ uncontrolledActiveKey: uncontrolledActiveKey });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this._maybeSaveToLocalStorage();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._maybeSaveToLocalStorage();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                stacked = _props2.stacked,
                style = _props2.style;


            var tabs = _tabService2.default.buildTabs(children);
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

            var key = (0, _common2.__hasValue)(eventKey) ? eventKey : index;
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
                var key = (0, _common2.__hasValue)(tab.props.eventKey) ? tab.props.eventKey : index;
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
            return (0, _common2.__hasValue)(this.props.activeKey) ? this.props.activeKey : this.state.uncontrolledActiveKey;
        }
    }, {
        key: '_getId',
        value: function _getId() {
            return this.props.id || DEFAULT_ID;
        }
    }, {
        key: '_maybeSaveToLocalStorage',
        value: function _maybeSaveToLocalStorage() {
            if (this.props.sticky) {
                _localStorageService2.default.setStickyTab(this.props.id, {
                    activeKey: this._getActiveKey()
                });
            }
        }
    }]);

    return Tabs;
}(_react2.default.Component);

Tabs.propTypes = {
    id: _propTypes2.default.string,
    defaultActiveKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    activeKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    stacked: _propTypes2.default.bool,
    sticky: _propTypes2.default.bool,
    onSelect: _propTypes2.default.func,
    style: _propTypes2.default.object,
    children: _propTypes2.default.node.isRequired
};

exports.default = Tabs;