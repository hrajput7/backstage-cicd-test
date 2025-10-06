module.exports = {
  // Only test JavaScript files in our tests directory
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  
  // Ignore Backstage TypeScript tests
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/packages/',
    '<rootDir>/plugins/'
  ],
  
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