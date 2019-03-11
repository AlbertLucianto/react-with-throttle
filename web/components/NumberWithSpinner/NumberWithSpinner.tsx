import cx from 'classnames';
import isNumber from 'is-number';
import React, { Component } from 'react';
import ElementSpinner, { Direction } from '../ElementSpinner';

import { generateNumbers, splitDigits } from './utils';

import './style.scss';

const digits = generateNumbers(10).map((d) => `${d}`);

interface INumberWithSpinnerProps {
  value: number;
  className?: string;
  digitClassName?: string;
  elementClassName?: string;
}

interface INumberWithSpinnerState {
  numbers: number[];
  direction: Direction;
  value: number;
}

class NumberWithSpinner extends Component<INumberWithSpinnerProps> {
  public static defaultProps = {
    className: '',
    digitClassName: '',
    elementClassName: '',
  };

  public static getDerivedStateFromProps(
    nextProps: INumberWithSpinnerProps,
    prevState: INumberWithSpinnerState,
  ) {
    const { value: nextValue } = nextProps;
    const { value } = prevState;

    if (nextValue !== value) {
      const numbers = splitDigits(nextValue);
      return {
        direction: nextValue > value
          ? Direction.UP
          : Direction.DOWN,
        numbers,
        value: nextValue,
      };
    }

    return null;
  }

  public state: INumberWithSpinnerState = {
    direction: Direction.DOWN,
    numbers: [],
    value: null,
  };

  public render() {
    const { className } = this.props;
    const { numbers } = this.state;

    return (
      <div className={cx('number_with_spinner-container', className)}>
        {numbers.map(this.renderNumber)}
      </div>
    );
  }

  private renderNumber = (num: number, idx: number) => {
    const {
      elementClassName,
      digitClassName,
    } = this.props;
    const { numbers, direction } = this.state;

    return isNumber(num)
      ? (
        <ElementSpinner
          className={cx('element-number', digitClassName)}
          elementClassName={elementClassName}
          // eslint-disable-next-line react/no-array-index-key
          key={numbers.length - idx}
          elements={digits}
          activeIndex={num}
          direction={direction}
        />
      )
      : num;
  }
}

export default NumberWithSpinner;
