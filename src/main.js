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
//引入vant组件
import { Collapse, CollapseItem, Sticky, Empty, Step, Steps, Icon } from 'vant';
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Sticky);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Empty);
Vue.use(Icon);
//引入音频处理插件
import Recorder from 'js-audio-recorder'
Vue.prototype.$Recorder = Recorder
//引入音频播放组件
import audio from 'vue-mobile-audio'
Vue.use(audio)
//引入时间格式化组件
import moment from 'moment'
Vue.prototype.$moment = moment
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
