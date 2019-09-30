const { resolve } = require('path')

module.exports = async function module (moduleOptions) {
  const options = this.options.mq || moduleOptions

  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    fileName: 'nuxt-mq.js',
    options
  })
}
