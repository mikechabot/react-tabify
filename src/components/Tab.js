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
            style={style}
            stacked={stacked}
            height="100%"
            width="100%">
            { children }
        </Flex>
    );
}

Tab.propTypes = {
    id      : PropTypes.string,
    label   : PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
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
