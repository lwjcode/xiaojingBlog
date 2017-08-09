// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import './assets/font/css/font-awesome.min.css' 


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuex)

const  vuex_store = new Vuex.Store({
    state:{
        totalmess: 0,
        title: '登录'
    },
    mutations:{
        
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store: vuex_store
})
