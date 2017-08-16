import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import common from '../common';

import {
    LI, StackedLI,
    UL, StackedUL,
    Link, StackedLink,
    Flex, theme
} from './common/index';
import {ThemeProvider} from 'glamorous';

class Tabs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            uncontrolledActiveKey: null
        };
    }

    componentDidMount () {
        const {defaultActiveKey} = this.props;
        if (common.__hasValue(defaultActiveKey)) {
            this.setState({
                uncontrolledActiveKey: defaultActiveKey
            });
        }
    }

    render () {
        const {id, children, stacked} = this.props;

        const tabs = __getTabs(children);

        __detectDescendantTypeMismatches(tabs);
        __detectControlledUncontrolledPropMismatches(
            this.props.activeKey,
            this.props.defaultActiveKey,
            this.props.onSelect
        );

        return (
            <ThemeProvider theme={this.props.theme || theme}>
                <Flex id={id} height="100%" width="100%" column={!stacked}>
                    <div>
                        {this._renderTabLinks(tabs)}
                    </div>
                    <Flex scroll={true}>
                        {this._renderTabContent(tabs)}
                    </Flex>
                </Flex>
            </ThemeProvider>
        );
    }

    _renderTabLinks (tabs) {
        const WrapperUL = this._getULWrapper();
        return (
            <WrapperUL>
                {tabs.map(this._renderTabLink.bind(this))}
            </WrapperUL>
        );
    }

    _renderTabLink (child, index) {
        const WrapperLI = this._getLIWrapper();
        const WrapperLink = this._getLinkWrapper();
        const {label, eventKey} = child.props;
        return (
            <WrapperLI
                active={eventKey === this._getActiveKey()}
                key={index}
                onClick={this._handleTabSelect.bind(this, eventKey)}>
                <WrapperLink active={eventKey === this._getActiveKey()}>
                    {label}
                </WrapperLink>
            </WrapperLI>
        );
    }

    _renderTabContent (tabs) {
        return tabs.map((tab, key) => {
            if (tab.props.eventKey === this._getActiveKey()) {
                return React.cloneElement(tab, {stacked: this._isStacked(), key});
            }
        });
    }

    _maybeRenderHorizontalControls (controlsHorizontal) {
        if (controlsHorizontal) {
            return (
                <Flex>
                    {controlsHorizontal}
                </Flex>
            );
        }
    }

    _getActiveKey () {
        return common.__hasValue(this.props.activeKey)
            ? this.props.activeKey
            : this.state.uncontrolledActiveKey;
    }

    _handleTabSelect (eventKey) {
        if (this.props.onSelect) {
            this.props.onSelect(eventKey);
        } else if (eventKey !== this.state.uncontrolledActiveKey) {
            this.setState({uncontrolledActiveKey: eventKey});
        }
    }

    _getLIWrapper () {
        return this._isStacked() ? StackedLI : LI;
    }

    _getULWrapper () {
        return this._isStacked() ? StackedUL : UL;
    }

    _getLinkWrapper () {
        return this._isStacked() ? StackedLink : Link;
    }

    _isStacked () {
        return this.props.stacked === true;
    }
}

function __getTabs (children) {
    const tabs = !Array.isArray(children) ? [children] : children;
    return tabs.filter(tab => {
        if (!tab) return false;
        return tab.hide !== false;
    });
}

function __detectDescendantTypeMismatches (tabs) {
    const typeMismatches = __getTypeMismatches(tabs);
    if (typeMismatches.length > 0) {
        __logTypeMismatches(typeMismatches);
        throw new Error('Descendant type mismatches detected');
    }
}

function __getTypeMismatches (tabs) {
    if (!tabs) return [];
    return tabs.filter(child => child.type !== <Tab/>.type);
}

function __logTypeMismatches (typeMismatches) {
    if (!typeMismatches) return;
    typeMismatches.forEach(typeMismatch => {
        console.error(
            `Expected children of "Tabs" to be of type "Tab", but found type "${__getType(
                typeMismatch
            )}"`
        );
    });
}

function __getType (instance) {
    if (!instance.type) return 'Unknown';
    if (typeof instance.type === 'function') {
        return instance.type.name;
    }
    return instance.type;
}

function __detectControlledUncontrolledPropMismatches (activeKey, defaultActiveKey, onSelect) {
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
}

function __hasValues (...values) {
    return values.every(value => common.__hasValue(value));
}

Tabs.propTypes = {
    id                     : PropTypes.string.isRequired,
    defaultActiveKey       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    controlsHorizontalRight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    controlsHorizontalCenter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stacked  : PropTypes.bool,
    onSelect : PropTypes.func,
    children : PropTypes.node.isRequired
};

export default Tabs;
