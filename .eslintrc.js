// @ts-check
module.exports = {
  root: true,
  ignorePatterns: ['node_modules', 'dist', '.next', '.expo', '.turbo', '*.d.ts'],
  plugins: ['@typescript-eslint', 'import', 'unused-imports', 'prettier'],
  
  // Global settings
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [
          'apps/*/tsconfig.json',
          'packages/*/tsconfig.json',
        ],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },

  // Shared rules across all projects
  rules: {
    // TypeScript
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    }],
    'no-unused-vars': 'off', // Disable in favor of @typescript-eslint/no-unused-vars
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    'object-shorthand': 'error',
    
    // Imports
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'warn',
    'import/no-self-import': 'error',
    'import/no-extraneous-dependencies': 'error',
    'unused-imports/no-unused-imports': 'warn',
    
    // React
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },

  overrides: [
    // Backend (NestJS)
    {
      files: ['apps/backend/**/*.ts'],
      env: {
        node: true,
        es2022: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './apps/backend/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
      },
    },

    // Web (Next.js)
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      env: {
        browser: true,
        es2022: true,
      },
      extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './apps/web/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      settings: {
        react: {
          version: 'detect',
        },
        next: {
          rootDir: 'apps/web',
        },
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'react/display-name': 'off',
      },
    },

    // Mobile (React Native)
    {
      files: ['apps/mobile/**/*.{ts,tsx}'],
      env: {
        browser: true,
        es2022: true,
      },
      extends: [
        '@react-native-community',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './apps/mobile/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'react-native/no-inline-styles': 'off',
        'react-native/no-unused-styles': 'error',
        'react-native/split-platform-components': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
      },
    },

    // Shared packages
    {
      files: ['packages/**/*.{ts,tsx}'],
      env: {
        node: true,
        es2022: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.base.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
};
