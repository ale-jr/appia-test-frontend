import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations/index'
import actions from './actions/index'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
