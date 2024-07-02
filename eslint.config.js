// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-trailing-spaces": "error",
      "indent": ["error", 2, { "SwitchCase": 1 }],
      '@typescript-eslint/no-unused-vars': ["warn", { "varsIgnorePattern": "[$]*_" }],
      "@typescript-eslint/semi": ["error", "never"],
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-this-alias": "off"
    }
  }
)