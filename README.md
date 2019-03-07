<p align="center"><a href="https://albertlucianto.github.io/react-with-throttle" target="_blank" rel="noopener noreferrer"><img width="800" src="./web/assets/react-with-throttle-header.jpg" alt="React With Throttle"></a></p>

<p align="center">
<a href="https://codecov.io/github/AlbertLucianto/react-with-throttle?branch=master"><img src="https://img.shields.io/codecov/c/github/AlbertLucianto/react-with-throttle/master.svg" alt="Coverage Status"></a>
<a href="https://travis-ci.org/AlbertLucianto/react-with-throttle"><img src="https://travis-ci.org/AlbertLucianto/react-with-throttle.svg?branch=master" alt="Build Status"></a>
<a href="https://npmcharts.com/compare/react-with-throttle?minimal=true"><img src="https://img.shields.io/npm/dm/react-with-throttle.svg" alt="Downloads"></a>
<a href="https://npmcharts.com/compare/react-with-throttle?minimal=true"><img src="https://img.shields.io/npm/dt/react-with-throttle.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/react-with-throttle"><img src="https://img.shields.io/npm/v/react-with-throttle.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/react-with-throttle"><img src="https://img.shields.io/npm/l/react-with-throttle.svg" alt="License"></a>
<a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)" alt="License"></a>
</p>

## See working example [here](https://albertlucianto.github.io/react-with-throttle).

## Installation

```bash
npm install --save react-with-throttle
# or
yarn add react-with-throttle
```

## Overview

react-with-throttle wraps throttle function in a react component, keeping all your components to be declarative. It accepts `value` prop that changes over time, and forwards it through render prop. One of the use cases is for throttling scroll event.

## Usage

```jsx
import React, { Component } from 'react';
import WithThrottle from 'react-with-throttle';

class FloatingTextOnScroll extends Component {
  render() {
    return (
      <BodyScroll>
        {this.renderContent}
      </BodyScroll>
    );
  }

  renderContent(top) {
    return (
      <WithThrottle value={top} wait={120}>
        {this.renderText}
      </WithThrottle>
    )
  }

  renderText(throttledTop) {
    return <FloatingText top={throttledTop} />;
  }
}
```

### ⚠️ Note ⚠️

Make sure your render function is not recreated every time the parent rerenders. So are for the other props when passing an object or other non-primitive types. For example:

#### Incorrect ❌

```jsx
import React, { Component } from 'react';
import WithThrottle from 'react-with-throttle';

class Foo extends Component {
  render() {
    const { foo, bar } = this.state;
  
    return (
      <WithThrottle
        wait={100}
        value={{ foo: foo + 1, bar }} // object will be recreated every rerender
        options={{ leading: true, trailing: true }} // Also in this one
      >
        {(value) => `${foo}-${bar}`} {/* function will be recreated */}
      </WithThrottle>
    )
  }
}
```

There is no way react-with-throttle should handle deep changes of its props. Instead, keep the non-primitive props' references to avoid unexpected behaviour or performance issue. You can also use memoization to achieve this, one good library is [memoize-one](https://github.com/alexreardon/memoize-one).

#### Correction ✅

```jsx
import React, { Component } from 'react';
import WithThrottle from 'react-with-throttle';
import memo from 'memoize-one';

const options = { leading: true, trailing: true };

class Foo extends Component {
  makeValue = memo((foo, bar) => ({ foo: foo + 1, bar }));

  renderContent(value) {
    return `${foo}-${bar}`;
  }

  render() {
    const { foo, bar } = this.state;

    return (
      <WithThrottle
        wait={100}
        value={this.makeValue(foo, bar)}
        options={options}
      >
        {this.renderContent}
      </WithThrottle>
    )
  }
}
```

## API

&lt;WithThrottle> component accepts these following props:

Name         | Description | Type | Default
-------------|-----------|-----------|---------
`value` | Value to be throttled and forwarded to the `children` render function. | `any` |
`wait` | Throttle interval in ms. In other words, the component will not rerender until the wait time after `value` changes. | `number` |
`children` | Render prop with the forwarded throttled `value`. | `(value: any) => Node` |
`options` | Throttling options. Please refer to [lodash throttle documentation](https://lodash.com/docs/4.17.11#throttle). | `[{[leading]: boolean, [trailing]: boolean }]` | `undefined`

## Changelog

Changes are tracked in the [changelog](CHANGELOG.md).

## License

vuex-search is available under the MIT License.