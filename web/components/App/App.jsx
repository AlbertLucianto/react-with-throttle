import React, { PureComponent, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import cx from 'classnames';
import memo from 'memoize-one';
import WithThrottle from '../../../src';
import Slider from '../Slider';
import NumberWithSpinner from '../NumberWithSpinner';
import ForkTag from '../ForkTag';
import banner from '../../assets/react-with-throttle-header.jpg';

import './style.scss';

const INITIAL_VALUE = 250;
const OPTIONS = {
  trailing: true,
};

class App extends PureComponent {
  state = {
    value: INITIAL_VALUE,
    wait: INITIAL_VALUE,
    dragging: false,
  };

  // eslint-disable-next-line
  makeValue = memo((value, wait, dragging) => ({
    value,
    wait,
    dragging,
  }));

  setValue = value => this.setState({ value });

  setThrottle = () => this.setState(({ value }) => ({ wait: value }));

  setDragging = dragging => this.setState({ dragging });

  renderSpinner = ({ value, wait, dragging }) => (
    <NumberWithSpinner
      value={dragging ? value : wait}
      styleName="app__spinner"
    />
  )

  render() {
    const { value, wait, dragging } = this.state;

    return (
      <Fragment>
        <img
          src={banner}
          styleName="banner"
          alt="react-with-throttle"
        />
        <div styleName="app">
          <Slider
            value={value}
            onChange={this.setValue}
            onRelease={this.setThrottle}
            onDrag={this.setDragging}
          />
          <div styleName={cx('label', { dragging })}>Throttle interval:</div>
          <div styleName={cx('app__spinner-wrapper', { dragging })}>
            <WithThrottle
              value={this.makeValue(value, wait, dragging)}
              wait={wait}
              options={OPTIONS}
            >
              {this.renderSpinner}
            </WithThrottle>
            <div styleName="ms">ms</div>
          </div>
        </div>
        <ForkTag />
      </Fragment>
    );
  }
}

export default hot(module)(App);
