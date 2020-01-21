import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'
import apolloProvider from './apollo'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  created () {
    this.$store.dispatch('initUserFromLocalStorage')
    this.$store.dispatch('initMeasurementsFromLocalStorage')
  },
  render: h => h(App)
}).$mount('#app')
