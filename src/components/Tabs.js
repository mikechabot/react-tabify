import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'glamorous';

import TabService from '../services/tab-service';
import LocalStorageService from '../services/local-storage-service';

import { Flex, TabLI, TabLink, TabList, TabUL, MenuList, MenuUL, MenuLI, MenuLink } from './common';
import { __hasValue } from '../common';

const DEFAULT_ID = '__tabify__';

class Tabs extends React.Component {
    constructor(props) {
        super(props);

        TabService.detectDescendantTypeMismatches(props.children);
        TabService.detectControlledUncontrolledPropMismatches(
            props.activeKey,
            props.defaultActiveKey,
            props.onSelect,
            props.sticky
        );

        this.state = {
            theme: TabService.getDerivedTheme(props.theme)
        };
    }

    componentDidMount() {
        const { id, sticky, activeKey, defaultActiveKey } = this.props;

        if (__hasValue(activeKey)) {
            return;
        }

        let uncontrolledActiveKey = 0;
        if (__hasValue(defaultActiveKey)) {
            uncontrolledActiveKey = defaultActiveKey;
        }

        if (sticky && LocalStorageService.getStickyTab(id)) {
            const persistedState = LocalStorageService.getStickyTab(id);
            uncontrolledActiveKey = persistedState.activeKey;
        }

        this.setState({ uncontrolledActiveKey });
    }

    componentDidUpdate() {
        this._maybeSaveToLocalStorage();
    }

    componentWillUnmount() {
        this._maybeSaveToLocalStorage();
    }

    render() {
        const { children, stacked, style } = this.props;

        const tabs = TabService.buildTabs(children);
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
        return __hasValue(this.props.activeKey) ? this.props.activeKey : this.state.uncontrolledActiveKey;
    }

    _getId() {
        return this.props.id || DEFAULT_ID;
    }

    _maybeSaveToLocalStorage() {
        if (this.props.sticky) {
            LocalStorageService.setStickyTab(this.props.id, {
                activeKey: this._getActiveKey()
            });
        }
    }
}

Tabs.propTypes = {
    id: PropTypes.string,
    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stacked: PropTypes.bool,
    sticky: PropTypes.bool,
    onSelect: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired
};

export default Tabs;
