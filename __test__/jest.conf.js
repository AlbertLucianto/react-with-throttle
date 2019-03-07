const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  moduleFileExtensions: ['js', 'json', 'jsx'],
  moduleNameMapper: {
    '^react-with-throttle': '<rootDir>/src',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  coverageDirectory: '<rootDir>/__test__/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/utils/lodash/*.js',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
};
