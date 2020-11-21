const config = require('./nuxt.config.ssr')

module.exports = {
  ...config,
  modules: [
    { handler: require('../..') }
  ]
}
