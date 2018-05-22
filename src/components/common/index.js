import glamorous from 'glamorous';

const COLOR = {
    LINK: '#3273dc',
    GREY_DARK: '#4a4a4a',
    GREY_DARKER: '#363636',
    GREY_LIGHTER: '#dbdbdb',
    WHITESMOKE: 'whitesmoke',
    WHITE: '#FFFFFF'
};

export const DEFAULT_THEME = {
    tabs: {
        color: COLOR.GREY_DARK,
        borderBottomColor: COLOR.GREY_LIGHTER,
        active: {
            borderBottomColor: COLOR.LINK,
            color: COLOR.LINK
        },
        hover: {
            borderBottomColor: COLOR.GREY_DARKER,
            color: COLOR.GREY_DARKER
        }
    },
    menu: {
        borderRight: COLOR.GREY_LIGHTER,
        active: {
            backgroundColor: COLOR.LINK,
            color: COLOR.WHITE
        },
        hover: {
            color: COLOR.GREY_DARKER,
            backgroundColor: COLOR.WHITESMOKE
        }
    }
};

const ALLOWED_FLEX_PROPS = [
    'alignItems',
    'background',
    'backgroundColor',
    'border',
    'borderRadius',
    'boxShadow',
    'color',
    'cursor',
    'flex',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'fontSize',
    'height',
    'justifyContent',
    'margin',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'overflow',
    'overflowX',
    'overflowY',
    'padding',
    'width'
];

const __getExplicitFlexStyles = (props, propKeys) => {
    if (!propKeys) throw new Error('Missing required propKeys');
    if (!Array.isArray(propKeys)) throw new Error('propKeys must be an Array');
    return propKeys
        .map(
            prop => (props[prop] !== null && props[prop] !== undefined ? { [prop]: props[prop] } : null)
        )
        .filter(rule => rule);
};

const __getImplicitFlexProps = props => {
    const implicit = [];
    if (props.column) {
        implicit.push({ flexDirection: 'column ' });
    }
    if (props.hAlignCenter) {
        implicit.push(props.column ? { alignItems: 'center' } : { justifyContent: 'center' });
    }
    if (props.vAlignCenter) {
        implicit.push(props.column ? { justifyContent: 'center' } : { alignItems: 'center' });
    }
    return implicit;
};

export const Flex = glamorous.div(
    {
        display: 'flex'
    },
    props => {
        return [...__getImplicitFlexProps(props), ...__getExplicitFlexStyles(props, ALLOWED_FLEX_PROPS)];
    }
);

export const TabList = glamorous.div({
    userSelect: 'none',
    alignItems: 'stretch',
    display: 'flex',
    fontSize: '1rem',
    justifyContent: 'space-between',
    overflow: 'hidden',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    WebkitOverflowScrolling: 'touch'
});

export const TabLink = glamorous.a(
    {
        cursor: 'pointer',
        alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '-1px',
        padding: '0.5em 1em',
        verticalAlign: 'top'
    },
    ({ isActive, theme }) => {
        const styles = [
            {
                color: theme.tabs.color,
                borderBottomColor: theme.tabs.borderBottomColor
            }
        ];
        if (isActive) {
            const { active } = theme.tabs;
            styles.push({
                color: active.color,
                borderBottomColor: active.borderBottomColor,
                ':hover': active
            });
        } else {
            styles.push({
                ':hover': theme.tabs.hover
            });
        }
        return styles;
    }
);

export const TabUL = glamorous.ul(
    {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        display: 'flex',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'flex-start'
    },
    ({ theme }) => {
        return [
            {
                borderBottomColor: theme.tabs.borderBottomColor
            }
        ];
    }
);

export const TabLI = glamorous.li({
    display: 'block'
});

// Vertical Menu
export const MenuList = glamorous.div(
    {
        fontSize: '1rem',
        overflowY: 'auto'
    },
    ({ theme }) => {
        return [
            {
                borderRight: `1px solid ${theme.menu.borderRight}`
            }
        ];
    }
);

export const MenuUL = glamorous.ul({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    lineHeight: 1.25
});

export const MenuLI = glamorous.li({});

export const MenuLink = glamorous.a(
    {
        cursor: 'pointer',
        borderRadius: '2px',
        display: 'block',
        padding: '0.5em 0.75em'
    },
    ({ isActive, theme }) => {
        const styles = [
            {
                color: theme.tabs.color
            }
        ];

        if (isActive) {
            const { active } = theme.menu;
            styles.push({
                color: active.color,
                backgroundColor: active.backgroundColor,
                ':hover': active
            });
        } else {
            styles.push({
                ':hover': theme.menu.hover
            });
        }

        return styles;
    }
);

export const TabDiv = glamorous.div({
    height: '100%',
    width: '100%',
    overflow: 'auto'
});
