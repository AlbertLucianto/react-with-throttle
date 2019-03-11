import { Component } from 'react';
import throttle from './utils/lodash/throttle';
import {
  IThrottledFunction,
  IThrottleOptions,
} from './utils/lodash/throttleTypes';

interface IWithThrottleProps<T> {
  value: T;
  wait: number;
  options: IThrottleOptions;
  children: (value: T) => JSX.Element|string;
}

interface IUpdateThrottleOptions {
  wait: number;
  options: IThrottleOptions;
}

type UpdateValueCallback<T> = (value: T, pending: boolean) => void;

/**
 * Using non-reactive attribute `value`.
 * This is by far the most straightforward way to
 * handle throttling and avoid unnecessary rerendering.
 */
class WithThrottle<T> extends Component<IWithThrottleProps<T>> {
  private handleUpdate: UpdateValueCallback<T> & IThrottledFunction;
  private value: T;

  constructor(props: IWithThrottleProps<T>) {
    super(props);

    this.refreshHandleUpdate(props);
    this.handleUpdate(props.value, false);
  }

  public shouldComponentUpdate(nextProps: IWithThrottleProps<T>) {
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

  public componentWillUnmount() {
    this.handleUpdate.cancel();
  }

  public render() {
    const { children } = this.props;

    return children(this.value);
  }

  private refreshHandleUpdate = ({ wait, options }: IUpdateThrottleOptions) => {
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
  private updateValue = (value: T, pending: boolean) => {
    this.value = value;

    if (pending) {
      this.forceUpdate();
    }
  }
}

export default WithThrottle;
