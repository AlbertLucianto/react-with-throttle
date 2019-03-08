import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.scss';

const MAX = 500;
const MIN = 100;

const normalize = value => Math.round(Math.min(Math.max(value, MIN), MAX));

const computeStyle = value => ({
  left: `${((value - MIN) / (MAX - MIN)) * 100}%`,
});

const computeValueChange = (positionChange, left, right) => {
  const ratio = positionChange / (right - left);
  return (ratio * (MAX - MIN));
};

class Slider extends PureComponent {
  state = {
    dragging: false,
    startPosition: null,
    lastValue: null,
  };

  slider = createRef();

  componentDidMount() {
    window.addEventListener('mousemove', this.handleDrag);
    window.addEventListener('mouseup', this.endDrag);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.endDrag);
  }

  startDrag = (e) => {
    const { value, onDrag } = this.props;

    this.setState({
      dragging: true,
      startPosition: e.clientX,
      lastValue: value,
    });

    onDrag(true);
  }

  handleDrag = (e) => {
    const { dragging, startPosition, lastValue } = this.state;
    const { onChange } = this.props;

    if (dragging) {
      const { left, right } = this.slider.current.getBoundingClientRect();
      const change = computeValueChange(e.clientX - startPosition, left, right);
      onChange(normalize(lastValue + change));
    }
  }

  endDrag = () => {
    const { onRelease, onDrag } = this.props;
    const { dragging } = this.state;

    if (dragging) {
      this.setState({ dragging: false });
      onRelease();
      onDrag(false);
    }
  }

  render() {
    const { value } = this.props;
    const { dragging } = this.state;

    return (
      <div styleName="slider" ref={this.slider}>
        <div
          styleName={cx('slider__handle', { dragging })}
          style={computeStyle(value)}
          onMouseDown={this.startDrag}
          role="presentation"
        />
      </div>
    );
  }
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onRelease: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
};

export default Slider;
