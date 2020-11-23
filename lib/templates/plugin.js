import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, <%= serialize(options) %>)
