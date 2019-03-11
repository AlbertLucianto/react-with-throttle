import cx from 'classnames';
import React, { Component } from 'react';

import './style.scss';
import {
  calcAbsoluteDegree,
  calcGap,
  calcOpacity,
  Direction,
  FULL_DEGREE,
} from './utils';

const OPACITY_TRESHOLD = 150;

interface IElementSpinnerProps {
  elements: Array<JSX.Element|string>;
  activeIndex: number;
  className?: string;
  elementClassName?: string;
  direction?: Direction;
  spinnerRadius?: number;
}

interface IElementSpinnerState {
  activeIndex: number;
  offset: number;
}

class ElementSpinner extends Component<IElementSpinnerProps, IElementSpinnerState> {
  public static defaultProps = {
    className: '',
    direction: Direction.DOWN,
    elementClassName: '',
    spinnerRadius: 60,
  };

  public static getDerivedStateFromProps(
    nextProps: IElementSpinnerProps,
    prevState: IElementSpinnerState,
  ) {
    const {
      elements: { length },
      activeIndex: nextActive,
      direction,
    } = nextProps;

    const { activeIndex, offset } = prevState;

    if (activeIndex !== nextActive) {
      const offsetChange = (activeIndex - nextActive) * calcGap(length);
      return {
        activeIndex: nextActive,
        offset: offset + (direction === Direction.UP
          ? (offsetChange - FULL_DEGREE) % FULL_DEGREE
          : (offsetChange + FULL_DEGREE) % FULL_DEGREE),
      };
    }

    return null;
  }

  public state = {
    activeIndex: 0,
    offset: 0,
  };

  public render() {
    const { className } = this.props;
    return (
      // Use outer div to make overflow hidden works
      <div className={cx('element_spinner-container', className)}>
        {this.renderElements()}
      </div>
    );
  }

  private renderElements = () => {
    const { offset } = this.state;
    const {
      elements,
      elementClassName,
      spinnerRadius,
    } = this.props;
    const { length } = elements;

    return elements.map((value, idx) => {
      const degree = calcAbsoluteDegree(length, idx, offset);
      const opacity = calcOpacity(degree, OPACITY_TRESHOLD);

      const transform = `rotateX(${degree}deg) translate3d(-50%, -50%, ${spinnerRadius}px)`;

      return (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={cx('element', elementClassName)}
          style={{ transform, opacity }}
        >
          {value}
        </div>
      );
    });
  }
}

export default ElementSpinner;
