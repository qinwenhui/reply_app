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
        <mt-cell is-link>
          <span slot="title">设置</span>
          <img slot="icon" src="../assets/logo.png" width="20" height="20">
        </mt-cell>
        <mt-cell>
          <span slot="title">关于</span>
          <span>当前版本V1.0</span>
          <img slot="icon" src="../assets/logo.png" width="20" height="20">
        </mt-cell>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Me',
  data: function(){
    return {

    }
  },
  methods: {
    goMyInfo(){
      console.log('开始跳转到个人资料界面')
      //this.$router.push('/my/myinfo');
    }
  },
  components: {

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
  #MeDiv{

    background-color: #111111;
  }
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
    background-color: #dbdbdb;
  }

  .mint-cell {
    min-height: 50px;
  }

  .user-option span {
    font-size: 13px;
  }

  .mint-cell:last-child {
    background-position-x: 10px;
  }
</style>
