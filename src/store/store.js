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
    token: '',
    login: false,
    messageList: null,
    unreadCount: 0
  },
  getters: {
    userInfo(state) {
      console.log('通过getters获取userInfo')
      if(state.userInfo == null){
        state.userInfo = storage.getVal('userInfo')
      }
      return state.userInfo;
    },
    token(state) {
      console.log('通过getters获取token')
      if(state.token == ''){
        state.token = storage.getVal('token')
      }
      return state.token;
    },
    login(state){
      console.log('通过getters获取login')
      state.login = storage.getVal('login')
      return state.login;
    },
    messageList(state) {
      //console.log('通过getters获取messageList')
      return state.messageList;
    },
    unreadCount(state) {
      //console.log('通过getters获取unreadCount')
      return state.unreadCount;
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
    },
    setLogin(state, login) {
      console.log('设置login到store ' + login);
      state.login = login;
      storage.setVal('login', state.login)
    },
    setMessageList(state, messageList) {
      //console.log('设置messageList到store ' + messageList);
      state.messageList = messageList;
    },
    setUnreadCount(state, unreadCount) {
      //console.log('设置unreadCount到store ' + unreadCount);
      state.unreadCount = unreadCount;
    }
  },
  actions: {
    setUserInfo(context, userInfo){
      context.commit('setUserInfo', userInfo)
    },
    setToken(context, token){
      context.commit('setToken', token)
    },
    setLogin(context, login){
      context.commit('setLogin', login)
    },
    setMessageList(context, messageList){
      context.commit('setMessageList', messageList)
      //设置未读消息个数到unreadCount
      let count = 0
      messageList.forEach((item, i) => {
        if(item.status == 0){
          count ++
        }
      });
      context.commit('setUnreadCount', count)
    }
  }
})
