// @ts-check
import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    },
    rules: {
      "svelte/indent": "error",
      "svelte/no-at-html-tags": "off"
    }
  },
  {
    rules: {
      "no-trailing-spaces": "error",
      "indent": ["error", 2, { "SwitchCase": 1 }],
      '@typescript-eslint/no-unused-vars': ["warn", {
        "varsIgnorePattern": "[$]*\\d*",
        "argsIgnorePattern": "[$]+\\d*"
      }],
      "@typescript-eslint/semi": ["error", "never"],
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-this-alias": "off",
    }
  },
  {
    ignores: [
      "**/dist/*",
      "**/build/*",
      "**/node_modules/*",
      "**/.svelte-kit/*",
    ],
  },
)