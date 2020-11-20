const config = require('./nuxt.config.mq.ssr')

module.exports = {
  ...config,
  target: 'static'
}
