import React from 'react';
import Maybe from 'maybe-baby';
import Flex from './common/Flex';
import Tab from './Tab';
import common from './common';

const NOT_ALLOWED = {cursor: 'not-allowed'};
const OVERFLOW_Y = {overflowY: 'auto'};

class Tabs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            uncontrolledTabKey: null
        };
    }

    componentDidMount () {
        const {defaultActiveKey} = this.props;
        if (window._xG.__hasValue(defaultActiveKey)) {
            this.setState({
                uncontrolledTabKey: defaultActiveKey
            });
        }
    }

    render () {
        const {id, children, activeKey, defaultActiveKey, onSelect, stacked, style, controlsHorizontal} = this.props;

        let tabs = children;
        if (!Array.isArray(tabs)) {
            tabs = [tabs];
        }

        tabs = tabs.filter(tab => {
            if (!tab) return false;
            const showTab = Maybe.of(tab).prop('props').prop('show').orElse(true).join();
            return showTab === true;
        });

        const typeMismatches = tabs.filter(child => {
            return child.type !== (<Tab/>).type;
        });
        if (typeMismatches.length > 0) {
            throw new Error(`Expected children of "Tabs" to be of type "Tab", but found "${typeMismatches[0]}"`);
        }

        if (common.__hasValue(activeKey) && common.__hasValue(defaultActiveKey)) {
            throw new Error('Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both');
        }

        if (common.__hasValue(defaultActiveKey) && onSelect) {
            throw new Error('Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey');
        }

        const activeTabKey = common.__hasValue(activeKey) ? activeKey : this.state.uncontrolledTabKey;

        if (!stacked) {
            return (
                <Flex
                    id={id}
                    height="100%"
                    width="100%"
                    className="slds-tabs--default"
                    style={style}>
                    {this._renderHorizontalTabList(tabs, activeTabKey, controlsHorizontal)}
                    {this._renderTabContent(tabs, activeTabKey, stacked)}
                </Flex>
            );
        } else {
            return (
                <Flex
                    id={id}
                    height="100%"
                    width="100%"
                    style={style}>
                    <Flex
                        className="slds-grid slds-grid--vertical slds-navigation-list--vertical slds-border--right"
                        flexShrink={1}
                        style={{minWidth: 130, overflowY: 'auto'}}>
                        {this._renderVerticalTabList(tabs, activeTabKey)}
                    </Flex>
                    <Flex flex={1} style={OVERFLOW_Y}>
                        {this._renderTabContent(tabs, activeTabKey, stacked)}
                    </Flex>
                </Flex>
            );
        }
    }

    _renderVerticalTabList (children, activeKey) {
        return (
            <ul>
                {this._renderTabs(children, activeKey, this._renderVerticalTab)}
            </ul>
        );
    }

    _renderHorizontalTabList (children, activeKey, controlsHorizontal) {
        return (
            <Flex justifyContent="space-between">
                <Flex flex={1}>
                    <ul className="slds-tabs--default__nav" style={{width: '100%'}}>
                        {this._renderTabs(children, activeKey, this._renderHorizontalTab)}
                    </ul>
                </Flex>
                {this._maybeRenderHorizontalControls(controlsHorizontal)}
            </Flex>
        );
    }

    _maybeRenderHorizontalControls (controlsHorizontal) {
        if (controlsHorizontal) {
            return (
                <Flex className="slds-border--bottom">
                    {controlsHorizontal}
                </Flex>
            );
        }
    }

    _renderTabs (tabs, activeKey, renderCallback) {
        return tabs.map(renderCallback.bind(this, activeKey));
    }

    _renderVerticalTab (activeKey, child, index) {
        const {disabled} = this.props;
        const tabProps = child.props;
        const isTabActive = tabProps.eventKey === activeKey;
        return (
            <li
                key={index}
                onClick={this._handleTabSelect.bind(this, tabProps.eventKey)}
                className={isTabActive ? 'slds-is-active' : ''}
                style={disabled ? NOT_ALLOWED : {}}
                title={tabProps.label}>
                <a
                    className="slds-navigation-list--vertical__action slds-text-link--reset"
                    style={disabled ? NOT_ALLOWED : {}}
                    id={`tab-${index}-item`}
                    href="javascript:void(0);">
                    {tabProps.label}
                </a>
            </li>
        );
    }

    _renderHorizontalTab (activeKey, child, index) {
        const {disabled} = this.props;
        const tabProps = child.props;
        const isTabActive = tabProps.eventKey === activeKey;
        return (
            <li
                key={index}
                onClick={this._handleTabSelect.bind(this, tabProps.eventKey)}
                className={`pointer slds-tabs--default__item ${isTabActive ? 'slds-active' : ''}`}
                style={disabled ? NOT_ALLOWED : {}}
                title={tabProps.label}>
                <a
                    className="slds-tabs--default__link"
                    style={disabled ? NOT_ALLOWED : {}}
                    href="javascript:void(0)"
                    id={`tab-${index}-item`}>
                    {tabProps.label}
                </a>
            </li>
        );
    }

    _renderTabContent (children, activeKey, stacked) {
        return children.map(child => {
            if (child.props.eventKey === activeKey) {
                return React.cloneElement(child, {stacked});
            }
        });
    }

    _handleTabSelect (eventKey) {
        if (!this.props.onSelect) {
            if (eventKey !== this.state.uncontrolledTabKey) {
                this.setState({uncontrolledTabKey: eventKey});
            }
        } else {
            this.props.onSelect(eventKey);
        }
    }
}

Tabs.propTypes = {
    id              : React.PropTypes.string.isRequired,
    defaultActiveKey: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    controlsHorizontalRight: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.node
    ]),
    controlsHorizontalCenter: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.node
    ]),
    activeKey: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    stacked : React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    children: React.PropTypes.node.isRequired
};

export default Tabs;
