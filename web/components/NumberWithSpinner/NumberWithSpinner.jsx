import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'is-number';
import ElementSpinner, { Direction } from '../ElementSpinner';

import { generateNumbers, splitDigits } from './utils';

import './style.scss';

const digits = generateNumbers(10);

class NumberWithSpinner extends Component {
  state = {
    numbers: [],
    direction: Direction.DOWN,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: nextValue } = nextProps;
    const { value } = prevState;

    if (nextValue !== value) {
      const numbers = splitDigits(nextValue);
      return {
        numbers,
        value: nextValue,
        direction: nextValue > value
          ? Direction.UP
          : Direction.DOWN,
      };
    }

    return null;
  }

  render() {
    const {
      className,
      elementClassName,
      digitClassName,
    } = this.props;
    const { numbers, direction } = this.state;

    return (
      <div
        styleName="number_with_spinner-container"
        className={className}
      >
        {numbers.map((number, idx) => (
          isNumber(number)
            ? (
              <ElementSpinner
                styleName="element-number"
                className={digitClassName}
                elementClassName={elementClassName}
                // eslint-disable-next-line react/no-array-index-key
                key={numbers.length - idx}
                elements={digits}
                activeIndex={number}
                direction={direction}
              />
            )
            : number
        ))}
      </div>
    );
  }
}

NumberWithSpinner.propTypes = {
  /**
   * From parent
   * The following line has an open issue:
   * https://github.com/yannickcr/eslint-plugin-react/issues/2028
   */
  // eslint-disable-next-line react/no-unused-prop-types
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  digitClassName: PropTypes.string,
  elementClassName: PropTypes.string,
};

NumberWithSpinner.defaultProps = {
  className: '',
  elementClassName: '',
  digitClassName: '',
};

export default NumberWithSpinner;
