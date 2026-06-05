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
    '!Tests/**',
  ],
  coverageThreshold: {
    global: {
      branches: 15,
      functions: 15,
      lines: 15,
      statements: 15,
    },
  },
  testMatch: ['**/Tests/**/*.test.js'],
  verbose: true,
};
