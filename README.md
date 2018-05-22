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


## <a name="react-tabify#installation">Installation</a>

Yarn or npm:

* `$ yarn add react-tabify`
* `$ npm install --save react-tabify`

## <a name="react-tabify#basic-example">Basic Example</a>

```js
import { Tabs, Tab } from 'react-tabify';

export default () => (
  <Tabs>
    <Tab label="Tab 1">
      First Content
    </Tab>
    <Tab label="Tab 2">
      Secont Content
    </Tab>
    <Tab label="Tab 3">
      Third Content
    </Tab>
  </Tabs>
);
```

## <a name="react-tabify#components">Components</a>

`react-tabify` consists of two (2) components which need to be used together.

### <Tabs />

| Name               | Type                 | Default             | Description   | 
| ------------------ |----------------------| --------------------|------------------------------|
| `id`               | `string`             | `__react-tabify__`  | Id of the `<Tabs />` component |
| `defaultActiveKey` | `string` / `number`  | `0`                 | `eventKey` of the initial `<Tab />` to render |
| `activeKey`        | `string` / `number`  |                     | `eventKey` of the current `<Tab />` |
| `stacked`          | `bool`               | `false`             | Whether to display `<Tabs />` vertically  |
| `onSelect`         | `func`               |                     | Callback fired when a `<Tab />` is selected |
| `style`            | `object`             |                     | style forwarded to the `<Tab />` containing `<div />`   |
| `children`         | `node`               |                     | `<Tab />` components  |


By default, the `<Tabs />` component is uncontrolled, however you can optionally pass a `defaultActiveKey`, which corresponds to the `eventKey` of a particular `<Tab />`, and the inital tab set will be set on render. 

### <Tab />
