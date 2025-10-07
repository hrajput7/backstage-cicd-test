module.exports = {module.exports = {

  testEnvironment: 'node',  // Only test JavaScript files in our tests directory

  testMatch: ['**/tests/**/*.test.js'],  testMatch: ['<rootDir>/tests/**/*.test.js'],

  collectCoverageFrom: [  

    'src/**/*.js',  // Ignore Backstage TypeScript tests

    '!src/index.js'  testPathIgnorePatterns: [

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