const config = require('./nuxt.config.ssr')

module.exports = {
  ...config,
  target: 'static',
  generate: {
    crawler: false
  }
}
