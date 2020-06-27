module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-undef': 'off',
    'class-methods-use-this': 'off',
    camelcase: 'off',
    'import/prefer-default-export': 'off',
  },
};
