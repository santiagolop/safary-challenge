/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'prettier',
  ],
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress', 'import'],
  // We're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but we have to
  // set the jest version explicitly.
  settings: {
    jest: {
      version: 28,
    },
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'error',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/newline-after-import': ['warn', { count: 1 }],
  },
}
