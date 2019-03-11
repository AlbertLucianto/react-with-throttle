import cx from 'classnames';
import React, { Fragment, PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import WithThrottle from 'react-with-throttle';
// @ts-ignore
import banner from '../../assets/react-with-throttle-header.jpg';
import DivingScroll from '../DivingScroll';
import ForkTag from '../ForkTag';
import NumberWithSpinner from '../NumberWithSpinner';
import Slider from '../Slider';

import './style.scss';

const INITIAL_VALUE = 250;
const WAIT = 100;
const OPTIONS = {
  trailing: true,
};

interface IAppState {
  dragging: boolean;
  value: number;
}

class App extends PureComponent<IAppState> {
  public state = {
    dragging: false,
    value: INITIAL_VALUE,
  };

  public setValue = (value: number) => this.setState({ value });

  public setDragging = (dragging: boolean) => this.setState({ dragging });

  public renderSpinner = (value: number) => (
    <NumberWithSpinner
      value={value}
      className="app__spinner"
    />
  )

  public render() {
    const { value, dragging } = this.state;

    return (
      <Fragment>
        <img
          src={banner}
          className="banner"
          alt="react-with-throttle"
        />
        <div className="app">
          <Slider
            value={value}
            onChange={this.setValue}
            onDrag={this.setDragging}
          />
          <div className={cx('label', { dragging })}>Throttle interval:</div>
          <div className={cx('app__spinner-wrapper', { dragging })}>
            <WithThrottle
              value={value}
              wait={WAIT}
              options={OPTIONS}
            >
              {this.renderSpinner}
            </WithThrottle>
            <div className="ms">ms</div>
          </div>
        </div>
        <DivingScroll wait={value} />
        <ForkTag />
      </Fragment>
    );
  }
}

export default hot(module)(App);
