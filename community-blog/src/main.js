import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// auth dataをlocalStorageから復元
const authData = localStorage.getItem('auth');

new Vue({
  router,
  data: {
    // authDataがあればparse, なければempty object
    auth: authData ? JSON.parse(authData) : {}
  },
  render: h => h(App),
}).$mount('#app')
