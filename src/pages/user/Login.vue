<template>
  <div id="LoginDiv">
    <component is="Header" title="登录"></component>
    <div class="fromDiv">
      <group>
        <x-input title="用户名" v-model="user.username" @on-click-clear-icon="clearUsernameValue" :required="usernameInput.required"></x-input>
        <x-input title="密 码" v-model="user.password" type="password" @on-click-clear-icon="clearPasswordValue" :required="passwordInput.required"></x-input>
        <div class="buttonDiv">
          <x-button type="primary" @click.native="login">登录</x-button>
          <x-button @click.native="goRegister">注册</x-button>
        </div>

      </group>
    </div>
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
import { XInput, Group, XButton } from 'vux'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data: function(){
    return {
      user: {
        username: '',
        password: ''
      },
      usernameInput: {
        required: true
      },
      passwordInput: {
        required: true
      }

    }
  },
  methods: {
    ...mapActions({setLogin:'setLogin', setUserInfo: 'setUserInfo', setToken: 'setToken'}),
    //清除值
    clearUsernameValue: function() {
      this.username = ''
    },
    clearPasswordValue: function() {
      this.password = ''
    },
    //登录操作
    login: function() {
      //校验
      if(this.user.username == '' || this.user.password == ''){
        this.$vux.toast.show({text:'请输入完整',type:'warn'})
        return
      }
      //开始执行登录的请求,先弹出正在登录加载框
      this.$vux.loading.show({text:'正在登录'})
      //请求后端
      this.$http.post(this.$apiPath.LOGIN_URL, this.user, response => {
        this.$vux.loading.hide()
        if(response.status == 200){
          if(response.data.code == 0){
            this.$vux.toast.show({text: response.data.msg,time: 1000})
            //将状态保存到store
            this.setLogin(true)
            this.setUserInfo(response.data.data)
            this.setToken(response.data.data.token)
            //路由跳转
            this.$router.push({'path': '/'})
          }else{
            this.$vux.toast.show({text: response.data.msg,type: 'cancel'})
          }
        }else{
          this.$vux.toast.show({text:'网络请求错误',type:'warn'})
        }
      })
    },
    goRegister: function () {
      //跳转到注册界面
      this.$router.push({'path': '/user/register'})
    }
  },
  components: {
    Header, XInput, Group, XButton
  },
  created: function(){

  },
  destroyed: function(){
    //关闭登录成功的提示框
    this.$vux.toast.hide()
  }
}

</script>

<style>
.buttonDiv{
  margin-top: 20px;
  padding-left:20px;
  padding-right:20px;
}
</style>
