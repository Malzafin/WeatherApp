const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginReactNative = require('eslint-plugin-react-native');
const js = require('@eslint/js');
const ts = require('@typescript-eslint/eslint-plugin');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        fetch: 'readonly',
      },
    },

    plugins: {
      '@typescript-eslint': ts,
      react: eslintPluginReact,
      'react-native': eslintPluginReactNative,
    },
    rules: {
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
