import base from './rollup.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/react-with-throttle.esm.js',
    format: 'es',
  },
});

export default config;
