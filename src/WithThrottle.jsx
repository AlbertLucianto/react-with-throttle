import { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

class Throttle extends Component {
  constructor(props) {
    super(props);

    this.refreshHandleUpdate(props);
    this.state = {
      value: props.value,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      value,
      wait,
      options,
      children,
    } = this.props;

    if (nextProps.value !== value) this.handleUpdate(nextProps.value);

    if (nextProps.wait !== wait || nextProps.options !== options) {
      this.refreshHandleUpdate(nextProps);
    }

    const { value: currentValue } = this.state;
    if (nextState.value !== currentValue) return true;

    if (nextProps.children !== children) return true;

    return false;
  }

  refreshHandleUpdate = ({ wait, options }) => {
    this.handleUpdate = throttle(
      this.updateValue,
      wait,
      options,
    );
  }

  updateValue = value => this.setState({ value });

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return children(value);
  }
}

Throttle.propTypes = {
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

Throttle.defaultProps = {
  options: undefined,
};

export default Throttle;
