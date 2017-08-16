import glamorous from 'glamorous';

const PRIMARY_BLUE = '#0070d2';
const PRIMARY_GRAY = '#f4f6f9';
const SECONDARY_BLUE = '#f0f8fc';
const BORDER = '#d8dde6';

export const theme = {
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

const BASE_UL = {
    margin   : 0,
    padding  : 0,
    listStyle: 'none'
};

const BASE_LINK = {
    fontSize: '.8125rem',
    cursor  : 'pointer',
    display : 'inline-block'
};

export const UL = glamorous.ul({
    ...BASE_UL,
    ...{
        display     : 'inline-block',
        width       : '100%',
        height      : '2.5rem',
        borderBottom: `1px solid ${BORDER}`
    }
});

export const StackedUL = glamorous.ul({
    ...BASE_UL,
    ...{
        minWidth   : 200,
        width      : '100%',
        height     : '100%',
        borderRight: `1px solid ${BORDER}`
    }},
    props => {
        let styles = [];
        if (props.minWidth) {
            styles.push({ minWidth: props.minWidth });
        }
        return styles;
    }
);

export const Flex = glamorous.div(
    {
        display: 'flex'
    },
    props => {
        let styles = [];
        if (props.column) styles.push({ flexDirection: 'column' });
        if (props.height) styles.push({ height: props.height });
        if (props.width) styles.push({ width: props.width });
        if (props.scroll) styles.push({ overflowY: 'auto' });
        if (props.style) styles.push(props.style);
        return styles;
    }
);

export const StackedLink = glamorous.a({
    ...BASE_LINK,
    ...{
        borderLeft: '4px solid white',
        padding   : '0.75rem 1.5rem',
        ':focus'  : {
            textDecoration: 'underline'
        }
    }},
    ({ active, theme }) => {
        if (active) {
            return [{
                borderLeft: `4px solid ${theme.main.color}`,
                color     : theme.main.color
            }];
        }
    }
);

export const Link = glamorous.a({
    ...BASE_LINK,
    ...{
        height    : '2.5rem',
        lineHeight: '2.5rem',
        padding   : '0 .75rem'
    }},
    ({ active, theme }) => {
        const styles = [{
            ':hover': {
                color       : theme.main.color,
                borderBottom: `2px solid ${theme.main.color}`
            }
        }];
        if (active) styles.push({ borderBottom: `2px solid ${theme.main.color}` });
        return styles;
    }
);

export const LI = glamorous.li({
    display: 'inline-block'
});

export const StackedLI = glamorous.li({
    cursor: 'pointer'
},
    ({ active, theme }) => {
        const styles = [{
            ':hover': {
                backgroundColor: theme.main.hover.backgroundColor
            }
        }];
        if (active) styles.push({ width: '100%', backgroundColor: theme.main.active.backgroundColor });
        return styles;
    }
);
