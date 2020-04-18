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
      <div v-for="item in list" class="listItem" :key="item.id">
        <div class="iconDiv">
          <img :src="item.img" width="100%" height="100%">
        </div>
        <div class="rightDiv">
          <div class="nameDiv">
            <span>{{item.name}}</span>
          </div>
          <div class="contentDiv">
            <span>{{item.content}}</span>
          </div>
          <div class="dateDiv">
            <span>{{item.date}}</span>
          </div>
        </div>
        <div class="statusDiv" v-if="item.status == 0">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
import { mapGetters, mapActions } from 'vuex'
import { Icon } from 'vux'
export default {
  name: 'Message',
  data: function(){
    return {

    }
  },
  methods: {
    // loadMore() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     let last = this.list.length > 0 ? this.list[this.list.length - 1]: 0;
    //     for (let i = 1; i <= 10; i++) {
    //       this.list.push(last + i);
    //     }
    //     this.loading = false;
    //   }, 2500);
    // }
    ...mapActions(['setMessageList'])
  },
  components: {
    Header, Icon
  },
  computed: {
    //为了加载快速，每次进入message页面的时候先从store获取缓存的消息列表
    ...mapGetters({list: 'messageList', unreadCount: 'unreadCount'})
  },
  created: function(){
    this.$http.get(this.$apiPath.MY_MESSAGE_URL, {}, response => {
      if(response.status == 200){
        //将数据更新到store中
        this.setMessageList(response.data)
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
  font-size: 5px;
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
</style>
