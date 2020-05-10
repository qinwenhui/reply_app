<template>
  <div id="MeDiv">
    <div id="my">
    <div class="content">
      <div class="user-head">
        <div>
            <img class="user-img" :src="userInfo.icon" width="100%" height="100%" @click="goMyInfo">
        </div>
        <div class="user-info" @click="goMyInfo">
          <div class="user-info-a">
            <span style="color:#333aaa;font-size:15px;">{{userInfo.name}}</span>&nbsp;&nbsp;<span style="color:#222;font-size:10px;">{{getType()}}</span>
          </div>
          <div class="user-info-a">
            <span style="color:#222;font-size:10px;">数学与计算机科学学院</span>&nbsp;&nbsp;<span style="color:#222;font-size:10px;">2016级软件工程2班</span>
          </div>
          <div class="user-info-a">
            <span style="color:#222;font-size:10px;">学号：{{userInfo.number}}</span>
          </div>
        </div>
      </div>
      <div class="user-option">
        <group>
          <cell style="height: 30px;font-size: 15px;" title="个人资料" is-link @click.native="goMyInfo">
            <img slot="icon" width="15" style="display:block;margin-right:5px;" src="@/assets/image/me_userinfo.png">
          </cell>
          <cell style="height: 30px;font-size: 15px;" title="我的答辩" is-link v-if="userInfo.type == 0" @click.native="goReplyInfo">
            <img slot="icon" width="15" style="display:block;margin-right:5px;" src="@/assets/image/me_myreply.png">
          </cell>
          <cell style="height: 30px;font-size: 15px;" title="帮助与反馈" is-link link="/user/feedback">
            <img slot="icon" width="15" style="display:block;margin-right:5px;" src="@/assets/image/me_feedback.png">
          </cell>
          <cell style="height: 30px;font-size: 15px;" title="关于我们" is-link>
            <img slot="icon" width="15" style="display:block;margin-right:5px;" src="@/assets/image/me_about.png">
          </cell>
          <cell style="height: 30px;font-size: 15px;" title="设置" is-link>
            <img slot="icon" width="15" style="display:block;margin-right:5px;" src="@/assets/image/me_setting.png">
          </cell>
        </group>
        <br>
          <x-button style="width: 60%;margin-top: 50px;" type="warn" @click.native="logout">注销登录</x-button>
      </div>

    </div>
  </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { Group, Cell, XButton } from 'vux'
export default {
  name: 'Me',
  data: function(){
    return {

    }
  },
  methods: {
    ...mapActions(['setLogin', 'setToken', 'setUserInfo']),
    goMyInfo(){
      this.$router.push('/user/userInfo');
    },
    //注销
    logout: function() {
      //销毁login状态
      this.setLogin(false)
      this.setUserInfo(null)
      this.setToken('')
      //跳转到首页界面
      this.$router.push({'path': '/user/login'})
    },
    getType: function (){
      return this.userInfo.type == 0 ? '学生' : '教师'
    },
    goReplyInfo: function (){
      this.$router.push({path: '/reply/replyInfo'})
    }
  },
  components: {
    Group, XButton, Cell
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created: function(){

  }
}

</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
  }

  .user-head {
    height: 180px;
    width: 100%;
    background-color: orange;
    display: flex;
    align-items: center;
  }

  .user-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: solid #ffffff 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:20px;
  }
.user-info{
  height: 100px;
  margin-left:10px;
}
.user-info-a{
  width:100%;
  height:33%;
  line-height:33px;
}

</style>
