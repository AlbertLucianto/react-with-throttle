import { IThrottledFunction, IThrottleOptions } from './throttleTypes';

declare function throttle<T>(func: T, wait: number, options: IThrottleOptions): T & IThrottledFunction;

export default throttle;
