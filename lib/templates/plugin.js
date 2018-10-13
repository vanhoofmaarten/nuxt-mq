import Vue from 'vue'
import VueMq from 'vue-mq'

export default async function () {
  let plugin = VueMq;
  if (process.server) {
    plugin = {
      install(Vue, options) {
        Vue.prototype.$mq = options.defaultBreakpoint
      }
    }
  }

  const moduleOptions = <%= serialize(options) %>
  Vue.use(plugin, moduleOptions)
}
