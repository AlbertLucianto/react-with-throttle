import { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from './utils/lodash/throttle';

/**
 * Using non-reactive attribute `value`.
 * This is by far the most straightforward way to
 * handle throttling and avoid unnecessary rerendering.
 */
class WithThrottle extends Component {
  constructor(props) {
    super(props);
    this.instantiating = true;

    this.refreshHandleUpdate(props);
    this.handleUpdate(props.value, false);
  }

  shouldComponentUpdate(nextProps) {
    const {
      value,
      wait,
      options,
      children,
    } = this.props;

    let shouldUpdate = false;

    if (nextProps.wait !== wait || nextProps.options !== options) {
      this.refreshHandleUpdate(nextProps);
    }

    if (nextProps.value !== value) {
      const isPending = this.handleUpdate.pending();
      this.handleUpdate(nextProps.value, isPending);
      shouldUpdate = shouldUpdate || !isPending;
    }

    if (nextProps.children !== children) {
      shouldUpdate = true;
    }

    return shouldUpdate;
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

  /**
   * Passing `pending` parameter to avoid calling `forceUpdate`
   * (or previously when using reactive value with `setState`)
   * during `shouldComponentUpdate`.
   *
   * This `pending` as a context must be known during later
   * invocation of the function.
   */
  updateValue = (value, pending) => {
    this.value = value;

    if (pending) this.forceUpdate();
  }

  render() {
    const { children } = this.props;

    return children(this.value);
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
