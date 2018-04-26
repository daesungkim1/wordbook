const prettierConfig = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
}

module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json'),
      },
    ],
  },
  plugins: ['jest', 'graphql', 'flowtpye', 'prettier'],
}
