import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

class Throttle extends PureComponent {
  constructor(props) {
    super(props);

    this.refreshHandleUpdate(props);
    this.state = {
      value: props.value,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      value,
      wait,
      options,
    } = this.props;

    if (prevProps.value !== value) this.handleUpdate(value);

    if (prevProps.wait !== wait || prevProps.options !== options) {
      this.refreshHandleUpdate(this.props);
    }
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
