const {
  setup: setupDevServer,
  teardown: teardownDevServer
} = require('jest-dev-server')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const fetch = require('node-fetch')
const port = 3000
const url = path => `http://localhost:${port}${path}`
const timeout = 30 * 1000

const setup = async ({ config, staticMode }) => {
  await exec(`nuxt generate test/fixture -c ${config}`)
  const command = staticMode
    ? `http-server test/fixture/dist --port=${port}`
    : `nuxt start test/fixture -c ${config} --port=${port}`
  await setupDevServer({
    command,
    launchTimeout: timeout,
    port
  })
}

const getConfigName = ({ mode, mq } = { mq: true }) =>
  ['nuxt', 'config', ...(mq ? ['mq'] : []), mode.toLowerCase(), 'js'].join('.')

describe.each(['SSR', 'Static'])('%s', mode => {
  afterEach(async () => {
    await teardownDevServer()
  })

  test(
    'default',
    async () => {
      const config = getConfigName({ mq: true, mode })
      await setup({ config, staticMode: false })
      await page.goto(url('/'))
      const html = await page.content()
      expect(html).toContain('Works!')
    },
    timeout
  )

  test(
    'with mq',
    async () => {
      const config = getConfigName({ mq: true, mode })
      await setup({ config, staticMode: true })
      const nuxtWithMqConfig = require(`./fixture/${config}`)
      const html = await fetch(url('/mq')).then(res => res.text())
      expect(html).toContain(nuxtWithMqConfig.mq.defaultBreakpoint)
    },
    timeout
  )
})
