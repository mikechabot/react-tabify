'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StackedLI = exports.LI = exports.Link = exports.StackedLink = exports.Flex = exports.StackedUL = exports.UL = exports.theme = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PRIMARY_BLUE = '#0070d2';
var PRIMARY_GRAY = '#f4f6f9';
var SECONDARY_BLUE = '#f0f8fc';
var BORDER = '#d8dde6';

var theme = exports.theme = {
    main: {
        color: PRIMARY_BLUE,
        hover: {
            backgroundColor: PRIMARY_GRAY
        },
        active: {
            backgroundColor: SECONDARY_BLUE
        }
    }
};

var BASE_UL = {
    margin: 0,
    padding: 0,
    listStyle: 'none'
};

var BASE_LINK = {
    fontSize: '.8125rem',
    cursor: 'pointer',
    display: 'inline-block'
};

var UL = exports.UL = _glamorous2.default.ul(_extends({}, BASE_UL, {
    display: 'inline-block',
    width: '100%',
    height: '2.5rem',
    borderBottom: '1px solid ' + BORDER
}));

var StackedUL = exports.StackedUL = _glamorous2.default.ul(_extends({}, BASE_UL, {
    minWidth: 200,
    width: '100%',
    height: '100%',
    borderRight: '1px solid ' + BORDER
}), function (props) {
    var styles = [];
    if (props.minWidth) {
        styles.push({ minWidth: props.minWidth });
    }
    return styles;
});

var Flex = exports.Flex = _glamorous2.default.div({
    display: 'flex'
}, function (props) {
    var styles = [];
    if (props.column) styles.push({ flexDirection: 'column' });
    if (props.height) styles.push({ height: props.height });
    if (props.width) styles.push({ width: props.width });
    if (props.scroll) styles.push({ overflowY: 'auto' });
    if (props.style) styles.push(props.style);
    return styles;
});

var StackedLink = exports.StackedLink = _glamorous2.default.a(_extends({}, BASE_LINK, {
    borderLeft: '4px solid white',
    padding: '0.75rem 1.5rem',
    ':focus': {
        textDecoration: 'underline'
    }
}), function (_ref) {
    var active = _ref.active,
        theme = _ref.theme;

    if (active) {
        return [{
            borderLeft: '4px solid ' + theme.main.color,
            color: theme.main.color
        }];
    }
});

var Link = exports.Link = _glamorous2.default.a(_extends({}, BASE_LINK, {
    height: '2.5rem',
    lineHeight: '2.5rem',
    padding: '0 .75rem'
}), function (_ref2) {
    var active = _ref2.active,
        theme = _ref2.theme;

    var styles = [{
        ':hover': {
            color: theme.main.color,
            borderBottom: '2px solid ' + theme.main.color
        }
    }];
    if (active) styles.push({ borderBottom: '2px solid ' + theme.main.color });
    return styles;
});

var LI = exports.LI = _glamorous2.default.li({
    display: 'inline-block'
});

var StackedLI = exports.StackedLI = _glamorous2.default.li({
    cursor: 'pointer'
}, function (_ref3) {
    var active = _ref3.active,
        theme = _ref3.theme;

    var styles = [{
        ':hover': {
            backgroundColor: theme.main.hover.backgroundColor
        }
    }];
    if (active) styles.push({ width: '100%', backgroundColor: theme.main.active.backgroundColor });
    return styles;
});