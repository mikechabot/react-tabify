import { DEFAULT_THEME } from '../components/common';

import {
    __getTypeMismatches,
    __hasValue,
    __hasValues,
    __isEmpty,
    __logTypeMismatches,
    __valOrDefault
} from '../common';

let svc = {};
const TabService = (svc = {
    buildTabs(children) {
        const tabs = !Array.isArray(children) ? [children] : children;
        return tabs.filter(tab => {
            if (!tab) return false;
            const { hide } = tab.props;
            if (typeof hide === 'function') {
                return !hide();
            }
            return hide !== true;
        });
    },
    getDerivedTheme(theme) {
        if (!theme || __isEmpty(theme)) {
            return DEFAULT_THEME;
        }

        const derivedTheme = {};
        if (!theme.tabs || __isEmpty(theme.tabs)) {
            derivedTheme.tabs = DEFAULT_THEME.tabs;
        } else {
            derivedTheme.tabs = svc._getDerivedTabsTheme(theme.tabs, DEFAULT_THEME.tabs);
        }

        if (!theme.menu || __isEmpty(theme.menu)) {
            derivedTheme.menu = DEFAULT_THEME.menu;
        } else {
            derivedTheme.menu = svc._getDerivedMenuTheme(theme.menu, DEFAULT_THEME.menu);
        }

        return derivedTheme;
    },
    _getDerivedTabsTheme(tabs, theme) {
        const { active, hover } = tabs;
        return {
            color: __valOrDefault(() => tabs.color, theme.color),
            borderBottomColor: __valOrDefault(() => tabs.borderBottomColor, theme.borderBottomColor),
            active: {
                borderBottomColor: __valOrDefault(
                    () => active.borderBottomColor,
                    theme.active.borderBottomColor
                ),
                color: __valOrDefault(() => active.color, theme.active.color)
            },
            hover: {
                borderBottomColor: __valOrDefault(
                    () => hover.borderBottomColor,
                    theme.hover.borderBottomColor
                ),
                color: __valOrDefault(() => hover.color, theme.hover.color)
            }
        };
    },
    _getDerivedMenuTheme(menu, theme) {
        const { active, hover } = menu;
        return {
            color: __valOrDefault(() => menu.color, theme.color),
            borderRight: __valOrDefault(() => menu.borderRight, theme.borderRight),
            active: {
                backgroundColor: __valOrDefault(
                    () => active.backgroundColor,
                    theme.active.backgroundColor
                ),
                color: __valOrDefault(() => active.color, theme.active.color)
            },
            hover: {
                backgroundColor: __valOrDefault(
                    () => hover.backgroundColor,
                    theme.hover.backgroundColor
                ),
                color: __valOrDefault(() => hover.color, theme.hover.color)
            }
        };
    },
    detectDescendantTypeMismatches(children) {
        const tabs = svc.buildTabs(children);
        const typeMismatches = __getTypeMismatches(tabs);
        if (typeMismatches.length > 0) {
            __logTypeMismatches(typeMismatches);
            throw new Error('Descendant type mismatches detected');
        }
    },
    detectControlledUncontrolledPropMismatches(activeKey, defaultActiveKey, onSelect, sticky) {
        if (__hasValues(activeKey, defaultActiveKey)) {
            throw new Error(
                'Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both'
            );
        }

        if (__hasValues(onSelect, defaultActiveKey)) {
            throw new Error(
                'Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey'
            );
        }

        if (__hasValue(onSelect) && !__hasValue(activeKey)) {
            throw new Error(
                'Mixing controlled and uncontrolled props. If specifying an "onSelect" function, you must pass an "activeKey'
            );
        }

        if (__hasValues(sticky, activeKey)) {
            throw new Error(
                'Mixing controlled and uncontrolled props. Cannot specify "sticky" and "activeKey". Only uncontrolled components can maintain internal stickiness.'
            );
        }
    }
});

export default TabService;
