import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import {
  Direction,
  calcGap,
  calcAbsoluteDegree,
  calcOpacity,
  directionPropTypeCheck,
  FULL_DEGREE,
} from './utils';

const OPACITY_TRESHOLD = 150;

class ElementSpinner extends Component {
  state = {
    offset: 0,
    activeIndex: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      elements: { length },
      activeIndex: nextActive,
      direction,
    } = nextProps;

    const { activeIndex, offset } = prevState;

    if (activeIndex !== nextActive) {
      const offsetChange = (activeIndex - nextActive) * calcGap(length);
      return {
        offset: offset + (direction === Direction.UP
          ? (offsetChange - FULL_DEGREE) % FULL_DEGREE
          : (offsetChange + FULL_DEGREE) % FULL_DEGREE),
        activeIndex: nextActive,
      };
    }

    return null;
  }

  renderElements = () => {
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

      return (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          styleName="element"
          className={elementClassName}
          style={{
            transform: `
              rotateX(${degree}deg)
              translate3d(-50%, -50%, ${spinnerRadius}px)
            `,
            opacity,
          }}
        >
          {value}
        </div>
      );
    });
  };

  render() {
    const { className } = this.props;
    return (
      // Use outer div to make overflow hidden works
      <div
        className={className}
        styleName="element_spinner-container"
      >
        {this.renderElements()}
      </div>
    );
  }
}

ElementSpinner.propTypes = {
  // From parent
  elements: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ])).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  activeIndex: PropTypes.number.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  direction: directionPropTypeCheck,
  spinnerRadius: PropTypes.number,
};

ElementSpinner.defaultProps = {
  className: '',
  elementClassName: '',
  direction: Direction.DOWN,
  spinnerRadius: 60,
};

export default ElementSpinner;
