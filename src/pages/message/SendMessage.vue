<template>
  <div id="SendMessageDiv">
    <component is="Header" title="发送消息" back="true"></component>
    <group title="编辑发送消息">
      <x-textarea :max="200" name="detail" placeholder="内容" :show-counter="false" v-model="content"></x-textarea>
    </group>
    <br>
    <x-button type="primary" @click.native="send" style="width: 80%;">发送</x-button>
  </div>
</template>

<script>
import Header from '@/components/HomeHeader'
import { XButton, Group, XTextarea, XInput } from 'vux'
export default {
  name: 'SendMessage',
  data: function(){
    return {
      receiverId: null,
      content: '',
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    send: function (){
      this.$http.post(this.$apiPath.SEND_MESSAGE_URL, {receiverId: this.receiverId, content: this.content}, response => {
        if(response.status == 200){
          let data = response.data
          if(data.code == 0){
            this.$vux.toast.show({ text: data.msg, position: 'middle', time: 1000 })
          }else{
            this.$vux.toast.show({ text: data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }
      })
    }
  },
  components: {
    Header, XButton, Group, XTextarea, XInput
  },
  created: function(){
    this.receiverId = this.$route.params.receiverId;
  },
  destroyed: function (){

  }
}

</script>

<style scoped>

</style>
