module.exports = {
  testRegex: '(<rootDir>/src/.*|)\\.spec\\.jsx?$',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.graphql$': 'jest-transform-graphql',
  },
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  moduleFileExtensions: ['js', 'json'],
}
