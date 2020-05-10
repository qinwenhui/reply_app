<template>
  <div id="ReplyDiv">
    <component is="Header" title="答辩"></component>
    <div class="topSwiper">
      <swiper :list="swiperData.list" :auto="swiperData.auto" :loop="swiperData.loop" :height="swiperData.height"></swiper>
    </div>
    <div class="replyInfoDiv">
      <div v-if="replyLoading">
        <group-title>我的答辩</group-title>
        <div style="margin: 10px;overflow: hidden;" @click="goReplyInfo">
          <masker style="border-radius: 2px;" color="F9C90C" :opacity="0.8">
            <div class="m-img" style="background-image:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587249844856&di=79c30005360f13f462adac6c524d5524&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F07%2F200343cx0b5wwqdp0wbdb3.jpg)"></div>
            <div slot="content" class="m-title">
              {{replyinfo.title}}
              <br/>
              <span style="color: #7EC0EE;">{{replyinfo.user.name}}</span>
              <br>
              <span class="m-time">{{replyinfo.replyTime}}</span>
            </div>
          </masker>
        </div>
      </div>
      <div v-if="groupLoading">
        <group-title>答辩组</group-title>
        <div class="replyGroupContentDiv">
          <div>
            <span>名称：{{replyGroup.name}}</span>
            <br><br>
            <span>组长：{{replyGroup.leader.name}}</span>
            <br><br>
            <span>地点：{{replyGroup.address}}</span>
            <br><br>
            <span>日期：{{replyGroup.replyTime}}</span>
          </div>
        </div>
        <group>
          <XButton type="warn" style="width: 90%;" @click.native="goReplyInfo">查看详情</XButton>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
//引入VUX
import { Swiper, Grid, GridItem, GroupTitle, Card, Masker, XButton, Group } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'Reply',
  data: function(){
    return {
      groupLoading: false,
      replyLoading: false,
      swiperData: {
        list: [{
                url: 'javascript:',
                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587245206817&di=71ab7f10d24a72414ab37f4aa7caabe8&imgtype=0&src=http%3A%2F%2Fwww.chinalibs.net%2FArtimgages%2F2013%2F5%2F27%2F727733819.jpg',
                title: '每日一图'
              }, {
                url: 'javascript:',
                img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2246357658,459105755&fm=15&gp=0.jpg',
                title: '每日一图'
              },{
                url: 'javascript:',
                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587245316525&di=ed2a1077dcd176156927a897d48b0b8f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1800858094%2C1198683001%26fm%3D214%26gp%3D0.jpg',
                title: '每日一图'
        }],
        auto: true,
        loop: true,
        height: '200px'
      },
      replyGroup: {leader: null},
      replyinfo: null
    }
  },
  computed: {
    ...mapGetters({user:'userInfo'})
  },
  methods: {
    //跳转到答辩详情
    goReplyInfo: function (){
      if(this.user.type == 0){
        this.$router.push({path:'/reply/replyInfo'})
      }else{
        this.$router.push({path:'/reply/replyGroupInfo'})
      }

    },
    //获取答辩组信息
    getUserReplyGroup: function (){
      this.$http.get(this.$apiPath.GET_USER_REPLYGROUP_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyGroup = response.data.data
            this.replyGroup.replyTime = this.$moment(this.replyGroup.replyTime).format('YYYY-MM-DD: HH:mm:ss')
            this.getLeaderById()
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //获取用户信息
    getLeaderById: function (){
      this.$http.get(this.$apiPath.GET_USER_BY_ID_URL, {id: this.replyGroup.leaderId}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyGroup.leader = response.data.data
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
          this.groupLoading = true
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //获取用户答辩信息
    getCurrentUserReplyInfo: function (){
      //先判断登录的是老师还是学生，老师不用查询答辩信息
      if(this.user.type != 0){
        return false;
      }
      this.$http.get(this.$apiPath.REPLY_INFO_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyinfo = response.data.data
            this.replyinfo.replyTime = this.$moment(this.replyinfo.replyTime).format('YYYY-MM-DD')
            this.replyLoading = true
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
  },
  components: {
    Header, Swiper, Grid, GridItem, GroupTitle, Card, Masker, XButton, Group
  },
  created: function(){
    if(this.user == null){
      //暂未登录
      console.log('答辩页面提示：暂未登录')
    }else{
      this.getUserReplyGroup()
      this.getCurrentUserReplyInfo()
    }

  }
}

</script>

<style scoped>
.replyGroupContentDiv{
  height: 150px;
  margin-top: 10px;
  position: relative;
}
.replyGroupContentDiv div{
  position: absolute;
  width: 94%;
  height: 100%;
  margin-left: 3%;
  border-shadow: 0 0 2px rgba(0, 0, 0, .5);
  border-radius: 2px;
  background-color: rgba(80, 70, 0, .5);
}
.replyGroupContentDiv div span{
color: #fff;
}
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
</style>
