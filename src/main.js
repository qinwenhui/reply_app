// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
//引入store
import store from  './store/store'
import { LoadingPlugin, ToastPlugin, AlertPlugin } from 'vux'
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin,{position: 'top'});
Vue.use(AlertPlugin);
//引入axios
import http from '@/http/index'
//引入路径列表配置文件
import apiPath from '@/http/apiPath'
Vue.use(Vuex)
import App from './App'
import router from './router'



Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$apiPath = apiPath
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
