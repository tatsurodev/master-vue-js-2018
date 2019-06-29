import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

// pluginをvueに登録
Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/login',
            component: Login
        },
        {
            path: '/signup',
            component: Signup
        },
        {
            path: '/home',
            component: Home
        }
    ]
})

export default router;
