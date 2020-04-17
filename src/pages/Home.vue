<template>
  <div>
    <component v-bind:is="selected"></component>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="Message">
        <img slot="icon" src="../assets/image/message.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="Reply">
        <img slot="icon" src="../assets/image/home.png">
        答辩
      </mt-tab-item>
      <mt-tab-item id="Me">
        <img slot="icon" src="../assets/image/me.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
//导入切换页面组件
import Message from '@/pages/Message'
import Reply from '@/pages/Reply'
import Me from '@/pages/Me'
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'Home',
  data: function(){
    return {
      selected: 'Reply',
      user: null,
      //轮询消息定时器
      messageInterval: null
    }
  },
  methods: {
    ...mapActions(['setUserInfo','setToken', 'setMessageList']),
    //获取用户信息
    getUserInfo: function(){
      this.$http.get(this.$apiPath.GET_USER_URL, {}, response => {
        if(response.status == 200){
          //检查token是否验证成功
          if(response.data.code == 0){
            //验证成功
            this.user = response.data.data
          }else{
            //验证失败,登录信息失效
            this.$vux.toast.show({ text: '登录信息失效，请重新登录' })
            //清除store中的旧用户信息
            this.setUserInfo(null)
            //路由到登录
            this.$router.push({path:'/user/login'})
          }
          //更新store里的user信息
          this.setUserInfo(this.user)
        }
      })
    },
    //轮询消息
    getMessageList: function(){
      this.$http.get(this.$apiPath.MY_MESSAGE_URL, {}, response => {
        if(response.status == 200){
          //将数据更新到store中
          this.setMessageList(response.data)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'token', 'login'])
  },
  components: {
    Message, Reply, Me
  },
  created: function(){
    //判断用户是否登录
    if(this.login){
      //状态管理提示已经登录
      //再次验证登录（获取并更新最新的用户数据,因为storage中的数据可能是之前旧数据保存的）
      this.getUserInfo()
    }else{
      //暂未登录，把sstore的userInfo清空
      this.setUserInfo(null)
      //跳转到登录页面
      this.$router.push({path:'/user/login'})
    }

    //轮询消息
    // this.messageInterval = window.setInterval(() => {
    //   setTimeout(this.getMessageList, 0)
    // }, 1000)
  },
  watch: {
    selected: function (val, oldVal) {
      console.log('你选择了：' + val)
      // click后打印出当前mt-tab-item的id
    }
  },
  destroyed(){
    //离开当前页面就销毁定时器
    console.log('销毁消息轮询定时器')
    clearInterval(this.messageInterval)
  }
}

</script>

<style>

</style>
