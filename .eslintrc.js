module.exports = {
  ignorePatterns: ['!**/.prettierrc.js'],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: ['eslint:recommended', 'next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    'import/no-anonymous-default': 'off',
    'import/no-anonymous-default-export': 'off',
    'no-async-promise-executor': 'off',
    'prefer-const': 'off',
    'no-console': ['warn', { allow: ['debug', 'info', 'warn', 'error'] }],
    'no-empty-pattern': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',

    'react/display-name': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

    //#region  //*=========== Unused Import ===========
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unused-imports/no-unused-imports': 'off',
    'unused-imports/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-empty': 'off',
    'simple-import-sort/imports': 'off',
    //#endregion  //*======== Unused Import ===========

    //#region  //*=========== Import Sort ===========
    'simple-import-sort/exports': 'warn'
    // 'simple-import-sort/imports': [
    //   'warn',
    //   {
    //     groups: [
    //       // ext library & side effect imports
    //       ['^@?\\w', '^\\u0000'],
    //       // {s}css files
    //       ['^.+\\.s?css$'],
    //       // Lib and hooks
    //       ['^@/lib', '^@/hooks'],
    //       // static data
    //       ['^@/data'],
    //       // components
    //       ['^@/components', '^@/container'],
    //       // zustand store
    //       ['^@/store'],
    //       // Other imports
    //       ['^@/'],
    //       // relative paths up until 3 level
    //       [
    //         '^\\./?$',
    //         '^\\.(?!/?$)',
    //         '^\\.\\./?$',
    //         '^\\.\\.(?!/?$)',
    //         '^\\.\\./\\.\\./?$',
    //         '^\\.\\./\\.\\.(?!/?$)',
    //         '^\\.\\./\\.\\./\\.\\./?$',
    //         '^\\.\\./\\.\\./\\.\\.(?!/?$)',
    //       ],
    //       ['^@/types'],
    //       // other that didnt fit in
    //       ['^'],
    //     ],
    //   },
    // ],
    //#endregion  //*======== Import Sort ===========
  },
  globals: {
    React: true,
    JSX: true
  }
}
