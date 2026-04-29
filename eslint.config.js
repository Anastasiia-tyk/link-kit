// eslint.config.js
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Базові правила від ESLint
  js.configs.recommended,

  // Вимикаємо правила що конфліктують з Prettier
  prettierConfig,

  {
    // Перевіряємо тільки JS файли у папці js/
    files: ['src/js/**/*.js', 'src/main.js'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',

      // Глобальні змінні браузера (щоб ESLint їх знав)
      globals: {
        window:      'readonly',
        document:    'readonly',
        console:     'readonly',
        setTimeout:  'readonly',
        Math:        'readonly',
        navigator:   'readonly',
      },
    },

    rules: {
      // Помилки (зупиняють білд)
      'no-unused-vars':  ['error', { argsIgnorePattern: '^_' }],
      'no-var':          'error',
      'prefer-const':    'error',
      'eqeqeq':          ['error', 'always'],
      'no-debugger':     'error',

      // Попередження (не зупиняють, але показують)
      'no-console':      'warn',
      'prefer-template': 'warn',
    },
  },

  {
    // Для тестів — послабляємо правила
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        describe:    'readonly',
        it:          'readonly',
        test:        'readonly',
        expect:      'readonly',
        beforeEach:  'readonly',
        vi:          'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  {
    // Ігноруємо папки що не потрібно перевіряти
    ignores: ['dist/', 'node_modules/', 'coverage/', 'playwright-report/'],
  },
];