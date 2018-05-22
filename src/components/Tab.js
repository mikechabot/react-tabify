import React from 'react';
import PropTypes from 'prop-types';
import { TabDiv } from './common';

function Tab ({ id, style, children }) {
    return (
      <TabDiv id={id} style={style}>
          {children}
      </TabDiv>
    );
}

Tab.propTypes = {
    id      : PropTypes.string,
    label   : PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
    children: PropTypes.node,
    style   : PropTypes.object,
    hide    : PropTypes.bool,
    eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Tab;
