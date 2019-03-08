import isNumber from 'is-number';

export const generateNumbers = length => [...new Array(length).keys()];

export const splitDigits = number => `${number}`
  .split('')
  .map(num => (isNumber(num) ? +num : num));
