import base from './rollup.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/react-with-throttle.umd.js',
    format: 'umd',
    name: 'react-with-throttle',
    globals: {
      react: 'React',
    },
  },
});

export default config;
