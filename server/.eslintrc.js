module.exports = {
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json'),
      },
    ],
  },
  plugins: ['graphql'],
}
