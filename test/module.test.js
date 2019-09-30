jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
process.env.PORT = process.env.PORT || 5060
process.env.NODE_ENV = 'production'

const nuxtConfig = require('./fixture/nuxt.config')
const nuxtWithMqConfig = require('./fixture/with_mq_nuxt.config')

const { Nuxt, Builder } = require('nuxt')
const request = require('request-promise-native')
const nuxtDefault = new Nuxt(nuxtConfig)
const nuxtWithMq = new Nuxt(nuxtWithMqConfig)

const url = path => `http://localhost:${process.env.PORT}${path}`
const get = path => request(url(path))

describe('VueMq', () => {
  test('default', async () => {
    const nuxt = nuxtDefault
    await nuxt.ready()
    await new Builder(nuxtDefault).build()
    await nuxt.listen(process.env.PORT)
    const html = await get('/')

    expect(html).toContain('Works!')

    await nuxt.close()
  })

  test('with mq', async () => {
    const nuxt = nuxtWithMq
    await nuxt.ready()
    await new Builder(nuxtWithMq).build()
    await nuxt.listen(process.env.PORT)

    // SSR
    const html = await get('/mq')
    expect(html).toContain(nuxtWithMqConfig.mq.defaultBreakpoint)

    await nuxt.close()
  })
})
