<template>
  <div id="ReplyGroupInfoDiv">
    <component is="Header" title="我的答辩组" back="true"></component>
    <div class="replyGroupInfoPanel" v-if="loading">

      <van-sticky :offset-top="35">
      <div style="background: #fff;">
      <!-- 答辩老师列表 -->
      <group-title>答辩组老师</group-title>
      <scroller lock-y>
        <div class="box1">
          <div class="box1-item" v-for="teacher in replygroup.teacherList">
            <div class="imgDiv" @click="openSendMessage(teacher.id)">
              <img :src="teacher.icon" width="70px" height="70px">
              <br>
              <span>{{teacher.name}}</span>
            </div>
          </div>
        </div>
      </scroller>
      <div style="width: 100%;height: 1px;background: #efefef;margin-top: 5px;"></div>

      <!-- 组内学生答辩 -->
      <group-title>学生答辩</group-title>
      </div>
      </van-sticky>
      <!-- <div>
        <panel :list="replyList" :type="'2'" style="padding-top: 0px;padding-bottom: 0px;">
        </panel>
      </div><div style="width: 100%;height: 70px;text-align:center;"> -->

      <div v-for="reply in replyList" :key="reply.id" style="padding: 0px 15px 0px 15px ;">
        <div>
          <div style="height: 30px;">
            <img :src="reply.user.icon" style="width: 30px; height: 30px;border-radius: 100%;float:left;" @click="openSendMessage(reply.user.id)">
            <span style="line-height: 30px;float:left;margin-left: 10px;">{{reply.user.name}}</span>
            <span style="line-height: 30px;float:right;margin-right: 10px;font-size: 10px;color: red;">{{reply.status==0?'未开始':'已开始'}}</span>
          </div>
          <div style="height: 30px;"  @click="goReplying(reply)">
            <span style="line-height: 30px;float:left;color: #111;">题目：{{reply.title}}</span>
          </div>
        </div>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="更多信息" :name="reply.id">
            <cell-form-preview :list="getReplyDetail(reply)"></cell-form-preview>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div style="width: 100%;height: 70px;text-align:center;">

        <span style="font-size: 10px;color: #abcabc;">-------------------------我是有底线的-------------------------</span>
      </div>
    </div>
  </div>
</template>

<script>
  //引入标题组件
import Header from '@/components/HomeHeader'
import { Group, GroupTitle, CellFormPreview, Scroller, XButton, Panel } from 'vux'
import {mapGetters} from 'vuex'
export default {
  name: 'ReplyGroupInfo',
  data: function(){
    return {
      loading: false,
      replygroup: null,
      replyList: [],
      activeNames: []
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {
    loading: function(val, oldVal){
      console.log(val);
      if(val){
        this.$vux.loading.hide()
      }else{
        this.$vux.loading.show({
         text: '加载中'
        })
      }
    }
  },
  methods: {
    //获取用户答辩组
    getUserReplyGroup: function (){
      this.$http.get(this.$apiPath.GET_REPLYGROUPVO_BY_USER_URL, {id: this.userInfo.id, type: this.userInfo.type}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replygroup = response.data.data
            console.log('获取答辩组成功');
            this.getAllStudentReplyVo()

          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //获取每个学生的答辩信息
    getAllStudentReplyVo: function (){
      for (let i = 0; i < this.replygroup.studentList.length; i++) {
        let id = this.replygroup.studentList[i].id
        this.$http.get(this.$apiPath.GET_REPLYINFOVO_BY_USER_URL, {id: id}, (response) => {
          if(response.status == 200){
            if(response.data.code == 0){
              if(response.data.data != null){
                //let item = {title: this.replygroup.studentList[i].name, desc: response.data.data.title, url: '/reply/replying/'+response.data.data.id}
                this.replyList.push(response.data.data)
              }
              if(i == this.replygroup.studentList.length-1){
                //最后一个获取完了
                this.loading = true
              }
            }else{
              this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
            }
          }else{
            this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
          }
        })
      }
    },
    //设置答辩详情信息
    getReplyDetail: function (reply){
      if(reply.scoreStatus == 0){
        reply.score = '未公布'
      }
      let list = [{
        label: '答辩时间',
        value: this.$moment(reply.replyTime).format('YYYY-MM-DD: HH:mm:ss')
      }, {
        label: '答辩地址',
        value: this.replygroup.address
      }, {
        label: '答辩分数',
        value: reply.score
      }, {
        label: '备注',
        value: reply.describe
      }]
      return list
    },
    goReplying: function (reply){
      //跳转到学生答辩过程
      if(reply.status == 0){
        //未开始
        this.$vux.toast.show({ text: '该学生答辩未开始', position: 'middle', type: 'warn', time: 1000 })
        return false
      }
      this.$router.push({path: '/reply/replying', name:'Replying', params: {id: reply.id} })
    },
    //打开发送消息的页面
    openSendMessage: function (receiverId){
      this.$router.push({path: '/message/sendMessage', name: 'SendMessage', params: {receiverId: receiverId}})
    }
  },
  components: {
    Header, GroupTitle, Group, CellFormPreview, Scroller, XButton, Panel
  },
  created: function(){
    //提示用户正在加载数据
    this.$vux.loading.show({
     text: '加载中'
    })
    this.getUserReplyGroup()
  },
  destroyed: function (){
    this.$vux.loading.hide();
  }
}

</script>

<style scoped>
.replyInfoPanel{
  width: 100%;
  height: 300px;
}
ul{
margin:0px;
padding:0;
}
ul li{
list-style-type:none;
color: #00B2EE;
}
.box1 {
  height: 100px;
  position: relative;
  width: 500px;
}
.box1-item {
  width: 100px;
  height: 100px;
  margin-left: 15px;
  float: left;
  text-align: center;
}
.box1-item span {
  font-size: 10px;
  color: #666;
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.imgDiv{
  width: 100%;
  height: 70%;
  padding-top: 5px;
}
.imgDiv img{
  border-radius: 100%;
  box-shadow: 0px 0px 2px 0px;
}
</style>
