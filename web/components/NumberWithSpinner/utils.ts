import isNumber from 'is-number';

export const generateNumbers = (length: number) => [...new Array(length).keys()];

export const splitDigits = (num: number) => `${num}`
  .split('')
  .map((n) => (isNumber(n) ? +n : n));
