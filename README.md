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



## <a name="react-tabify#installation">Installation</a>

Yarn or npm:

* `$ yarn add react-tabify`
* `$ npm install --save react-tabify`

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

## <a name="react-tabify#components">Components</a>

`react-tabify` consists of two (2) components which need to be used together.

### `<Tabs />`

| Name               | Type                 | Default             | Description                                             | 
| ------------------ |----------------------| --------------------|---------------------------------------------------------|
| `id`               | `string`             | `__react-tabify__`  | Id of the `<Tabs />` component                          |
| `defaultActiveKey` | `string` / `number`  | `0`                 | `eventKey` of the initial `<Tab />` to render           |
| `activeKey`        | `string` / `number`  |                     | `eventKey` of the current `<Tab />`                     |
| `stacked`          | `bool`               | `false`             | Whether to display `<Tabs />` vertically                |
| `onSelect`         | `func`               |                     | Callback fired when a `<Tab />` is selected             |
| `style`            | `object`             |                     | style forwarded to the `<Tab />` containing `<div />`   |
| `children`         | `node`               |                     | `<Tab />` components                                    |

### `<Tab />`

| Name               | Type                 | Default             | Description                                             | 
| ------------------ |----------------------| --------------------|---------------------------------------------------------|
| `eventKey `        | `string` / `number`  | `index`             | Unique key of the `<Tab />`                             |
| `label`            | `string` / `node`    |                     | Label of the `<Tab/>`                                   |
| `style`            | `object`             |                     | style forwarded to the `<Tab />` containing `<div />`   |  
| `children`         | `node`               |                     | Any abritary React node                                 |

## <a name="react-tabify#controlled-vs-uncontrolled-mode">Controlled vs Uncontrolled Mode</a>

### Uncontrolled Mode

By default, the `<Tabs />` component is uncontrolled, and will display the first `<Tab />` child during render. However, pass a `defaultActiveKey`, which corresponds to the `eventKey` of a `<Tab />`, to override the default. After this, `<Tabs />` will manage itself.

If `<Tab />` components are not passed an `eventKey`, they will default to their order index. In the example below, we're defaulting `<Tabs />` to display "Tab 3" since it sits at index `2`.

```js
<Tabs defaultActiveKey={2}>
  <Tab label="Tab 1">First Content</Tab>
  <Tab label="Tab 2">Secont Content</Tab>
  <Tab label="Tab 3">Third Content</Tab>
</Tabs>
```
[![Edit k9zlwno4zv](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/k9zlwno4zv)

### Controlled Mode

Alternatively, to control the component, pass an `activeKey`, which corresponds to the `eventKey` of a `<Tab />`, however you must pass an `onSelect` callback to handle the event. `onSelect` passes the `eventKey` of the selected `<Tab />`.

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
