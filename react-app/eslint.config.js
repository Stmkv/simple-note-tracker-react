import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      semi: ['error', 'always', { omitLastInOneLineBlock: true }], // Ошибка при отсутствии точки с запятой
      'comma-dangle': ['error', 'always-multiline'], // Ошибка при весящей запятой в однострочном объекте
      quotes: ['error', 'single'], // Ошибка при использовании одинарных кавычек
      'react/prop-types': [0], // Отключил проверку типов пропсов
    },
  },
];
