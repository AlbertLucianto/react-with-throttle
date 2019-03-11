interface IThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

interface IThrottledFunction extends Function {
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
}

declare function throttle<T>(fn: T, wait: number, options: IThrottleOptions): T & IThrottledFunction;

export default throttle;
export { IThrottleOptions, IThrottledFunction };
