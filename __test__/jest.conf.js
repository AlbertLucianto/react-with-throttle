const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    '^react-with-throttle': '<rootDir>/src',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageDirectory: '<rootDir>/__test__/coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/utils/lodash/*.{js,ts}',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
};
