import React, { PureComponent, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import WithThrottle from 'react-with-throttle';
import cx from 'classnames';
import Slider from '../Slider';
import NumberWithSpinner from '../NumberWithSpinner';
import banner from '../../assets/react-with-throttle-header.jpg';

import './style.scss';

const INITIAL_VALUE = 250;

class App extends PureComponent {
  state = {
    value: INITIAL_VALUE,
    wait: INITIAL_VALUE,
    dragging: false,
  };

  setValue = value => this.setState({ value });

  setThrottle = () => this.setState(({ value }) => ({ wait: value }));

  setDragging = dragging => this.setState({ dragging });

  renderSpinner = value => (
    <NumberWithSpinner
      value={value}
      styleName="app__spinner"
    />
  );

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
              value={value}
              wait={wait}
            >
              {this.renderSpinner}
            </WithThrottle>
            <div styleName="ms">ms</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default hot(module)(App);
