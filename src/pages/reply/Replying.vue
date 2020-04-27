<template>
  <div id="ReplyingDiv">
    <component is="Header" title="正在答辩" back="true"></component>

  </div>
</template>

<script>
  //引入标题组件
import Header from '@/components/HomeHeader'
import { Group, GroupTitle, CellFormPreview, Scroller, XButton } from 'vux'

export default {
  name: 'ReplyInfo',
  data: function(){
    return {
      loading: false
    }
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
    //获取当前用户答辩信息
    getCurrentUserReplyInfo: function (){
      this.$http.get(this.$apiPath.REPLY_INFO_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyInfo = response.data.data
            console.log('获取答辩信息成功');
            //执行获取用户班级h和答辩组信息的函数
            this.getUserClass()
            this.getUserReplyGroup()
            this.setReplyinfoStatus()
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //获取用户班级
    getUserClass: function (){
      this.$http.get(this.$apiPath.GET_USER_CLASS_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyInfo.user.class = response.data.data
            console.log('获取班级信息成功');
            this.loading = true
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //获取用户答辩组
    getUserReplyGroup: function (){
      this.$http.get(this.$apiPath.GET_USER_REPLYGROUP_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyInfo.replyGroup = response.data.data
            console.log('获取答辩组成功');
            this.setReplyDetail()
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //根据status设置状态名称
    setReplyinfoStatus: function (){
      switch (this.replyInfo.status) {
        case 0:
          this.replyInfo.status = '未开始'
          break;
        case 1:
          this.replyInfo.status = '正在进行'
          break;
        case 2:
          this.replyInfo.status = '已结束'
          break;

      }
      if(this.replyInfo.scoreStatus == 0){
        this.replyInfo.score = '未公布'
      }
      switch (this.replyInfo.speechStatus) {
        case 0:
          this.replyInfo.speechStatus = '未开始'
          break;
        case 1:
          this.replyInfo.speechStatus = '正在进行'
          break;
        case 2:
          this.replyInfo.speechStatus = '已结束'
          break;
      }
    },
    //设置答辩详情信息
    setReplyDetail: function (){
      this.list[0].value = this.replyInfo.replyTime
      this.list[1].value = this.replyInfo.replyGroup.address
      this.list[2].value = this.replyInfo.score
      this.list[3].value = this.replyInfo.describe
      console.log(this.list);
      this.loadGroupStatus = true
      console.log('成绩详情'+this.loadGroupStatus)
    }
  },
  components: {
    Header, GroupTitle, Group, CellFormPreview, Scroller, XButton
  },
  created: function(){
    //提示用户正在加载数据
    // this.$vux.loading.show({
    //  text: '加载中'
    // })
    //执行获取用户答辩信息的函数
    //this.getCurrentUserReplyInfo()
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
