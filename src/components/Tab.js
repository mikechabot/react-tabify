import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '../common/glamorized-elements';

function Tab ({
    id,
    stacked,
    children
}) {
    return (
        <Flex
            scroll={true}
            id={id}
            stacked={stacked}
            height="100%">
            {children}
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
