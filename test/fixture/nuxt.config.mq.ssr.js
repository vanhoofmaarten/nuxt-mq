const config = require('./nuxt.config.ssr')

module.exports = {
  ...config,
  mq: {
    defaultBreakpoint: 'default',
    breakpoints: {
      sm: 450,
      md: 1250,
      lg: Infinity
    }
  }
}
