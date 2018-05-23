[![Build Status](https://travis-ci.org/mikechabot/react-tabify.svg?branch=master)](https://travis-ci.org/mikechabot/react-tabify)
[![Dependency Status](https://david-dm.org/mikechabot/react-tabify.svg)](https://david-dm.org/mikechabot/react-tabify)
[![devDependencies Status](https://david-dm.org/mikechabot/react-tabify/dev-status.svg)](https://david-dm.org/mikechabot/react-tabify?type=dev)

[![NPM](https://nodei.co/npm/react-tabify.png)](https://nodei.co/npm/react-tabify/)

[![GitHub stars](https://img.shields.io/github/stars/mikechabot/react-tabify.svg?style=social&label=Star)](https://github.com/mikechabot/react-tabify)
[![GitHub forks](https://img.shields.io/github/forks/mikechabot/react-tabify.svg?style=social&label=Fork)](https://github.com/mikechabot/react-tabify)

# react-tabify

A dead simple tab component for ReactJS.

- [Installation](#installation)
- [Basic Example](#basic-example)
- [Components](#components)
- [Controlled vs Uncontrolled Mode](#controlled-vs-uncontrolled-mode)
- [Other Examples](#other-examples)
  - [Stacked](#stacked)
  - [Nested](#nested)
  - [Sticky](#sticky)
  - [Container Overflow](#container-overflow)
  - [Hiding Tabs](#hiding-tabs)
- [Color Theme](#color-theme)

## <a name="react-tabify#installation">Installation</a>

Yarn or npm:

* `$ yarn add react-tabify`
* `$ npm install --save react-tabify`

----

## <a name="react-tabify#basic-example">Basic Example</a>

```js
import { Tab, Tabs } from 'react-tabify';

export default () => (
  <Tabs>
    <Tab label="Tab 1">First Content</Tab>
    <Tab label="Tab 2">Secont Content</Tab>
    <Tab label="Tab 3">Third Content</Tab>
  </Tabs>
);
```

[![Edit 23x92qvy9n](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/23x92qvy9n)

----

## <a name="react-tabify#components">Components</a>

`react-tabify` consists of two (2) components which need to be used together.

### `<Tabs />`

| Name               | Type                 | Default             | Description                                             | 
| ------------------ |----------------------| --------------------|---------------------------------------------------------|
| `id`               | `string`             | `__tabify__`        | Id of the `<Tabs />` component                          |
| `defaultActiveKey` | `string` / `number`  | `0`                 | `eventKey` of the initial `<Tab />` to render           |
| `activeKey`        | `string` / `number`  |                     | `eventKey` of the current `<Tab />`                     |
| `theme  `          | `object`             |                     | Optional color theme                                    |
| `stacked`          | `bool`               | `false`             | Whether to display `<Tabs />` vertically                |
| `sticky`           | `bool`               | `false`             | Enable sticky tabs
| `onSelect`         | `func`               |                     | Callback fired when a `<Tab />` is selected             |
| `style`            | `object`             |                     | style forwarded to the `<Tab />` containing `<div />`   |
| `children`         | `node`               |                     | `<Tab />` components                                    |

----

### `<Tab />`

| Name               | Type                 | Default             | Description                                             | 
| ------------------ |----------------------| --------------------|---------------------------------------------------------|
| `eventKey `        | `string` / `number`  | `index`             | Unique key of the `<Tab />`                             |
| `label`            | `string` / `node`    |                     | Label of the `<Tab/>`                                   |
| `hide `            | `bool`               | false               | Whether to hide the `<Tab/>`                            |
| `style`            | `object`             |                     | style forwarded to the `<Tab />` containing `<div />`   |  
| `children`         | `node`               |                     | Any abritary React node                                 |

----

## <a name="react-tabify#controlled-vs-uncontrolled-mode">Controlled vs Uncontrolled Mode</a>

### Uncontrolled Mode

By default, `<Tabs />` are uncontrolled, and will display the first `<Tab />` child during initial render. Use `defaultActiveKey` to default to another `<Tab />` instead.

If `<Tab />` components are not passed an `eventKey`, they will default to their order index. In the example below, we're defaulting `<Tabs />` to display "Tab 3" since it sits at the second index (`defaultActiveKey={2}`).

```js
export default () => (
  <Tabs defaultActiveKey={2}>
    <Tab label="Tab 1">First Content</Tab>
    <Tab label="Tab 2">Secont Content</Tab>
    <Tab label="Tab 3">Third Content</Tab>
  </Tabs>
);
```
[![Edit k9zlwno4zv](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/k9zlwno4zv)

----

### Controlled Mode

Alternatively, to control the component, pass an `activeKey`, however you must pass an `onSelect` callback to handle the event. `onSelect` passes the `eventKey` of the selected `<Tab />`.

Again, if your `<Tab />` components are not passed an `eventKey`, they will default to their order index.

```js
import { Tab, Tabs } from 'react-tabify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0
    };
  }

  handleTabSelect = activeKey => {
    this.setState({ activeKey });
  };

  render() {
    return (
      <Tabs activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
        <Tab label="Tab 1">First Content</Tab>
        <Tab label="Tab 2">Secont Content</Tab>
        <Tab label="Tab 3">Third Content</Tab>
      </Tabs>
    );
  }
}
```

[![Edit 30zw8qz25p](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/30zw8qz25p)

----

## <a name="react-tabify#other-examples">Other Examples</a>

### <a name="react-tabify#stacked">Stacked</a>

Add the `stacked` prop to render the tabs vertically.

```js
export default () => (
  <Tabs stacked>
    <Tab label="Tab 1">First Content</Tab>
    <Tab label="Tab 2">Secont Content</Tab>
    <Tab label="Tab 3">Third Content</Tab>
  </Tabs>
);
```
[![Edit p5y4mpxowq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p5y4mpxowq)

----

### <a name="react-tabify#sticky">Sticky</a>

If `<Tabs />` is uncontrolled, pass `sticky` to "remember" the last active `<Tab />` between page refreshes. When `sticky` is enabled, you must pass you own `id` to `<Tabs />`. This will be used within `LocalStorage` to distinguish between multiple `<Tabs />` instances.

> `LocalStorage` must be enabled in the browser.

```js
export default () => (
  <Tabs sticky>
    <Tab label="Tab 1">First Content</Tab>
    <Tab label="Tab 2">Secont Content</Tab>
    <Tab label="Tab 3">Third Content</Tab>
  </Tabs>
);
```
[![Edit ovqynq18k9](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ovqynq18k9)

----

### <a name="react-tabify#nested">Nested</a>

Easily nest tabs to create a section/subsection layout.

```js
export default () => (
  <Tabs stacked>
    <Tab label="Tab 1">
      <Tabs>
        <Tab label="Subtab 1.1">Tab 1 Content 1</Tab>
        <Tab label="Subtab 1.2">Tab 1 Content 2</Tab>
        <Tab label="Subtab 1.3">Tab 1 Content 3</Tab>
      </Tabs>
    </Tab>
    <Tab label="Tab 2">
      <Tabs>
        <Tab label="Subtab 2.1">Tab 2 Content 1</Tab>
        <Tab label="Subtab 2.2">Tab 2 Content 2</Tab>
        <Tab label="Subtab 2.3">Tab 2 Content 3</Tab>
      </Tabs>
      </Tab>
    <Tab label="Tab 3">
      <Tabs>
        <Tab label="Subtab 3.1">Tab 3 Content 1</Tab>
        <Tab label="Subtab 3.2">Tab 3 Content 2</Tab>
        <Tab label="Subtab 3.3">Tab 3 Content 3</Tab>
      </Tabs>
    </Tab>
  </Tabs>
);
```

[![Edit 2pvlwjzp60](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2pvlwjzp60)

----

### <a name="react-tabify#container-overflow">Container Overflow</a>

To ensure that scrolling (i.e. `overflow`) is only visible within the `<Tab />` component, we'll want to wrap `<Tabs />` with a Flexbox whose height is set to `100%`. Otherwise, if our `<Tab />` had enough content to induce a scrollbar, our entire `<Tabs />` component would be subject to scrolling, which means the clickable tab links (horizontal and stacked) could scroll out of view.    

```js
const tabsContainer = {
  display: "flex",
  height: "100%"
};

const App = () => (
  <div style={tabsContainer}>
    <Tabs stacked>
      <Tab label="Tab 1" style={tabStyle}>
       {__getLorumIpsum()}
      </Tab>
      <Tab label="Tab 2" style={tabStyle}>
       {__getLorumIpsum()}
      </Tab>
      <Tab label="Tab 3" style={tabStyle}>
        {__getLorumIpsum()}
      </Tab>
    </Tabs>
  </div>
);
```

[![Edit w2wzlnqyw](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/w2wzlnqyw)

----

### <a name="react-tabify#hiding-tabs">Hiding Tabs</a>

Use the `hide` prop to dynmically hide/show `<Tab />` components. Pass a `bool`, or evaluate a function that returns a `bool`.

```js
// Dummy rejection
const __hasAccess = user => false;

const App = ({ user }) => (
  <div style={styles}>
    <Tabs>
      <Tab label="Super Admin Tab" hide>
        Super Admin Content
      </Tab>
      <Tab label="Admin Tab" hide={() => !__hasAccess(user)}>
        Admin Content
      </Tab>
      <Tab label="User Tab">User Content</Tab>
    </Tabs>
  </div>
);
```

[![Edit 1y19m2q7mj](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1y19m2q7mj)

----

## <a name="react-tabify#color-theme">Color Theme</a>

`react-tabify` leverages `<ThemeManager />` from [glamorous](https://github.com/paypal/glamorous) to expose an optional `theme` object. The `tabs` property of the `theme` controls the horizontal styling, while `menu` controls the stacked view. 

> Accepts any valid color (e.g. "red", "#FF0000", "hsl(0, 100%, 50%)", "rgb(255, 0, 0)", etc).


##### Theme object
```js
const theme = {
  tabs: {
    color: <color>,
    borderBottomColor: <color>,
    active: {
      borderBottomColor: <color>,
      color: <color>
    },
    hover: {
      borderBottomColor: <color>,
      color: <color>
    }
  },
  menu: {
    color: <color>,
    borderRight: <color>,
    active: {
        backgroundColor: <color>,
        color: <color>
    },
    hover: {
        color: <color>,
        backgroundColor: <color>
    }
  }
};
```

Override any of the properties above: 

```js
const theme = {
  tabs: {
    color: "red",
    active: {
      color: "green"
    }
  }
}

const App = () => (
  <Tabs theme={theme}>
    <Tab label="Tab 1">First Content</Tab>
    <Tab label="Tab 2">Second Content</Tab>
    <Tab label="Tab 3">Third Content</Tab>
  </Tabs>
);
```

[![Edit jjw53xqn69](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jjw53xqn69)

A more complex, yet very ugly theme:

```js
const theme = {
  tabs: {
    color: "#FF000",
    active: {
      color: "green"
    }
  },
  menu: {
    color: "hsl(248, 39%, 39%)",
    borderRight: "darkmagenta",
    active: {
      backgroundColor: "rgb(165,42,42)"
    },
    hover: {
      color: "hsl(240, 100%, 50%)"
    }
  }
};

const App = () => (
  <Tabs stacked theme={theme}>
    <Tab label="Tab 1">
      <Tabs theme={theme}>
        <Tab label="Subtab 1.1">Tab 1 Content 1</Tab>
        <Tab label="Subtab 1.2">Tab 1 Content 2</Tab>
        <Tab label="Subtab 1.3">Tab 1 Content 3</Tab>
      </Tabs>
    </Tab>
    <Tab label="Tab 2">
      <Tabs theme={theme}>
        <Tab label="Subtab 2.1">Tab 2 Content 1</Tab>
        <Tab label="Subtab 2.2">Tab 2 Content 2</Tab>
        <Tab label="Subtab 2.3">Tab 2 Content 3</Tab>
      </Tabs>
    </Tab>
    <Tab label="Tab 3">
      <Tabs theme={theme}>
        <Tab label="Subtab 3.1">Tab 3 Content 1</Tab>
        <Tab label="Subtab 3.2">Tab 3 Content 2</Tab>
        <Tab label="Subtab 3.3">Tab 3 Content 3</Tab>
      </Tabs>
    </Tab>
  </Tabs>
);
```

[![Edit nkk5550ox4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nkk5550ox4)
