import $ from 'jquery'
import './css/index.css'
import Vue from './node_modules/vue/dist/vue.js'

$(function(){
    $('li:odd').css('backgroundColor','yellow')
    $('li:even').css('backgroundColor',function(){
        return'#'+'D97634'
    })

})
var vm = new Vue({
    el:'#app',
    data:{
        msg:'sss'
    }
})