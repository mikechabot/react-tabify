"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _glamorous = require("glamorous");

var _tabService = _interopRequireDefault(require("../services/tab-service"));

var _localStorageService = _interopRequireDefault(require("../services/local-storage-service"));

var _common = require("./common");

var _common2 = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_ID = '__tabify__';

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, props));

    _tabService["default"].detectDescendantTypeMismatches(props.children);

    _tabService["default"].detectControlledUncontrolledPropMismatches(props.activeKey, props.defaultActiveKey, props.onSelect, props.sticky);

    _this.state = {
      theme: _tabService["default"].getDerivedTheme(props.theme)
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          id = _this$props.id,
          sticky = _this$props.sticky,
          activeKey = _this$props.activeKey,
          defaultActiveKey = _this$props.defaultActiveKey;

      if ((0, _common2.__hasValue)(activeKey)) {
        return;
      }

      var uncontrolledActiveKey = 0;

      if ((0, _common2.__hasValue)(defaultActiveKey)) {
        uncontrolledActiveKey = defaultActiveKey;
      }

      if (sticky && _localStorageService["default"].getStickyTab(id)) {
        var persistedState = _localStorageService["default"].getStickyTab(id);

        uncontrolledActiveKey = persistedState.activeKey;
      }

      this.setState({
        uncontrolledActiveKey: uncontrolledActiveKey
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._maybeSaveToLocalStorage();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._maybeSaveToLocalStorage();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          stacked = _this$props2.stacked,
          style = _this$props2.style;

      var tabs = _tabService["default"].buildTabs(children);

      var MenuWrapper = !stacked ? _common.TabList : _common.MenuList;
      return _react["default"].createElement(_glamorous.ThemeProvider, {
        theme: this.state.theme
      }, _react["default"].createElement(_common.Flex, {
        id: this._getId(),
        column: !stacked,
        flex: 1,
        style: style
      }, _react["default"].createElement(MenuWrapper, null, this._renderTabLinks(tabs, stacked)), _react["default"].createElement(_common.Flex, {
        overflow: "hidden",
        flex: 1,
        id: "tab-content-".concat(this._getId())
      }, this._renderTabContent(tabs))));
    }
  }, {
    key: "_renderTabLinks",
    value: function _renderTabLinks(tabs, stacked) {
      if (!stacked) {
        return this._renderHorizontalTabLinks(tabs);
      }

      return this._renderVerticalTabLinks(tabs);
    }
  }, {
    key: "_renderHorizontalTabLinks",
    value: function _renderHorizontalTabLinks(tabs) {
      return _react["default"].createElement(_common.TabUL, null, tabs.map(this._renderTabLink.bind(this, _common.TabLI, _common.TabLink)));
    }
  }, {
    key: "_renderVerticalTabLinks",
    value: function _renderVerticalTabLinks(tabs) {
      return _react["default"].createElement(_common.MenuUL, null, tabs.map(this._renderTabLink.bind(this, _common.MenuLI, _common.MenuLink)));
    }
  }, {
    key: "_renderTabLink",
    value: function _renderTabLink(ListItem, Anchor, child, index) {
      var _child$props = child.props,
          label = _child$props.label,
          eventKey = _child$props.eventKey;
      var key = (0, _common2.__hasValue)(eventKey) ? eventKey : index;

      var isActive = key === this._getActiveKey();

      return _react["default"].createElement(ListItem, {
        id: "".concat(this._getId(), "-tab-item-").concat(key),
        key: index,
        isActive: isActive,
        onClick: this._handleTabSelect.bind(this, key)
      }, _react["default"].createElement(Anchor, {
        isActive: isActive
      }, label));
    }
  }, {
    key: "_renderTabContent",
    value: function _renderTabContent(tabs) {
      var _this2 = this;

      return tabs.map(function (tab, index) {
        var key = (0, _common2.__hasValue)(tab.props.eventKey) ? tab.props.eventKey : index;

        if (key !== _this2._getActiveKey()) {
          return null;
        }

        return _react["default"].cloneElement(tab, {
          key: key
        });
      }).filter(function (tab) {
        return tab;
      });
    }
  }, {
    key: "_handleTabSelect",
    value: function _handleTabSelect(eventKey) {
      if (this.props.onSelect) {
        this.props.onSelect(eventKey);
      } else if (eventKey !== this.state.uncontrolledActiveKey) {
        this.setState({
          uncontrolledActiveKey: eventKey
        });
      }
    }
  }, {
    key: "_getActiveKey",
    value: function _getActiveKey() {
      return (0, _common2.__hasValue)(this.props.activeKey) ? this.props.activeKey : this.state.uncontrolledActiveKey;
    }
  }, {
    key: "_getId",
    value: function _getId() {
      return this.props.id || DEFAULT_ID;
    }
  }, {
    key: "_maybeSaveToLocalStorage",
    value: function _maybeSaveToLocalStorage() {
      if (this.props.sticky) {
        _localStorageService["default"].setStickyTab(this.props.id, {
          activeKey: this._getActiveKey()
        });
      }
    }
  }]);

  return Tabs;
}(_react["default"].Component);

Tabs.propTypes = {
  id: _propTypes["default"].string,
  defaultActiveKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  activeKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  stacked: _propTypes["default"].bool,
  sticky: _propTypes["default"].bool,
  onSelect: _propTypes["default"].func,
  style: _propTypes["default"].object,
  children: _propTypes["default"].node.isRequired
};
var _default = Tabs;
exports["default"] = _default;