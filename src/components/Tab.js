import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from './common';

function Tab ({
    id,
    style,
    stacked,
    children
}) {
    return (
        <Flex
            id={id}
            style={{
                ...stacked ? {paddingLeft: 10} : {paddingTop: 10},
                ...style
            }}
            stacked={stacked}
            height="100%"
            width="100%">
            { children }
        </Flex>
    );
}

Tab.propTypes = {
    id      : PropTypes.string,
    label   : PropTypes.string,
    children: PropTypes.node,
    style   : PropTypes.object,
    show    : PropTypes.bool,
    stacked : PropTypes.bool,
    eventKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default Tab;
