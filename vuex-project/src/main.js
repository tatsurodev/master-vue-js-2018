import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  // vue instanceのオプションとしてstore
  store,
  render: h => h(App),
}).$mount('#app')
