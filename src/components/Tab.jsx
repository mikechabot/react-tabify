import React from 'react';
import Flex from './common/Flex';

function Tab ({
    id,
    style,
    children,
    stacked
}) {
    return (
        <Flex
            id={id}
            className={`${!stacked ? 'slds-tabs--default__content' : ''} slds-show`}
            style={{
                ...{ width: '100%' },
                ...{ height: !stacked ? 'calc(100% - 40px)' : '100%', overflowY: 'auto' },
                ...style
            }}
            >
            { children }
        </Flex>
    );
}

Tab.propTypes = {
    id      : React.PropTypes.string,
    label   : React.PropTypes.string,
    children: React.PropTypes.node,
    style   : React.PropTypes.object,
    show    : React.PropTypes.bool,
    stacked : React.PropTypes.bool,
    eventKey: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ])
};

export default Tab;
