module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'server.js',
    'db.js',
    'DataAccess/**/*.js',
    'Routes/**/*.js',
    'Services/**/*.js',
    'Models/**/*.js',
    '!node_modules/**',
    '!coverage/**',
    '!Tests/**'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  testMatch: ['**/Tests/**/*.test.js'],
  verbose: true
};
