module.exports = {
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    [
      '@@',
      {
        mq: 'UA-XXX'
      }
    ]
  ]
}
