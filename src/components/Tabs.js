import React from 'react';
import PropTypes from 'prop-types';
import Maybe from 'maybe-baby';
import { ThemeProvider } from 'glamorous';

import Tab from './Tab';

import {
    Flex,
    TabLI,
    TabLink,
    TabList,
    TabUL,
    MenuList,
    MenuUL,
    MenuLI,
    MenuLink,
    DEFAULT_THEME
} from './common';

const DEFAULT_ID = '__react-tabify__';

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: __getDerivedTheme(props.theme)
        };
    }

    componentDidMount() {
        const { activeKey, defaultActiveKey } = this.props;

        if (__hasValue(activeKey)) {
            return;
        }

        let uncontrolledActiveKey = 0;
        if (__hasValue(defaultActiveKey)) {
            uncontrolledActiveKey = defaultActiveKey;
        }

        this.setState({ uncontrolledActiveKey });
    }

    render() {
        const { children, stacked, style } = this.props;

        const tabs = __getTabs(children);

        __detectDescendantTypeMismatches(tabs);
        __detectControlledUncontrolledPropMismatches(
            this.props.activeKey,
            this.props.defaultActiveKey,
            this.props.onSelect
        );

        const MenuWrapper = !stacked ? TabList : MenuList;

        return (
            <ThemeProvider theme={this.state.theme}>
                <Flex id={this._getId()} column={!stacked} flex={1} style={style}>
                    <MenuWrapper>{this._renderTabLinks(tabs, stacked)}</MenuWrapper>
                    <Flex overflow="hidden" flex={1} id={`tab-content-${this._getId()}`}>
                        {this._renderTabContent(tabs)}
                    </Flex>
                </Flex>
            </ThemeProvider>
        );
    }

    _renderTabLinks(tabs, stacked) {
        if (!stacked) {
            return this._renderHorizontalTabLinks(tabs);
        }
        return this._renderVerticalTabLinks(tabs);
    }

    _renderHorizontalTabLinks(tabs) {
        return <TabUL>{tabs.map(this._renderTabLink.bind(this, TabLI, TabLink))}</TabUL>;
    }

    _renderVerticalTabLinks(tabs) {
        return <MenuUL>{tabs.map(this._renderTabLink.bind(this, MenuLI, MenuLink))}</MenuUL>;
    }

    _renderTabLink(ListItem, Anchor, child, index) {
        const { label, eventKey } = child.props;
        const key = __hasValue(eventKey) ? eventKey : index;
        const isActive = key === this._getActiveKey();
        return (
            <ListItem
                id={`${this._getId()}-tab-item-${key}`}
                key={index}
                isActive={isActive}
                onClick={this._handleTabSelect.bind(this, key)}
            >
                <Anchor isActive={isActive}>{label}</Anchor>
            </ListItem>
        );
    }

    _renderTabContent(tabs) {
        return tabs
            .map((tab, index) => {
                const key = __hasValue(tab.props.eventKey) ? tab.props.eventKey : index;
                if (key !== this._getActiveKey()) {
                    return null;
                }
                return React.cloneElement(tab, { key });
            })
            .filter(tab => tab);
    }

    _handleTabSelect(eventKey) {
        if (this.props.onSelect) {
            this.props.onSelect(eventKey);
        } else if (eventKey !== this.state.uncontrolledActiveKey) {
            this.setState({ uncontrolledActiveKey: eventKey });
        }
    }

    _getActiveKey() {
        return __hasValue(this.props.activeKey)
            ? this.props.activeKey
            : this.state.uncontrolledActiveKey;
    }

    _getId() {
        return this.props.id || DEFAULT_ID;
    }
}

const __getTabs = children => {
    const tabs = !Array.isArray(children) ? [children] : children;
    return tabs.filter(tab => {
        if (!tab) return false;
        const { hide } = tab.props;
        if (typeof hide === 'function') {
            return !hide();
        }
        return hide !== true;
    });
};

const __getDerivedTheme = theme => {
    if (!theme || Object.keys(theme).length === 0) {
        return DEFAULT_THEME;
    }
    const derivedTheme = {
        tabs: {},
        menu: {}
    };

    console.log('Building derived theme');
    if (!theme.tabs || __isEmpty(theme.tabs)) {
        derivedTheme.tabs = DEFAULT_THEME.tabs;
    } else {
        derivedTheme.tabs = __getDerivedTabsTheme(theme.tabs, DEFAULT_THEME.tabs);
    }

    if (!theme.menu || __isEmpty(theme.menu)) {
        derivedTheme.menu = DEFAULT_THEME.menu;
    } else {
        derivedTheme.menu = __getDerivedMenuTheme(theme.menu, DEFAULT_THEME.menu);
    }

    return derivedTheme;
};

const __getDerivedTabsTheme = (tabs, theme) => {
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
};

const __getDerivedMenuTheme = (menu, theme) => {
    const { active, hover } = menu;
    return {
        color: __valOrDefault(() => menu.color, theme.color),
        borderRight: __valOrDefault(() => menu.borderRight, theme.borderRight),
        active: {
            backgroundColor: __valOrDefault(() => active.backgroundColor, theme.active.backgroundColor),
            color: __valOrDefault(() => active.color, theme.active.color)
        },
        hover: {
            backgroundColor: __valOrDefault(() => hover.backgroundColor, theme.hover.backgroundColor),
            color: __valOrDefault(() => hover.color, theme.hover.color)
        }
    };
};

const __valOrDefault = (accessor, defaultValue) => {
    return Maybe.of(accessor)
        .orElse(defaultValue)
        .join();
};

const __detectDescendantTypeMismatches = tabs => {
    const typeMismatches = __getTypeMismatches(tabs);
    if (typeMismatches.length > 0) {
        __logTypeMismatches(typeMismatches);
        throw new Error('Descendant type mismatches detected');
    }
};

const __getTypeMismatches = tabs => {
    if (!tabs) return [];
    return tabs.filter(child => child.type !== <Tab />.type);
};

const __logTypeMismatches = typeMismatches => {
    if (!typeMismatches) return;
    typeMismatches.forEach(typeMismatch => {
        console.error(
            `Expected children of "Tabs" to be of type "Tab", but found type "${__getType(
                typeMismatch
            )}"`
        );
    });
};

const __detectControlledUncontrolledPropMismatches = (activeKey, defaultActiveKey, onSelect) => {
    if (__hasValues(activeKey, defaultActiveKey)) {
        throw new Error(
            'Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both'
        );
    }
    if (__hasValues(defaultActiveKey, onSelect)) {
        throw new Error(
            'Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey'
        );
    }
};

const __getType = instance => {
    if (!instance.type) return 'Unknown';
    if (typeof instance.type === 'function') {
        return instance.type.name;
    }
    return instance.type;
};

const __hasValues = (...values) => {
    return values.every(value => __hasValue(value));
};

const __hasValue = val => {
    return val !== undefined && val !== null;
};

const __isEmpty = obj => {
    if (!obj) return true;
    return Object.keys(obj).length === 0;
};

Tabs.propTypes = {
    id: PropTypes.string,
    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stacked: PropTypes.bool,
    onSelect: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired
};

export default Tabs;
