module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    node: true
  },
  extends: 'standard',
  plugins: ['vue'],
  rules: {
    // Allow paren-less arrow functions
    'arrow-parens': 0,
    // Allow async-await
    'generator-star-spacing': 0,
    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // Do not allow console.logs etc...
    'no-console': 2
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      extends: ['plugin:jest/recommended'],
      globals: {
        page: true,
        browser: true,
        context: true,
        jestPuppeteer: true
      }
    }
  ]
}
