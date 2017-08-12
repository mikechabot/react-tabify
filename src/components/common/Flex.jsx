import React from 'react';

export default function Flex ({
    id,
    style,
    className,
    column,
    vAlignCenter,
    hAlignCenter,
    alignItems,
    justifyContent,
    flexShrink,
    flex,
    width,
    height,
    color,
    border,
    margin,
    padding,
    backgroundColor,
    onMouseOver,
    onMouseOut,
    onClick,
    children
}) {
    let cssClasses = `${className || ''} xcms-flex`;
    return (
        <div
            id={id}
            className={cssClasses}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            style={{
                ...{...column ? {flexDirection: 'column'} : {}},
                ...{alignItems, justifyContent},
                ...vAlignCenter ? column ? {justifyContent: 'center'} : {alignItems: 'center'} : {},
                ...hAlignCenter ? column ? {alignItems: 'center'} : {justifyContent: 'center'} : {},
                ...{color, border, backgroundColor, width, height, margin, padding, flex, flexShrink},
                ...style
            }}>
            { children }
        </div>
    );
}

Flex.propTypes = {
    id             : React.PropTypes.string,
    style          : React.PropTypes.object,
    className      : React.PropTypes.string,
    column         : React.PropTypes.bool,
    vAlignCenter   : React.PropTypes.bool,
    hAlignCenter   : React.PropTypes.bool,
    alignItems     : React.PropTypes.string,
    justifyContent : React.PropTypes.string,
    flexShrink     : React.PropTypes.number,
    flex           : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    width          : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    height         : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    color          : React.PropTypes.string,
    border         : React.PropTypes.string,
    margin         : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    padding        : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    backgroundColor: React.PropTypes.string,
    onMouseOver    : React.PropTypes.func,
    onMouseOut     : React.PropTypes.func,
    onClick        : React.PropTypes.func,
    children       : React.PropTypes.node
};
