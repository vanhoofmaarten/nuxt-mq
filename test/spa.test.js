const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const nuxtWithMqConfig = require('./fixture/with_mq_nuxt.config.static')
const port = 3000

// const nuxtConfig = require('./fixture/nuxt.config')

const url = path => `http://localhost:${port}${path}`
const timeout = 30 * 1000

// nuxtConfig.mode = 'spa'
// nuxtConfig.dev = false
// nuxtWithMqConfig.mode = 'spa'
// nuxtWithMqConfig.dev = false

// const pkgDir = require('pkg-dir')
// const http = require('http')
// const ecstatic = require('ecstatic')
// const { exec } = require('promisify-child-process')
// const { JSDOM } = require('jsdom')

const setup = async (config) => {
  await exec(`nuxt generate test/fixture -c ${config}`)
  await setupDevServer({
    command: `nuxt start test/fixture -c ${config} --port=${port}`,
    launchTimeout: timeout,
    port
  })
}

describe('static', () => {
  afterEach(async () => {
    await teardownDevServer()
  })

  test('default', async () => {
    await setup('nuxt.config.static.js')
    await page.goto(url('/'))
    const html = await page.content()
    expect(html).toContain('Works!')
  }, timeout)

  test('with mq', async () => {
    await setup('with_mq_nuxt.config.static.js')
    await page.goto(url('/mq'))
    const html = await page.content()
    expect(html).toContain(nuxtWithMqConfig.mq.defaultBreakpoint)
  }, timeout)
})
