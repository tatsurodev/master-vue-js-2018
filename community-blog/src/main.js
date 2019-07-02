import Vue from 'vue'
import App from './App.vue'
import router from './router'

import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg)
import "vue-wysiwyg/dist/vueWysiwyg.css";

import VueDisqus from 'vue-disqus'
Vue.use(VueDisqus)

import VueNoty from 'vuejs-noty'
Vue.use(VueNoty)
import 'vuejs-noty/dist/vuejs-noty.css'

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
