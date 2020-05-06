<template>
  <div id="SpeechDiv">
    <div v-if="recorder">
      <!-- 记录用户答辩演示的音频区域 -->
      <div v-if="replyInfo.speech == null">
        <group-title>音频文件</group-title>
        <div style="width: 80%;height: 100px;margin-left: 10%;margin-top: 10px;background: #e3eafe;text-align: center;border-radius: 5px;">
          <img :src="replyInfo.user.icon" width="80px" height="80px" style="float: left;margin-top: 10px;margin-left: 10px;">

          <van-icon name="volume" color="#1989fa" size="60px" style="float: right;margin-top: 20px;margin-right: 10px;" />
        </div>
      </div>
      <!-- 显示正在进行的操作 -->
      <div style="width: 100%;height: 100px;margin-top: 10px;text-align: center;">
        <span style="line-height: 100px;color: #8B814C;">状态：</span>
        <span style="line-height: 100px;">正在录制...</span>
      </div>

      <div style="width: 100%;height: 100%;margin-top: 50px;text-align: center;">
        <x-button type="primary" style="width: 80%;border-radius: 10px;">暂停</x-button>
        <x-button type="primary" style="width: 80%;border-radius: 10px;background: #DC143C;">停止</x-button>

      </div>
      <x-button type="primary" style="width: 100%; background: #EE6A50;position: fixed;bottom:0px;;border-radius: 0px;" @click.native="nextStep">下一环节</x-button>
    </div>


  </div>
</template>

<script>
import { XButton, Countup, GroupTitle} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Speech',
  data: function(){
    return {
      //录音对象
      recorder: null,
      replyInfo: null,
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
          this.recorder = new this.$Recorder()
      }, (error) => {
          console.log(`${error.name} : ${error.message}`);
          this.$vux.toast.show({text: '录音权限获取失败！', type: 'warn'})
      });
    },
    startSpeech: function (){
      this.recorder.start().then(()=>{
        console.log('开始录音')
      }, (error)=>{
        console.log(`${error.name} : ${error.message}`);
      })
    },
    pause: function (){
      console.log('暂停录音');
      this.recorder.pause()
    },
    resume: function (){
      console.log('继续录音');
      this.recorder.resume()
    },
    stop: function (){
      console.log('停止录音');
      this.recorder.stop()
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
  },
  components: {
    XButton, Countup, GroupTitle
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
