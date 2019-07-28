import Vue from '../node_modules/vue/dist/vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import login from './login.vue'
import register from './register.vue'
import App from './app.vue'


var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:login},
        {path:'/register',component:register}
    ]
})

new Vue({
    el:'#app',
    data:{
        msg:'sss'
    },
    render:(c)=>c(App),
    router
})