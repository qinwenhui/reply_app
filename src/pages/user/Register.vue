<template>
  <div id="RegisterDiv">
    <component is="Header" title="注册"></component>
    <div class="fromDiv">
      <group title="账号信息">
        <x-input title="用户名" v-model="user.username" :required="required" :show-clear="false"></x-input>
        <x-input title="密 码" v-model="user.password" :type="passwordInput.type" :required="required" :show-clear="false">
          <img :src="passwordInput.seeSrc" slot="right" width="20px" height="20px" @click="see">
        </x-input>
        <x-input title="确认密码" v-model="user.password2" :type="passwordInput.type" :required="required" :show-clear="false">
          <img :src="passwordInput.seeSrc" slot="right" width="20px" height="20px" @click="see">
        </x-input>
        <x-input title="姓名" v-model="user.name" :required="required" :show-clear="false"></x-input>
      </group>
      <group title="账号类型">
        <radio title="title" :options="radioOptions" v-model="user.type"></radio>
        <x-input title="学号/工号" v-model="user.number" :required="required" :show-clear="false"></x-input>
      </group>
      <group>
        <div class="buttonDiv">
          <x-button type="primary" @click.native="register">注册</x-button>
          <x-button @click.native="goLogin">返回登录</x-button>
        </div>
      </group>
    </div>
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
import { XInput, Group, XButton, Radio } from 'vux'
import { mapActions } from 'vuex'
//引入图片
import seeImg from '@/assets/image/see.png'
import noseeImg from '@/assets/image/nosee.png'
export default {
  name: 'Register',
  data: function(){
    return {
      user: {
        username: '',
        password: '',
        password2: '',
        type: 0,
        name: '',
        number: ''
      },
      passwordInput: {
        type: 'password',
        seeSrc: seeImg
      },
      required: true,
      norequired: false,
      //老师学生单选
      radioOptions: [{
        key: 0,
        value: '学生'
      }, {
        key: 1,
        value: '教师'
      }]
    }
  },
  methods: {
    ...mapActions({setLogin:'setLogin', setUserInfo: 'setUserInfo', setToken: 'setToken'}),
    //验证数据
    checkData: function (){
      //遍历数据
      for(let key in this.user){
        if(this.user[key] === ''){
          this.$vux.toast.show({text:'请输入完整',type:'warn'})
          return false
        }
      }
      if(this.user.password !== this.user.password2){
        this.$vux.toast.show({text:'两次密码不相等',type:'warn'})
        return false
      }
      return true
    },
    //查看明文密码
    see: function (){
      if(this.passwordInput.type == 'password'){
        this.passwordInput.type = 'text'
        this.passwordInput.seeSrc = noseeImg
      }else{
        this.passwordInput.type = 'password'
        this.passwordInput.seeSrc = seeImg
      }

    },
    //注册操作
    register: function() {
      //校验
      if(!this.checkData()){
        return
      }
      //开始执行注册的请求,先弹出正在注册加载框
      this.$vux.loading.show({text:'正在注册'})
      //请求后端
      this.$http.post(this.$apiPath.REGISTER_URL, this.user, response => {
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
    goLogin: function (){
      this.$router.push({path: '/user/login'})
    }
  },
  watch: {

  },
  components: {
    Header, XInput, Group, XButton, Radio
  },
  created: function(){

  },
  destroyed: function(){
    //关闭注册成功的提示框
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
