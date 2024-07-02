/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ],
  rules: {
    "svelte/valid-compile": "off",
    "svelte/indent": "error",
    "indent": ["error", 2, { "SwitchCase": 1 }],
    '@typescript-eslint/no-unused-vars': ["error", { "varsIgnorePattern": "[$]*_" }],
    "@typescript-eslint/semi": ["error", "never"]
  }
}
