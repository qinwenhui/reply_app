<template>
  <div id="QuestionDiv">
    <div class="questionItemDiv" v-for="item in questions" :key="item.id">
      <van-panel :title="item.user.name" :desc="item.content" :status="item.status==0?'未回复':'已回复'">
        <div>
          <m-audio :src="item.contentFile"></m-audio>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style="font-size: 10px;color: #1a3fd5;" @click="shibie(item.contentFile)">语音识别</span>
        </div>
        <template #footer>
          <div v-if="item.status==1">
            <!-- <span>回复内容</span> -->
            <van-collapse v-model="activeNames">
              <van-collapse-item :title="userInfo.type==0?'回复内容':'学生回复'" :name="item.id">
                <span>{{item.replyContent}}</span>
                <br><br>
                <m-audio :src="item.replyContentFile"></m-audio>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-size: 10px;color: #1a3fd5;" @click="shibie(item.replyContentFile)">语音识别</span>
              </van-collapse-item>
            </van-collapse>
          </div>
        </template>
      </van-panel>
      <div style="width: 100%; height: 30px;"></div>
    </div>
    <x-button type="primary" style="width: 50%;" @click.native="openDialog()">提问</x-button>
    <!-- 回复面板 -->
    <div class="huifuDiv">
      <x-dialog v-model:show="dialog.show" :hide-on-blur="dialog.hideOnBlur">
        <div style="width: 100%; ">
          <group title="内容">
            <x-textarea v-model="dialog.question.content"></x-textarea>
          </group>
          <group title="录音">
            <x-button type="primary" style="width: 50%;border-radius: 10px;" v-if="!recorderStatus" @click.native="start">开始</x-button>
            <x-button type="primary" style="width: 50%;border-radius: 10px;" v-if="recorderStatus"  @click.native="stop">停止</x-button>
            <x-button type="warn" style="width: 50%;border-radius: 10px;" v-if="hasFile" @click.native="play">播放</x-button>
            <x-button type="warn" style="width: 50%;border-radius: 10px;" v-if="playStatus" @click.native="stopPlay">停止播放</x-button>
          </group>

        </div>
        <Group>
          <x-button type="primary" @click.native="addQuestion" style="border-radius: 0px;background: #FF8247;">提交</x-button>
        </Group>
      </x-dialog>
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
    <x-button type="primary" style="width: 100%; background: #EE6A50;position: fixed;bottom:45px;;border-radius: 0px;" @click.native="lastStep" v-if="userInfo.type==1">上一环节</x-button>
    <x-button type="primary" style="width: 100%; background: #EE6A50;position: fixed;bottom:0px;;border-radius: 0px;" @click.native="nextStep">下一环节</x-button>
  </div>
</template>

<script>
import { XButton, XDialog, Group, XTextarea } from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'QuestionT',
  data: function(){
    return {
      timer: null,
      questions: [],
      activeNames: [],
      dialog: {
        show: false,
        hideOnBlur: true,
        question: {}
      },
      shibieDialog: {
        show: false,
        hideOnBlur: true,
        result: []
      },
      //录音对象
      recorder: null,
      //录音状态，true表示正在录音
      recorderStatus: false,
      //播放状态
      playStatus: false,
      //是否有录制文件
      hasFile: false,
    }
  },
  props: ["replyInfoId"],
  computed: {
    ...mapGetters({active: 'replyStep', userInfo:'userInfo'}),
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
    getQuestions: function() {
      this.$http.get(this.$apiPath.GET_QUESTIONS_URL, {replyinfoId: this.replyInfoId}, response => {
        if(response.status == 200){
          this.questions = response.data.data
          this.$vux.loading.hide()
        }
      })
    },
    getWavBlob: function (){
      return this.recorder.getWAVBlob()
    },
    openDialog: function (){
      this.dialog.show = true
    },
    addQuestion: function (){
      this.$vux.loading.show({
       text: '正在发起提问...'
      })
      let replyBlob = this.getWavBlob()
      this.dialog.question.replyBlob = replyBlob
      let fd = new FormData()
      fd.append('content', this.dialog.question.content)
      fd.append('replyinfoId', this.replyInfoId)
      fd.append('userId', this.userInfo.id)
      fd.append('fileBlob', this.dialog.question.replyBlob, Date.parse(new Date())+'.wav')
      this.$http.post(this.$apiPath.ADD_QUESTION_URL, fd, response => {
        if(response.status == 200){
          let data = response.data.data
          console.log(data);
          this.$vux.loading.hide()
          if(response.data.code == 0){
            //提问成功
            this.$vux.toast.show({text: '提问成功'})
            this.dialog.show = false
          }else{
            this.$vux.toast.show({text: '提问失败！', type: 'warn'})
          }
        }
      })
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
    start: function (){
      this.recorder.start().then(()=>{
        console.log('开始录音')
        this.recorderStatus = true;
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
      this.recorderStatus = false
      this.hasFile = true
    },
    play: function (){
      console.log('播放录音');
      this.recorder.play()
      this.playStatus = true
    },
    stopPlay: function (){
      console.log('停止播放');
      this.recorder.stopPlay()
      this.playStatus = false
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
    XButton,XDialog, Group, XTextarea
  },
  created: function(){
    this.$vux.loading.show({
     text: '加载中'
    })
    //轮询问题
    this.timer = window.setInterval(() => {
      setTimeout(this.getQuestions, 0)
    }, 2000)
    this.getPermission()
  },
  destroyed: function (){
    clearInterval(this.timer)
    this.$vux.loading.hide()
  }
}

</script>

<style scoped>
.questionItemDiv{
  width: 90%;
  margin-left: 5%;
}
.huifuDiv{

}
</style>
