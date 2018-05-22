import React from 'react';
import PropTypes from 'prop-types';
import {TabDiv} from './glamorous';

function Tab ({
    id,
    style,
    stacked,
    children
}) {
    return (
        <TabDiv
            id={id}
            style={style}
            height="100%"
            width="100%">
            { children }
        </TabDiv>
    );
}

Tab.propTypes = {
    id      : PropTypes.string.isRequired,
    label   : PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
    children: PropTypes.node,
    style   : PropTypes.object,
    hide    : PropTypes.bool,
    eventKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default Tab;
