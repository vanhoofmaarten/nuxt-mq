const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const port = 3000

const nuxtWithMqConfig = require('./fixture/with_mq_nuxt.config')
const url = path => `http://localhost:${port}${path}`
const timeout = 30 * 1000

const setup = async (config) => {
  await exec(`nuxt build test/fixture -c ${config}`)
  await setupDevServer({
    command: `nuxt start test/fixture -c ${config} --port=${port}`,
    launchTimeout: timeout,
    port
  })
}

describe('module', () => {
  afterEach(async () => {
    await teardownDevServer()
  })

  test('default', async () => {
    await setup('nuxt.config.js')
    await page.goto(url('/'))
    const html = await page.content()
    expect(html).toContain('Works!')
  }, timeout)

  test('with mq', async () => {
    await setup('with_mq_nuxt.config.js')
    await page.goto(url('/mq'))
    const html = await page.content()
    expect(html).toContain(nuxtWithMqConfig.mq.defaultBreakpoint)
  }, timeout)
})
