import Vue from 'vue'
import Vuex from 'vuex'
import storage from './storage'
import {
  log
} from 'util';
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: null,
    token: ''
  },
  getters: {
    userInfo(state) {
      console.log('通过getters获取userInfo')
      return state.userInfo;
    },
    token(state) {
      console.log('通过getters获取token')
      return state.count;
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      console.log('设置userInfo到store ' + userInfo);
      //将用户新保存到localstorage
      state.userInfo = userInfo;
      storage.setVal('userInfo', state.userInfo)
    },
    setToken(state, token) {
      console.log('设置token到store ' + token);
      state.token = token;
      storage.setVal('token', state.token)
    }
  },
  actions: {
    setUserInfo(context, userInfo){
      context.commit('setUserInfo', userInfo)
    },
    setToken(context, token){
      context.commit('setToken', token)
    }
  }
})
