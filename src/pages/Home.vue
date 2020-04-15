<template>
  <div>
    <component v-bind:is="selected"></component>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="Message">
        <img slot="icon" src="../assets/image/message.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="Reply">
        <img slot="icon" src="../assets/image/home.png">
        答辩
      </mt-tab-item>
      <mt-tab-item id="Me">
        <img slot="icon" src="../assets/image/me.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
//导入切换页面组件
import Message from '@/pages/Message'
import Reply from '@/pages/Reply'
import Me from '@/pages/Me'

export default {
  name: 'Home',
  data: function(){
    return {
      selected: 'Reply',
    }
  },
  methods: {

  },
  components: {
    Message, Reply, Me
  },
  created: function(){

  },
  watch: {
    selected: function (val, oldVal) {
      console.log('你选择了：' + val)
      // click后打印出当前mt-tab-item的id
    }
  }
}

</script>

<style>

</style>
