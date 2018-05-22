import React from 'react';
import PropTypes from 'prop-types';
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
        this.state = {};
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
        const { children, stacked, theme, style } = this.props;

        const tabs = __getTabs(children);

        __detectDescendantTypeMismatches(tabs);
        __detectControlledUncontrolledPropMismatches(
            this.props.activeKey,
            this.props.defaultActiveKey,
            this.props.onSelect
        );

        const MenuWrapper = !stacked ? TabList : MenuList;

        const derivedTheme = {
            ...DEFAULT_THEME,
            ...(theme || {})
        };

        return (
            <ThemeProvider theme={derivedTheme}>
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
        return tab.hide !== false;
    });
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
