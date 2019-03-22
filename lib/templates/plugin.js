import Vue from 'vue'
import VueMq from 'vue-mq'

export default async function () {
  const moduleOptions = <%= serialize(options) %>
  Vue.use(VueMq, moduleOptions)
}
