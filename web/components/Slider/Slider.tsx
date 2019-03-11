import cx from 'classnames';
import React, { createRef, PureComponent } from 'react';
import './style.scss';

const MAX = 1000;
const MIN = 100;

const normalize = (value: number) => Math.round(Math.min(Math.max(value, MIN), MAX));

const computeStyle = (value: number) => ({
  left: `${((value - MIN) / (MAX - MIN)) * 100}%`,
});

const computeValueChange = (
  positionChange: number,
  left: number,
  right: number,
) => {
  const ratio = positionChange / (right - left);
  return (ratio * (MAX - MIN));
};

interface ISliderProps {
  value: number;
  onChange: (value: number) => void;
  onDrag: (isDragging: boolean) => void;
}

interface ISliderState {
  dragging: boolean;
  lastValue: number;
  startPosition: number;
}

class Slider extends PureComponent<ISliderProps, ISliderState> {
  public state: ISliderState = {
    dragging: false,
    lastValue: null,
    startPosition: null,
  };

  private slider = createRef<HTMLDivElement>();

  public componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseDrag);
    window.addEventListener('mouseup', this.endDrag);
    window.addEventListener('touchmove', this.handleTouchDrag);
    window.addEventListener('touchend', this.endDrag);
  }

  public componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseDrag);
    window.removeEventListener('mouseup', this.endDrag);
    window.removeEventListener('touchmove', this.handleMouseDrag);
    window.removeEventListener('touchend', this.endDrag);
  }

  public render() {
    const { value } = this.props;
    const { dragging } = this.state;

    return (
      <div className="slider" ref={this.slider}>
        <div
          className={cx('slider__handle', { dragging })}
          style={computeStyle(value)}
          onMouseDown={this.startMouseDrag}
          onTouchStart={this.startTouchDrag}
          role="presentation"
        />
      </div>
    );
  }

  private startMouseDrag = (e: React.MouseEvent) => {
    const { clientX } = e;
    this.startDrag(clientX);
  }

  private startTouchDrag = (e: React.TouchEvent) => {
    const { clientX } = (e.touches && e.touches[0]);
    this.startDrag(clientX);
  }

  private startDrag = (startPosition: number) => {
    const { value, onDrag } = this.props;

    this.setState({
      dragging: true,
      lastValue: value,
      startPosition,
    });

    onDrag(true);
  }

  private handleMouseDrag = (e: MouseEvent) => {
    const { dragging } = this.state;
    const { clientX } = e;

    if (dragging) {
      this.handleDrag(clientX);
    }
  }

  private handleTouchDrag = (e: TouchEvent) => {
    const { dragging } = this.state;
    const { clientX } = e.touches[0];

    if (dragging) {
      this.handleDrag(clientX);
    }
  }

  private handleDrag = (position: number) => {
    const { startPosition, lastValue } = this.state;
    const { onChange } = this.props;

    const { left, right } = (this.slider.current as HTMLDivElement).getBoundingClientRect();
    const change = computeValueChange(position - startPosition, left, right);
    onChange(normalize(lastValue + change));
  }

  private endDrag = () => {
    const { onDrag } = this.props;
    const { dragging } = this.state;

    if (dragging) {
      this.setState({ dragging: false });
      onDrag(false);
    }
  }
}

export default Slider;
