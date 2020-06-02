import Vue from 'vue'
import Vuex from 'vuex'

import * as navigation from '@/store/modules/navigation/index.js'
import * as vocabulary from '@/store/modules/vocabulary/index.js'
import * as notification from '@/store/modules/notification/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    navigation,
    vocabulary,
    notification,
  },
})
