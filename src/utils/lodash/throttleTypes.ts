interface IThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

interface IThrottledFunction extends Function {
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
}

export { IThrottleOptions, IThrottledFunction };
