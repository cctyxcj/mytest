import Vue from '../node_modules/vue/dist/vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import login from './login.vue'
import register from './register.vue'
import App from './app.vue'
// import App from './app.vue'


// var login = {
//     template:'<h1>这是一个login组件</h1>'
// }

var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:login},
        {path:'/register',component:register}
    ]
})

var vm = new Vue({
    el:'#app',
    data:{
        msg:'ssss'
    },
    // components:{
    //     login
    // },
    render(c) {
        return c(App);
    },
     router

})
