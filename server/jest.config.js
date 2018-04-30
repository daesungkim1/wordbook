module.exports = {
  // testRegex: '(<rootDir>/src/**/.*|)\\.spec\\.jsx?$',
  transform: {
    '^.+\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.js$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
}
