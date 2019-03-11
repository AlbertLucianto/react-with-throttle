export const FULL_DEGREE = 360;

/**
 * To be used as state.
 * Dependant will need to import this to pass
 * `direction` prop in <ElementSpinner/>.
 */
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
}

/**
 * Divide full circle degree evenly for all elements.
 * @param length number of elements in spinner
 */
export const calcGap = (length: number) => FULL_DEGREE / length;

/**
 * Absolute Degree = Relative Degree + Offset
 *
 * Relative degree is distance (degree) from computed element to
 * element index 0.
 *
 * @param length number of elements in spinner
 * @param idx index of the element
 * @param offset distance (degree) of element index 0
 */
export const calcAbsoluteDegree = (length: number, idx: number, offset: number) => {
  const gap = calcGap(length);
  return (idx * gap) + offset;
};

/**
 * The closer the degree to 0 mod 360, the more opaque the element is.
 * Treshold parameter is provided to transparentize from a certain degree.
 *                1
 *               .5   \    /
 * transparency   0  __\__/__
 *                0     \/
 *                0
 *                   0 180 360
 *                    degree
 *
 * @param degree element position (degree).
 * @param threshold minimum value (0 to 180) element to be opaque.
 */
export const calcOpacity = (degree: number, threshold = 0) => {
  const positive = ((degree % FULL_DEGREE) + FULL_DEGREE) % FULL_DEGREE;
  const HALF_DEGREE = FULL_DEGREE / 2;
  const closenessFromActive = Math.abs(positive - HALF_DEGREE);

  return (closenessFromActive - threshold) / (HALF_DEGREE - threshold);
};
