<template>
  <div id="MessageDiv">
    <component is="Header" title="消息"></component>
    <div class="msgDiv" v-if="unreadCount > 0" style="position: fixed;">
      <span>有</span><span style="color:red">{{unreadCount}}</span><span>条新消息</span>
    </div>
    <div style="height: 20px;" v-if="unreadCount > 0"></div>
    <div class="noData" v-if="!list || list.length == 0">
      <div>
        <icon type="info" is-msg></icon>
        <br><br>
        <span>暂无消息</span>
      </div>
    </div>
    <div class="messageListDiv" v-if="list" >
      <div v-for="item in list" class="listItem" :key="item.id" @click="showMessage(item)">
        <div class="iconDiv">
          <img :src="item.sender.icon" width="100%" height="100%">
        </div>
        <div class="rightDiv">
          <div class="nameDiv">
            <span>{{item.sender.name}}</span>
          </div>
          <div class="contentDiv">
            <span>{{item.content}}</span>
          </div>
          <div class="dateDiv">
            <span>{{item.createTime}}</span>
          </div>
        </div>
        <div class="statusDiv" v-if="item.status == 0">

        </div>
      </div>
    </div>

    <!-- 消息详情框 -->
    <div>
      <x-dialog v-model:show="dialog.show" :hide-on-blur="dialog.hideOnBlur">
        <div class="messageInfoDiv">
          <span style="font-weight: bold;color: #666;">消息详情</span>
          <div style="width:100%;height:1px;background-color: #eeaaee;"></div>
          <div style="width:100%;height:5px;"></div>
          <span>{{dialog.message.content}}</span>
        </div>
        <Group>
          <x-button type="primary" @click.native="goSendMessage" style="border-radius: 0px;background: #FF8247;">回复</x-button>
        </Group>
      </x-dialog>
    </div>
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
import { mapGetters, mapActions } from 'vuex'
import { Icon, XDialog, Group, XButton } from 'vux'
export default {
  name: 'Message',
  data: function(){
    return {
      dialog: {
        show: false,
        hideOnBlur: true,
        message: {}
      }
    }
  },
  methods: {
    ...mapActions(['setMessageList']),
    //显示消息详情
    showMessage: function (message){
      this.dialog.show = true
      this.dialog.message = message
      if(message.status == 0){
        //向后台更新消息状态
        this.$http.post(this.$apiPath.UPDATE_MESSAGE_URL, {id: message.id, status: 1}, response => {
          if(response.status == 200){
            let data = response.data
            console.log(data)
            message.status = 1
          }
        })
      }

    },
    goSendMessage: function (){
      //跳转到发送消息页面
      this.$router.push({path: '/message/sendMessage', name: 'SendMessage', params: {receiverId: this.dialog.message.senderId}})
    }
  },
  components: {
    Header, Icon, XDialog, XButton, Group
  },
  computed: {
    //为了加载快速，每次进入message页面的时候先从store获取缓存的消息列表
    ...mapGetters({list: 'messageList', unreadCount: 'unreadCount'})
  },
  created: function(){
    this.$http.get(this.$apiPath.MY_MESSAGE_URL, {}, response => {
      if(response.status == 200){
        if(response.data.code == 0){
          //将数据更新到store中
          this.setMessageList(response.data.data)
        }else{
          this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          if(response.status == 403){
            this.$route.push({path: '/user/login'})
          }
        }

      }else if(response.status == 403){
        //没有权限，跳转到登录页面
        console.log("跳转到登录页面");
      }else{
        this.$vux.toast.show({ text: '网络错误', position: 'middle', type: 'warn', time: 1000 })
      }
    })
  }
}

</script>

<style>
.msgDiv{
  width: 100%;
  background-color: #3e6;
  height: 20px;
}
.msgDiv span{
  font-size: 10px;
  color: #666;
  line-height: 20px;
}
.listItem{
  width: 100%;
  height: 80px;
  float: left;
  border-bottom:1px solid #eaeaea;
}
.iconDiv{
  width: 56px;
  height: 56px;
  margin-left: 12px;
  margin-top: 12px;
  float: left;
}
.iconDiv img{
  border-radius: 50%;
}
.rightDiv{
  width: 70%;
  height: 60px;
  margin-left: 10px;
  margin-top: 10px;
  float: left;
}
.nameDiv{
  width: 100%;
  height: 30%;
}
.nameDiv span{
  font-size: 15px;
}
.contentDiv{
  width: 100%;
  height: 50%;
}
.contentDiv span{
  margin-top:2px;
  font-size: 10px;
  display:block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #00C5CD;
}
.dateDiv{
  width: 100%;
  height: 20%;
}
.dateDiv span{
  margin-top:2px;
  font-size: 10px;
  display:block;
  color: #DAD7BA;
  float: right;
}
.statusDiv{
  width: 10px;
  height: 10px;
  float: right;
  margin-top: 34px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: red;
}
.noData{
  width: 100%;
  height: 100%;
  margin-top: 50%;
  float: left;
}
.noData div{
  height: 100%;
  text-align: center;
}
.noData div span{
  color: #aaa;
  font-size: 20px;
  text-align: center;
}
.messageInfoDiv{
  padding: 10px;
}
</style>
