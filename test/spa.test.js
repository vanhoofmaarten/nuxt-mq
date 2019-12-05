jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
process.env.PORT = process.env.PORT || 5060
process.env.NODE_ENV = 'production'

const nuxtConfig = require('./fixture/nuxt.config')
const nuxtWithMqConfig = require('./fixture/with_mq_nuxt.config')
nuxtConfig.mode = 'spa'
nuxtConfig.dev = false
nuxtWithMqConfig.mode = 'spa'
nuxtWithMqConfig.dev = false

const pkgDir = require('pkg-dir')
const http = require('http')
const ecstatic = require('ecstatic')
const { exec } = require('promisify-child-process')
const { JSDOM } = require('jsdom')

const url = path => `http://localhost:${process.env.PORT}${path}`

describe('VueMq', () => {
  let server

  afterEach(async () => {
    server.close()
  })

  test('default', async () => {
    await exec('npm run generate -c ./fixture/nuxt.config')
    const rootDir = await pkgDir(__dirname)
    server = http.createServer(ecstatic({ root: `${rootDir}/dist` }))
    server.listen(process.env.PORT)

    const { window } = await JSDOM.fromURL(url('/'))
    const html = window.document.body.innerHTML

    expect(html).toContain('Works!')
  })

  test('with mq', async () => {
    await exec('npm run generate -c ./fixture/nuxt.config')
    const rootDir = await pkgDir(__dirname)
    server = http.createServer(ecstatic({ root: `${rootDir}/dist` }))
    server.listen(process.env.PORT)

    const { window } = await JSDOM.fromURL(url('/mq'))
    const html = window.document.body.innerHTML
    expect(html).toContain(nuxtWithMqConfig.mq.defaultBreakpoint)
  })
})
