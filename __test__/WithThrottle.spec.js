import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import WithThrottle from 'react-with-throttle';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

const waitFor = async ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

class TickingCounter extends Component {
  state = {
    count: 0,
  };

  interval = null;

  componentDidMount() {
    const { interval } = this.props;

    this.interval = setInterval(() => {
      this.setState(({ count }) => ({ count: count + 1 }));
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      wait,
      options,
      render: renderContent,
    } = this.props;

    const { count } = this.state;

    return (
      <WithThrottle
        value={count}
        wait={wait}
        options={options}
      >
        {renderContent}
      </WithThrottle>
    );
  }
}

TickingCounter.propTypes = {
  wait: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
  options: PropTypes.shape({
    leading: PropTypes.bool,
    trailing: PropTypes.bool,
  }),
  render: PropTypes.func,
};

TickingCounter.defaultProps = {
  options: undefined,
  render: val => val,
};

describe('WithThrottle', () => {
  test('should render correctly with throttle', async (done) => {
    const container = render(<TickingCounter
      interval={100}
      wait={250}
    />);

    const div = container.baseElement.querySelector('div');
    expect(div.innerHTML).toBe('0');

    await waitFor(110);
    expect(div.innerHTML).toBe('0');

    await waitFor(100);
    expect(div.innerHTML).toBe('0');

    await waitFor(100);
    expect(div.innerHTML).toBe('2');

    done();
  });

  test('should update throttle options', async (done) => {
    const container = render(<TickingCounter
      interval={100}
      wait={250}
    />);

    const div = container.baseElement.querySelector('div');
    expect(div.innerHTML).toBe('0');

    container.rerender(<TickingCounter
      interval={100}
      wait={350}
      options={{ trailing: true }}
    />);

    await waitFor(310);
    // At this time, throttle has been renewed and invoked
    // And update can be called again after 100 - 310 + 350 = 140
    expect(div.innerHTML).toBe('1');

    await waitFor(150);
    expect(div.innerHTML).toBe('4');

    done();
  });

  test('should rerender if children render prop changes', async (done) => {
    const container = render(<TickingCounter
      interval={100}
      wait={250}
    />);

    const div = container.baseElement.querySelector('div');
    expect(div.innerHTML).toBe('0');

    await waitFor(100);

    container.rerender(<TickingCounter
      interval={100}
      wait={250}
      render={val => `foo-${val}`}
    />);

    expect(div.innerHTML).toBe('foo-0');

    done();
  });

  test('should render normally if interval is longer than throttle', async (done) => {
    const container = render(<TickingCounter
      interval={250}
      wait={100}
    />);

    const div = container.baseElement.querySelector('div');
    expect(div.innerHTML).toBe('0');

    await waitFor(260);
    expect(div.innerHTML).toBe('1');

    await waitFor(250);
    expect(div.innerHTML).toBe('2');

    done();
  });
});
