'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

var _Flex = require('./common/Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _common = require('../common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NOT_ALLOWED = { cursor: 'not-allowed' };
var OVERFLOW_Y = { overflowY: 'auto' };

var Tabs = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _this.state = {
            uncontrolledTabKey: null
        };
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var defaultActiveKey = this.props.defaultActiveKey;

            if (_common2.default.__hasValue(defaultActiveKey)) {
                this.setState({
                    uncontrolledTabKey: defaultActiveKey
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                children = _props.children,
                activeKey = _props.activeKey,
                defaultActiveKey = _props.defaultActiveKey,
                onSelect = _props.onSelect,
                stacked = _props.stacked,
                style = _props.style,
                controlsHorizontal = _props.controlsHorizontal;


            var tabs = children;
            if (!Array.isArray(tabs)) {
                tabs = [tabs];
            }

            tabs = tabs.filter(function (tab) {
                if (!tab) return false;
                var showTab = _maybeBaby2.default.of(tab).prop('props').prop('show').orElse(true).join();
                return showTab === true;
            });

            var typeMismatches = tabs.filter(function (child) {
                return child.type !== _react2.default.createElement(_Tab2.default, null).type;
            });
            if (typeMismatches.length > 0) {
                throw new Error('Expected children of "Tabs" to be of type "Tab", but found "' + typeMismatches[0] + '"');
            }

            if (_common2.default.__hasValue(activeKey) && _common2.default.__hasValue(defaultActiveKey)) {
                throw new Error('Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both');
            }

            if (_common2.default.__hasValue(defaultActiveKey) && onSelect) {
                throw new Error('Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey');
            }

            var activeTabKey = _common2.default.__hasValue(activeKey) ? activeKey : this.state.uncontrolledTabKey;

            if (!stacked) {
                return _react2.default.createElement(
                    _Flex2.default,
                    {
                        id: id,
                        height: '100%',
                        width: '100%',
                        className: 'slds-tabs--default',
                        style: style },
                    this._renderHorizontalTabList(tabs, activeTabKey, controlsHorizontal),
                    this._renderTabContent(tabs, activeTabKey, stacked)
                );
            } else {
                return _react2.default.createElement(
                    _Flex2.default,
                    {
                        id: id,
                        height: '100%',
                        width: '100%',
                        style: style },
                    _react2.default.createElement(
                        _Flex2.default,
                        {
                            className: 'slds-grid slds-grid--vertical slds-navigation-list--vertical slds-border--right',
                            flexShrink: 1,
                            style: { minWidth: 130, overflowY: 'auto' } },
                        this._renderVerticalTabList(tabs, activeTabKey)
                    ),
                    _react2.default.createElement(
                        _Flex2.default,
                        { flex: 1, style: OVERFLOW_Y },
                        this._renderTabContent(tabs, activeTabKey, stacked)
                    )
                );
            }
        }
    }, {
        key: '_renderVerticalTabList',
        value: function _renderVerticalTabList(children, activeKey) {
            return _react2.default.createElement(
                'ul',
                null,
                this._renderTabs(children, activeKey, this._renderVerticalTab)
            );
        }
    }, {
        key: '_renderHorizontalTabList',
        value: function _renderHorizontalTabList(children, activeKey, controlsHorizontal) {
            return _react2.default.createElement(
                _Flex2.default,
                { justifyContent: 'space-between' },
                _react2.default.createElement(
                    _Flex2.default,
                    { flex: 1 },
                    _react2.default.createElement(
                        'ul',
                        { className: 'slds-tabs--default__nav', style: { width: '100%' } },
                        this._renderTabs(children, activeKey, this._renderHorizontalTab)
                    )
                ),
                this._maybeRenderHorizontalControls(controlsHorizontal)
            );
        }
    }, {
        key: '_maybeRenderHorizontalControls',
        value: function _maybeRenderHorizontalControls(controlsHorizontal) {
            if (controlsHorizontal) {
                return _react2.default.createElement(
                    _Flex2.default,
                    { className: 'slds-border--bottom' },
                    controlsHorizontal
                );
            }
        }
    }, {
        key: '_renderTabs',
        value: function _renderTabs(tabs, activeKey, renderCallback) {
            return tabs.map(renderCallback.bind(this, activeKey));
        }
    }, {
        key: '_renderVerticalTab',
        value: function _renderVerticalTab(activeKey, child, index) {
            var disabled = this.props.disabled;

            var tabProps = child.props;
            var isTabActive = tabProps.eventKey === activeKey;
            return _react2.default.createElement(
                'li',
                {
                    key: index,
                    onClick: this._handleTabSelect.bind(this, tabProps.eventKey),
                    className: isTabActive ? 'slds-is-active' : '',
                    style: disabled ? NOT_ALLOWED : {},
                    title: tabProps.label },
                _react2.default.createElement(
                    'a',
                    {
                        className: 'slds-navigation-list--vertical__action slds-text-link--reset',
                        style: disabled ? NOT_ALLOWED : {},
                        id: 'tab-' + index + '-item',
                        href: 'javascript:void(0);' },
                    tabProps.label
                )
            );
        }
    }, {
        key: '_renderHorizontalTab',
        value: function _renderHorizontalTab(activeKey, child, index) {
            var disabled = this.props.disabled;

            var tabProps = child.props;
            var isTabActive = tabProps.eventKey === activeKey;
            return _react2.default.createElement(
                'li',
                {
                    key: index,
                    onClick: this._handleTabSelect.bind(this, tabProps.eventKey),
                    className: 'pointer slds-tabs--default__item ' + (isTabActive ? 'slds-active' : ''),
                    style: disabled ? NOT_ALLOWED : {},
                    title: tabProps.label },
                _react2.default.createElement(
                    'a',
                    {
                        className: 'slds-tabs--default__link',
                        style: disabled ? NOT_ALLOWED : {},
                        href: 'javascript:void(0)',
                        id: 'tab-' + index + '-item' },
                    tabProps.label
                )
            );
        }
    }, {
        key: '_renderTabContent',
        value: function _renderTabContent(children, activeKey, stacked) {
            return children.map(function (child) {
                if (child.props.eventKey === activeKey) {
                    return _react2.default.cloneElement(child, { stacked: stacked });
                }
            });
        }
    }, {
        key: '_handleTabSelect',
        value: function _handleTabSelect(eventKey) {
            if (!this.props.onSelect) {
                if (eventKey !== this.state.uncontrolledTabKey) {
                    this.setState({ uncontrolledTabKey: eventKey });
                }
            } else {
                this.props.onSelect(eventKey);
            }
        }
    }]);

    return Tabs;
}(_react2.default.Component);

Tabs.propTypes = {
    id: _react2.default.PropTypes.string.isRequired,
    defaultActiveKey: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    controlsHorizontalRight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]),
    controlsHorizontalCenter: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]),
    activeKey: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    stacked: _react2.default.PropTypes.bool,
    onSelect: _react2.default.PropTypes.func,
    children: _react2.default.PropTypes.node.isRequired
};

exports.default = Tabs;