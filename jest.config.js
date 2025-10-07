module.exports = {module.exports = {module.exports = {

  testEnvironment: 'node',

  testMatch: ['**/tests/**/*.test.js'],  testEnvironment: 'node',  // Only test JavaScript files in our tests directory

  collectCoverageFrom: [

    'src/**/*.js',  testMatch: ['**/tests/**/*.test.js'],  testMatch: ['<rootDir>/tests/**/*.test.js'],

    '!src/index.js'

  ],  collectCoverageFrom: [  

  coverageDirectory: 'coverage',

  coverageReporters: ['text', 'lcov', 'html'],    'src/**/*.js',  // Ignore Backstage TypeScript tests

  verbose: true

};    '!src/index.js'  testPathIgnorePatterns: [

  ],    '<rootDir>/node_modules/',

  coverageDirectory: 'coverage',    '<rootDir>/packages/',

  coverageReporters: ['text', 'lcov', 'html'],    '<rootDir>/plugins/'

  verbose: true  ],

};  
  // Test environment
  testEnvironment: 'node',
  
  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/**',
    '!**/node_modules/**'
  ],
  
  // Timeout settings
  testTimeout: 10000
};