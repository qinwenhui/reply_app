// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
//引入store
import store from  './store/store'
//引入mint框架组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//引入axios
import http from './http/index'
Vue.use(MintUI)
Vue.use(Vuex)

import App from './App'
import router from './router'



Vue.config.productionTip = false
Vue.prototype.$http = http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
