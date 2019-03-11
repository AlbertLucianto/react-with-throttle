import React, { PureComponent, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import cx from 'classnames';
import WithThrottle from '../../../dist/index.esm';
import Slider from '../Slider';
import NumberWithSpinner from '../NumberWithSpinner';
import ForkTag from '../ForkTag';
import DivingScroll from '../DivingScroll';
import banner from '../../assets/react-with-throttle-header.jpg';

import './style.scss';

const INITIAL_VALUE = 250;
const WAIT = 100;
const OPTIONS = {
  trailing: true,
};

class App extends PureComponent {
  state = {
    value: INITIAL_VALUE,
    dragging: false,
  };

  setValue = value => this.setState({ value });

  setDragging = dragging => this.setState({ dragging });

  renderSpinner = value => (
    <NumberWithSpinner
      value={value}
      styleName="app__spinner"
    />
  )

  render() {
    const { value, dragging } = this.state;

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
            onDrag={this.setDragging}
          />
          <div styleName={cx('label', { dragging })}>Throttle interval:</div>
          <div styleName={cx('app__spinner-wrapper', { dragging })}>
            <WithThrottle
              value={value}
              wait={WAIT}
              options={OPTIONS}
            >
              {this.renderSpinner}
            </WithThrottle>
            <div styleName="ms">ms</div>
          </div>
        </div>
        <DivingScroll wait={value} />
        <ForkTag />
      </Fragment>
    );
  }
}

export default hot(module)(App);
