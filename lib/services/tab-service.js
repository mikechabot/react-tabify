'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('../components/common');

var _common2 = require('../common');

var svc = {};
var TabService = svc = {
    buildTabs: function buildTabs(children) {
        var tabs = !Array.isArray(children) ? [children] : children;
        return tabs.filter(function (tab) {
            if (!tab) return false;
            var hide = tab.props.hide;

            if (typeof hide === 'function') {
                return !hide();
            }
            return hide !== true;
        });
    },
    getDerivedTheme: function getDerivedTheme(theme) {
        if (!theme || (0, _common2.__isEmpty)(theme)) {
            return _common.DEFAULT_THEME;
        }

        var derivedTheme = {};
        if (!theme.tabs || (0, _common2.__isEmpty)(theme.tabs)) {
            derivedTheme.tabs = _common.DEFAULT_THEME.tabs;
        } else {
            derivedTheme.tabs = svc._getDerivedTabsTheme(theme.tabs, _common.DEFAULT_THEME.tabs);
        }

        if (!theme.menu || (0, _common2.__isEmpty)(theme.menu)) {
            derivedTheme.menu = _common.DEFAULT_THEME.menu;
        } else {
            derivedTheme.menu = svc._getDerivedMenuTheme(theme.menu, _common.DEFAULT_THEME.menu);
        }

        return derivedTheme;
    },
    _getDerivedTabsTheme: function _getDerivedTabsTheme(tabs, theme) {
        var active = tabs.active,
            hover = tabs.hover;

        return {
            color: (0, _common2.__valOrDefault)(function () {
                return tabs.color;
            }, theme.color),
            borderBottomColor: (0, _common2.__valOrDefault)(function () {
                return tabs.borderBottomColor;
            }, theme.borderBottomColor),
            active: {
                borderBottomColor: (0, _common2.__valOrDefault)(function () {
                    return active.borderBottomColor;
                }, theme.active.borderBottomColor),
                color: (0, _common2.__valOrDefault)(function () {
                    return active.color;
                }, theme.active.color)
            },
            hover: {
                borderBottomColor: (0, _common2.__valOrDefault)(function () {
                    return hover.borderBottomColor;
                }, theme.hover.borderBottomColor),
                color: (0, _common2.__valOrDefault)(function () {
                    return hover.color;
                }, theme.hover.color)
            }
        };
    },
    _getDerivedMenuTheme: function _getDerivedMenuTheme(menu, theme) {
        var active = menu.active,
            hover = menu.hover;

        return {
            color: (0, _common2.__valOrDefault)(function () {
                return menu.color;
            }, theme.color),
            borderRight: (0, _common2.__valOrDefault)(function () {
                return menu.borderRight;
            }, theme.borderRight),
            active: {
                backgroundColor: (0, _common2.__valOrDefault)(function () {
                    return active.backgroundColor;
                }, theme.active.backgroundColor),
                color: (0, _common2.__valOrDefault)(function () {
                    return active.color;
                }, theme.active.color)
            },
            hover: {
                backgroundColor: (0, _common2.__valOrDefault)(function () {
                    return hover.backgroundColor;
                }, theme.hover.backgroundColor),
                color: (0, _common2.__valOrDefault)(function () {
                    return hover.color;
                }, theme.hover.color)
            }
        };
    },
    detectDescendantTypeMismatches: function detectDescendantTypeMismatches(children) {
        var tabs = svc.buildTabs(children);
        var typeMismatches = (0, _common2.__getTypeMismatches)(tabs);
        if (typeMismatches.length > 0) {
            (0, _common2.__logTypeMismatches)(typeMismatches);
            throw new Error('Descendant type mismatches detected');
        }
    },
    detectControlledUncontrolledPropMismatches: function detectControlledUncontrolledPropMismatches(activeKey, defaultActiveKey, onSelect, sticky) {
        if ((0, _common2.__hasValues)(activeKey, defaultActiveKey)) {
            throw new Error('Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both');
        }

        if ((0, _common2.__hasValues)(onSelect, defaultActiveKey)) {
            throw new Error('Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey');
        }

        if ((0, _common2.__hasValue)(onSelect) && !(0, _common2.__hasValue)(activeKey)) {
            throw new Error('Mixing controlled and uncontrolled props. If specifying an "onSelect" function, you must pass an "activeKey');
        }

        if ((0, _common2.__hasValues)(sticky, activeKey)) {
            throw new Error('Mixing controlled and uncontrolled props. Cannot specify "sticky" and "activeKey". Only uncontrolled components can maintain internal stickiness.');
        }
    }
};

exports.default = TabService;