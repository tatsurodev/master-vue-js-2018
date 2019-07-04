import Vue from 'vue'
import Vuex from 'vuex'

// vuex登録
Vue.use(Vuex)

import todos from './todos'

const store = new Vuex.Store({
    modules: {
        todos
    }
})

export default store
