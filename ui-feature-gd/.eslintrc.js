const fs = require('fs');
const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: ["plugin:sonarjs/recommended"],
  plugins: ["sonarjs"],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  
  rules: {
    'sonarjs/no-small-switch': 'off',
    'sonarjs/no-duplicate-string':'warn',
    'sonarjs/cognitive-complexity':['error',70]
    // etc.
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
    },
  },
};
