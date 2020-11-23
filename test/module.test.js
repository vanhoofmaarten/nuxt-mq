const {
  setup: setupDevServer,
  teardown: teardownDevServer
} = require('jest-dev-server')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const port = 3000
const url = path => `http://localhost:${port}${path}`
const timeout = 30 * 1000

const setup = async config => {
  await exec(`nuxt generate test/fixture -c ${config}`)
  await setupDevServer({
    command: `nuxt start test/fixture -c ${config} --port=${port}`,
    launchTimeout: timeout,
    port
  })
}

const getConfigName = ({ mode, mq } = { mq: true }) => [
  'nuxt',
  'config',
  ...mq ? ['mq'] : [],
  mode.toLowerCase(),
  'js'
].join('.')

describe.each(['SSR', 'Static'])('%s', mode => {
  afterEach(async () => {
    await teardownDevServer()
  })

  test(
    'default',
    async () => {
      await setup(getConfigName({ mode }))
      await page.goto(url('/'))
      const html = await page.content()
      expect(html).toContain('Works!')
    },
    timeout
  )

  test(
    'with mq',
    async () => {
      const configName = getConfigName({ mq: true, mode })
      await setup(configName)
      const nuxtWithMqConfig = require(`./fixture/${configName}`)
      await page.goto(url('/mq'))
      const html = await page.content()
      expect(html).toContain(nuxtWithMqConfig.mq.defaultBreakpoint)
    },
    timeout
  )
})
