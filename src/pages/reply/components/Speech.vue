<template>
  <div id="SpeechDiv">
    <div v-if="recorder">
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
      <!-- 显示正在进行的操作 -->
      <div style="width: 100%;height: 100px;margin-top: 10px;text-align: center;">
        <span style="line-height: 100px;color: #8B814C;">状态：</span>
        <span style="line-height: 100px;">{{recorderStatus==1?'正在录制...':'准备就绪'}}</span>
      </div>

      <div style="width: 100%;height: 100%;margin-top: 50px;text-align: center;">

        <div v-if="recorderStatus==0">
          <x-button type="primary" style="width: 80%;border-radius: 10px;" @click.native="startSpeech">开始</x-button>
        </div>
        <div v-if="recorderStatus==1">
          <x-button type="primary" style="width: 80%;border-radius: 10px;" @click.native="pause">暂停</x-button>
        </div>
        <div v-if="recorderStatus==2">
          <x-button type="primary" style="width: 80%;border-radius: 10px;" @click.native="resume">继续</x-button>
        </div>
        <br>
        <div>
          <x-button type="primary" style="width: 80%;border-radius: 10px;background: #DC143C;" @click.native="stop">停止</x-button>
        </div>
        <br>
        <x-button type="primary" style="width: 80%;border-radius: 10px;background: #DC143C;" @click.native="play">播放</x-button>
        <br>
        <x-button type="primary" style="width: 80%;border-radius: 10px;background: #4876FF;" @click.native="submitSpeech">上传</x-button>
      </div>
      <x-button type="primary" style="width: 100%; background: #EE6A50;position: fixed;bottom:0px;;border-radius: 0px;" @click.native="nextStep">下一环节</x-button>
    </div>

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
  name: 'Speech',
  data: function(){
    return {
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
    getPermission: function (){
      //获取用户录音权限
      return this.$Recorder.getPermission().then(() => {
          console.log('给权限了');
          this.recorder = new this.$Recorder({
            sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
            sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
            numChannels: 1,         // 声道，支持 1 或 2， 默认是1
            compiling: false,       // 是否边录边转换，默认是false
          })
      }, (error) => {
          console.log(`${error.name} : ${error.message}`);
          this.$vux.toast.show({text: '录音权限获取失败！', type: 'warn'})
      });
    },
    startSpeech: function (){
      this.recorder.start().then(()=>{
        console.log('开始录音')
        this.recorderStatus = 1
      }, (error)=>{
        console.log(`${error.name} : ${error.message}`);
      })

    },
    pause: function (){
      console.log('暂停录音');
      this.recorder.pause()
      this.recorderStatus = 2
    },
    resume: function (){
      console.log('继续录音');
      this.recorder.resume()
      this.recorderStatus = 1
    },
    stop: function (){
      console.log('停止录音');
      this.recorder.stop()
      this.recorderStatus = 0
    },
    play: function (){
      console.log('播放录音');
      this.recorder.play()
    },
    //获取答辩信息
    getCurrentUserReplyInfo: function (){
      this.$http.get(this.$apiPath.REPLY_INFO_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyInfo = response.data.data
            console.log('获取答辩信息成功');
            console.log(this.replyInfo);
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //上传演示音频
    submitSpeech: function (){
      this.$vux.loading.show({
       text: '正在上传...'
      })
      let speechBlob = this.recorder.getWAVBlob()
      let fd = new FormData()
      fd.append('replyId', this.replyInfo.id)
      fd.append('speechBlob', speechBlob, Date.parse(new Date())+'.wav')
      this.$http.post(this.$apiPath.SUBMIT_SPEECH_URL, fd, response => {
        if(response.status == 200){
          let data = response.data.data
          console.log(data);
          this.$vux.loading.hide()
          if(response.data.code == 0){
            //上传成功
            this.$vux.toast.show({text: '上传成功'})
            this.getCurrentUserReplyInfo()
          }else{
            this.$vux.toast.show({text: '上传失败！', type: 'warn'})
          }
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
    this.getPermission()
    this.getCurrentUserReplyInfo()
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
