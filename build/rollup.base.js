import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import ts from 'typescript';

const config = require('../package.json');

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      typescript: ts,
      cacheRoot: './tmp',
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js', '.jsx', '.json', 'ts', 'tsx'],
    }),
    cjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
      },
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    replace({
      VERSION: JSON.stringify(config.version),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  external: ['react'],
  watch: {
    include: 'src/**',
  },
};
