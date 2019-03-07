import { minify } from 'uglify-es';
import { uglify } from 'rollup-plugin-uglify';
import base from './rollup.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/react-with-throttle.min.js',
    format: 'iife',
    exports: 'named',
    name: 'ReactWithThrottle',
    globals: {
      react: 'React',
    },
  },
});

config.plugins.push(uglify({}, minify));

export default config;
