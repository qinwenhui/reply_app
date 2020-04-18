<template>
  <div id="MeDiv">
    <div id="my">
    <div class="content">
      <div class="user-head">
        <div>
            <img class="user-img" src="../assets/image/defaultUserIcon.jpg" width="100%" height="100%" @click="goMyInfo">
        </div>
        <div class="user-info" @click="goMyInfo">
          <div class="user-info-a">
            <span style="color:#333aaa;font-size:15px;">覃文辉</span>&nbsp;&nbsp;<span style="color:#222;font-size:10px;">学生</span>
          </div>
          <div class="user-info-a">
            <span style="color:#222;font-size:10px;">数学与计算机科学学院</span>&nbsp;&nbsp;<span style="color:#222;font-size:10px;">2016级软件工程2班</span>
          </div>
          <div class="user-info-a">
            <span style="color:#222;font-size:10px;">学号：P161713309</span>
          </div>
        </div>
      </div>
      <div class="user-option">
        1
      </div>
      <x-button mini type="warn" @click.native="logout">注销登录</x-button>
    </div>
  </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
import { XButton } from 'vux'
export default {
  name: 'Me',
  data: function(){
    return {

    }
  },
  methods: {
    ...mapActions(['setLogin', 'setToken', 'setUserInfo']),
    goMyInfo(){
      console.log('开始跳转到个人资料界面')
      //this.$router.push('/my/myinfo');
    },
    //注销
    logout: function() {
      //销毁login状态
      this.setLogin(false)
      this.setUserInfo(null)
      this.setToken('')
      //跳转到首页界面
      this.$router.push({'path': '/user/login'})
    }
  },
  components: {
    XButton
  },
  created: function(){
    // let _footer = this.$store.state.footerVisible;
    // if (!_footer) {
    //   this.$store.commit('TOGGLE_FOOTER');
    // }
    // this.$store.commit('SELECT_TAB', 'my')
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
  .user-option {

  }
  .user-option span {
    font-size: 13px;
  }

</style>
