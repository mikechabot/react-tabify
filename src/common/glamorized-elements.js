import glamorous from 'glamorous';

export const Flex = glamorous.div({
    display: 'flex'
},
  props => {
      let styles = [];
      if (props.column) styles.push({ flexDirection: 'column' });
      if (props.height) styles.push({ height: props.height });
      if (props.width) styles.push({ width: props.width });
      if (props.scroll) styles.push({ overflowY: 'auto' });
      return styles;
  }
);

export const UL = glamorous.ul({
    margin      : 0,
    padding     : 0,
    width       : '100%',
    borderBottom: '1px solid #d8dde6'
});

export const StackedUL = glamorous.ul({
    margin     : 0,
    padding    : 0,
    minWidth   : 200,
    width      : '100%',
    borderRight: '1px solid #d8dde6'
},
  props => {
      let styles = [];
      if (props.minWidth) {
          styles.push({ minWidth: props.minWidth });
      }
      return styles;
  }
);

export const StackedLink = glamorous.a(
    {
        fontSize  : '.8125rem',
        cursor    : 'pointer',
        display   : 'inline-block',
        borderLeft: '4px solid white',
        padding   : '0.75rem 1.5rem',
        ':focus'  : {
            textDecoration: 'underline'
        }
    },
  ({ active }) => {
      if (active) return [{ borderLeft: '4px solid #0070d2', color: '#0070d2' }];
  }
);

export const Link = glamorous.a(
    {
        fontSize  : '.8125rem',
        cursor    : 'pointer',
        display   : 'inline-block',
        height    : '2.5rem',
        lineHeight: '2.5rem',
        padding   : '0 .75rem',
        ':hover'  : {
            color       : '#0070d2',
            borderBottom: '2px solid #0070d2'
        }
    },
  ({ active }) => {
      if (active) return [{ borderBottom: '2px solid #0070d2' }];
  }
);

export const LI = glamorous.li({
    display: 'inline'
});

export const StackedLI = glamorous.li(
    {
        cursor  : 'pointer',
        ':hover': {
            backgroundColor: '#f4f6f9'
        }
    },
  ({ active }) => {
      if (active) {
          return [{ width: '100%', backgroundColor: '#f0f8fc' }];
      }
  }
);
