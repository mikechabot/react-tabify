[![Build Status](https://travis-ci.org/mikechabot/react-tabify.svg?branch=master)](https://travis-ci.org/mikechabot/react-tabify)
[![Dependency Status](https://david-dm.org/mikechabot/react-tabify.svg)](https://david-dm.org/mikechabot/react-tabify)
[![devDependencies Status](https://david-dm.org/mikechabot/react-tabify/dev-status.svg)](https://david-dm.org/mikechabot/react-tabify?type=dev)

[![NPM](https://nodei.co/npm/react-tabify.png)](https://nodei.co/npm/react-tabify/)

[![GitHub stars](https://img.shields.io/github/stars/mikechabot/react-tabify.svg?style=social&label=Star)](https://github.com/mikechabot/react-tabify)
[![GitHub forks](https://img.shields.io/github/forks/mikechabot/react-tabify.svg?style=social&label=Fork)](https://github.com/mikechabot/react-tabify)

# react-tabify

Dead simple tab component for ReactJS.

- [Installation](#installation)
- [Usage](#usage)
  - [CommonJS](#commonjs)
  - [ES6 Modules](#es6-modules)
  - [Examples](#examples)
    
- [Props](#props)


## <a name="react-tabify#installation">Installation</a>

Yarn or npm:

* `$ yarn add react-tabify`
* `$ npm install --save react-tabify`

## <a name="react-tabify#usage">Usage</a>

### <a name="react-tabify#commonjs">CommonJS</a>

    const { Tabs, Tab } = require('react-tabify');

### <a name="react-tabify#es6-modules">ES6 Modules</a>

    import { Tabs, Tab } from 'react-tabify';
    
### <a name="react-tabify#examples">Examples</a>

**Horizontal**: The default layout

[![Edit ymopvryp81](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ymopvryp81)

    <Tabs id="my-tabs" defaultActiveKey={0}>
      <Tab eventKey={0} label="Tab 1">
        First Content
      </Tab>
      <Tab eventKey={1} label="Tab 2">
        Secont Content
      </Tab>
      <Tab eventKey={2} label="Tab 3">
        Third Content
      </Tab>
    </Tabs>


**Vertical**: Just pass the `stacked` prop to `Tabs`

[![Edit n4yxz04250](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n4yxz04250)

    <Tabs stacked id="my-tabs" defaultActiveKey={0}>
      <Tab eventKey={0} label="Tab 1">
        First Content
      </Tab>
      <Tab eventKey={1} label="Tab 2">
        Secont Content
      </Tab>
      <Tab eventKey={2} label="Tab 3">
        Third Content
      </Tab>
    </Tabs>
