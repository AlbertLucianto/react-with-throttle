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
$ yarn add react-with-throttle # or using npm
```

## Overview

react-with-throttle wraps throttle function in a react component, keeping all your components to be declarative. It accepts `value` prop that changes over time, and forwards it through render prop. One of the use cases is for throttling scroll event.

## Usage

```jsx
import React, { Component } from 'react';
import WithThrottle from 'react-with-throttle';

class FloatingTextOnScroll extends Component {
  // ... listen scrollTop of body

  render() {
    const { top } = this.state;

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

### ⚠️ Important Note ⚠️

Make sure your render function is not recreated every time the parent rerenders. The same with the other props when passing an object or other non-primitive types. For example:

#### Incorrect ❌

```jsx
import React, { Component } from 'react';
import WithThrottle from 'react-with-throttle';

class Foo extends Component {
  render() {
    const { foo } = this.state;
  
    return (
      <WithThrottle
        wait={100}
        value={{ bar: foo }} // object will be recreated every rerender
        options={{ leading: true, trailing: true }} // Also in this one
      >
        {(value) => `${value.bar}-baz`} {/* function will be recreated */}
      </WithThrottle>
    )
  }
}
```

react-with-throttle is responsible for limiting rerendering of `value` changes. Conversely, the other props are shallowly compared. So, if these props keep changing, there is no way it can throttle the rerendering.

Hence, you need to keep the non-primitive props' references to avoid unexpected behaviour or performance issue. You can also use memoization to achieve this, one good library is [memoize-one](https://github.com/alexreardon/memoize-one).

#### Correction ✅

```jsx
import React, { Component } from 'react';
import WithThrottle from 'react-with-throttle';
import memo from 'memoize-one';

const options = { leading: true, trailing: true };

class Foo extends Component {
  makeValue = memo(foo => ({ bar: foo }));

  renderContent(value) {
    return `${value.bar}-baz`;
  }

  render() {
    const { foo } = this.state;

    return (
      <WithThrottle
        wait={100}
        value={this.makeValue(foo)}
        options={options}
      >
        {this.renderContent}
      </WithThrottle>
    )
  }
}
```

#### Using Hook ✅

```jsx
import React, { useMemo } from 'react';
import useSomeState from './utils';

const options = { leading: true, trailing: true };

function Foo() {
  const [state] = useSomeState();
  const value = useMemo(() => ({ bar: state.foo }), [state.foo]);
  const renderContent = useCallback(({ bar }) => `${bar}-baz`);

  return (
    <WithThrottle
      wait={100}
      value={value}
      options={options}
    >
      {renderContent}
    </WithThrottle>
  );
}
```

## API

&lt;WithThrottle> component accepts these following props:

Name         | Description | Type | Default
-------------|-----------|-----------|---------
`value` | Value to be throttled and forwarded to the `children` render function by argument. | `any` |
`wait` | Throttle interval in ms. In other words, the component will not rerender until the wait time after `value` changes. | `number` |
`children` | Render prop with the forwarded throttled `value`. | `(value: any) => Node` |
`options` | Throttling options. Please refer to [lodash throttle documentation](https://lodash.com/docs/4.17.11#throttle). | `[{[leading]: boolean, [trailing]: boolean }]` | `undefined`

## Changelog

Changes are tracked in the [changelog](CHANGELOG.md).

## License

react-with-throttle is available under the MIT License.