import { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

class WithThrottle extends Component {
  constructor(props) {
    super(props);

    this.refreshHandleUpdate(props);
    this.handleUpdate(props.value);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      value,
      wait,
      options,
      children,
    } = this.props;

    if (nextProps.value !== value) {
      // `setTimeout` to avoid setState in shouldComponentUpdate
      setTimeout(() => this.handleUpdate(nextProps.value));
    }

    if (nextProps.wait !== wait || nextProps.options !== options) {
      this.refreshHandleUpdate(nextProps);
    }

    const { value: currentValue } = this.state;
    if (nextState.value !== currentValue) return true;

    if (nextProps.children !== children) return true;

    return false;
  }

  componentWillUnmount() {
    this.handleUpdate.cancel();
  }

  refreshHandleUpdate = ({ wait, options }) => {
    if (this.handleUpdate) {
      this.handleUpdate.cancel();
    }

    this.handleUpdate = throttle(
      this.updateValue,
      wait,
      options,
    );
  }

  updateValue = (value) => {
    if (!this.state) { // Only to be called by constructor
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state = { value };
    } else {
      this.setState({ value });
    }
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return children(value);
  }
}

WithThrottle.propTypes = {
  // From parent
  /**
   * Value which is throttled and forwarded to children.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
  wait: PropTypes.number.isRequired,
  options: PropTypes.shape({
    leading: PropTypes.bool,
    trailing: PropTypes.bool,
  }),
  children: PropTypes.func.isRequired,
};

WithThrottle.defaultProps = {
  options: undefined,
};

export default WithThrottle;
