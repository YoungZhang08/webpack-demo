module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  env: { browser: true, commonjs: true, es6: true, node: true, worker: true },
  // 这里填入你的项目需要的全局变量
  globals: {
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
  },
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  // 这里填入你的项目需要的个性化配置，比如：
  rules: {
    'prettier/prettier': 2,
    'react/self-closing-comp': 2, // 闭合标签
    '@typescript-eslint/no-explicit-any': 1, // any 定义类型
    'react/jsx-max-props-per-line': 0, // 限制单行上的 props 最大值
    'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'], // 第一个 prop 必须得换行
    'react/jsx-indent-props': [2, 2], // props 缩进必须为二个空格
    'react/jsx-indent': [2, 2], // 验证 jsx 缩进
    'react/jsx-key': 2, // 数组中的 jsx 必须有 key
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
      },
    ], // jsx 中禁止使用 bind
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ], // 多行的 jsx 必须有括号包起来
    '@typescript-eslint/interface-name-prefix': [1, 'always'], // 要求接口名称以 I 为前缀
    '@typescript-eslint/no-use-before-define': [
      2,
      { functions: false, classes: true, variables: true },
    ], // 禁止定义前使用
    '@typescript-eslint/no-unused-vars': [
      1,
      { vars: 'local', args: 'after-used', argsIgnorePattern: '^_' },
    ], // 禁止未使用过的变量
  },
}
