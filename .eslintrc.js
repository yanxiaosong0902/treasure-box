module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", 'react', 'react-hooks'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './src']
      }
    }
  },
  rules: {
    'no-underscore-dangle': 'off',
    'quotes': ['error', 'single'],
    'no-console': 'warn',
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'space-before-blocks': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
