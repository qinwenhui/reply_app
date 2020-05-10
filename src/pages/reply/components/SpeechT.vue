<template>
  <div id="SpeechDiv">
    <div v-if="replyInfo">
      <!-- 记录用户答辩演示的音频区域 -->
      <div v-if="replyInfo.speech">
        <group-title>音频文件</group-title>
        <div style="width: 80%;height: 100px;margin-left: 10%;margin-top: 10px;background: #e3eafe;text-align: center;border-radius: 5px;">
          <img :src="replyInfo.user.icon" width="80px" height="80px" style="float: left;margin-top: 10px;margin-left: 10px;">

          <div style="float: right;margin-top: 20px;margin-right: 10px;">
            <m-audio :src="replyInfo.speech+'?'+Date.parse(new Date())"></m-audio>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-size: 10px;color: #1a3fd5;" @click="shibie(replyInfo.speech)">语音识别</span>
          </div>
        </div>
      </div>
      <div v-if="replyInfo.speech == null">
        <span>该用户暂无演示记录</span>
      </div>

    </div>
    <x-button type="primary" style="width: 100%; background: #EE6A50;position: fixed;bottom:0px;;border-radius: 0px;" @click.native="nextStep">下一环节</x-button>
    <!-- 语音识别弹出框 -->
    <div class="shibieDiv">
      <x-dialog v-model:show="shibieDialog.show" :hide-on-blur="shibieDialog.hideOnBlur">
        <div style="width: 100%; ">
          <group title="识别内容">
            <div v-for="item in shibieDialog.result" :key="item" style="padding: 20px;">
              <span>{{item}}</span>
            </div>
          </group>
        </div>
      </x-dialog>
    </div>

  </div>
</template>

<script>
import { XButton, Countup, GroupTitle, XDialog, Group} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'SpeechT',
  data: function(){
    return {
      timer: null,
      //录音对象
      recorder: null,
      replyInfo: null,
      recorderStatus: 0,
      shibieDialog: {
        show: false,
        hideOnBlur: true,
        result: []
      },
    }
  },
  props: ['replyInfoId'],
  computed: {
    ...mapGetters({active: 'replyStep'}),
  },
  watch: {
  },
  methods: {
    ...mapActions(['setReplyStep']),
    nextStep: function (){
      this.setReplyStep(this.active + 1)
    },
    lastStep: function (){
      this.setReplyStep(this.active - 1)
    },
    //获取答辩信息
    getCurrentUserReplyInfo: function (){

      this.$http.get(this.$apiPath.GET_REPLYINFOVO_BY_REPLYINFO_URL, {id: this.replyInfoId}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyInfo = response.data.data
            console.log(this.replyInfo);
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //语音识别
    shibie: function (fileUrl){
      this.$vux.loading.show({
       text: '正在识别...'
      })
      this.$http.get(this.$apiPath.AUDIO_TO_TEXT_URL, {fileUrl:fileUrl}, response => {
        if(response.status == 200){
          if(response.data.code == 0){
            //识别成功
            this.shibieDialog.show = true
            this.shibieDialog.result = response.data.data
          }else{
            this.$vux.toast.show({text: response.data.msg+":"+response.data.data.err_msg, type: 'warn'})
          }
        }
        this.$vux.loading.hide()
      })
    }
  },
  components: {
    XButton, Countup, GroupTitle, XDialog, Group
  },
  created: function(){
    this.getCurrentUserReplyInfo()
    //轮询问题
    this.timer = window.setInterval(() => {
      setTimeout(this.getCurrentUserReplyInfo(), 0)
    }, 2000)
  },
  destroyed: function (){
    clearInterval(this.timer)
  }
}

</script>

<style scoped>
  .demo1 {
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    font-size: 6em;
    color: #04BE02;
  }
</style>
