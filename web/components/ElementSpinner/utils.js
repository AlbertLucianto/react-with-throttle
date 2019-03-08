export const FULL_DEGREE = 360;

/**
 * To be used as state.
 * Dependant will need to import this to pass
 * `direction` prop in <ElementSpinner/>.
 */
export const Direction = {
  UP: Symbol('up'),
  DOWN: Symbol('down'),
};

/**
 * Divide full circle degree evenly for all elements.
 * @param {number} length number of elements in spinner
 */
export const calcGap = length => FULL_DEGREE / length;

/**
 * Absolute Degree = Relative Degree + Offset
 *
 * Relative degree is distance (degree) from computed element to
 * element index 0.
 *
 * @param {number} length number of elements in spinner
 * @param {number} idx index of the element
 * @param {number} offset distance (degree) of element index 0
 */
export const calcAbsoluteDegree = (length, idx, offset) => {
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
 * @param {number} degree element position (degree).
 * @param {number} threshold minimum value (0 to 180) element to be opaque.
 */
export const calcOpacity = (degree, threshold = 0) => {
  const positive = ((degree % FULL_DEGREE) + FULL_DEGREE) % FULL_DEGREE;
  const HALF_DEGREE = FULL_DEGREE / 2;
  const closenessFromActive = Math.abs(positive - HALF_DEGREE);

  return (closenessFromActive - threshold) / (HALF_DEGREE - threshold);
};

/**
 * Custom prop type checking.
 * @param {*} props
 * @param {string} componentName
 */
export function directionPropTypeCheck(props, _, componentName) {
  const { direction } = props;

  if ([Direction.UP, Direction.DOWN].includes(direction)) return;

  throw new Error(`
  Invalid prop \`direction\` supplied to \`${componentName}\`.
  Expected prop to be symbol 'Direction.UP' or 'Direction.DOWN' from this component.
  But received \`${direction}\`.
  `);
}

directionPropTypeCheck.isRequired = function isRequired(props, _, componentName) {
  const { direction } = props;

  if (direction !== undefined) {
    directionPropTypeCheck(props, _, componentName);
  }

  throw new Error(`
  Required prop \`direction\` received \`undefined\` in \`${componentName}\`.
  `);
};
