<template>
  <div id="ScoreDiv">
    <group title="评分状态"></group>
    <div v-for="item in scoreList">
      <div style="width: 100%;">
        <span style="color:red;">{{item.teacher.name}}&nbsp;&nbsp;</span>
        <spa>演讲: {{item.speechScore}}分</spa>
        <spa>论文: {{item.speechScore}}分</spa>
        <spa>回答: {{item.speechScore}}分</spa>
      </div>
      <div style="height: 20px;"></div>
    </div>

    <group title="老师评分">
      <x-input title="演讲得分:" v-model="score.speechScore"></x-input>
      <x-input title="论文得分:" v-model="score.thesisScore"></x-input>
      <x-input title="提问回答得分:" v-model="score.questionScore"></x-input>
    </group>
    <br><br>
    <x-button type="primary" style="width: 80%;" @click.native="submitScore">提交</x-button>
    <x-button type="primary" style="width: 100%; background: #EE6A50;position: fixed;bottom:45px;;border-radius: 0px;" @click.native="lastStep" v-if="userInfo.type==1">上一环节</x-button>
    <x-button type="primary" style="width: 100%; background: #EE6A50;position: fixed;bottom:0px;;border-radius: 0px;" @click.native="nextStep">下一环节</x-button>
  </div>
</template>

<script>
import { XButton, Group, XInput } from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'ScoreT',
  data: function(){
    return {
      timer: null,
      score: {
        speechScore: '',
        thesisScore: '',
        questionScore: '',
      },
      scoreList: []
    }
  },
  props: ["replyInfoId"],
  computed: {
    ...mapGetters({active: 'replyStep', userInfo: 'userInfo'})
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
    //遍历获取成绩
    getScores: function (){
      this.$http.get(this.$apiPath.GET_SCORE_BY_REPLYINFO_SCORE_URL, {replyinfoId: this.replyInfoId}, response => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.scoreList = response.data.data
            console.log(this.scoreList);
          }else{
            this.$vux.toast.show({text: response.data.msg+":"+response.data.data.err_msg, type: 'warn'})
          }
        }
        this.$vux.loading.hide()
      })
    },
    submitScore: function (){
      this.score.userId = this.userInfo.id
      this.score.replyinfoId = this.replyInfoId
      this.$http.post(this.$apiPath.ADD_SCORE_URL, this.score, response => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.$vux.toast.show({text: response.data.msg})
          }else{
            this.$vux.toast.show({text: response.data.msg+":"+response.data.data.err_msg, type: 'warn'})
          }
        }
        this.$vux.loading.hide()
      })
    }
  },
  components: {
    XButton, Group, XInput
  },
  created: function(){
    //轮询问题
    this.timer = window.setInterval(() => {
      setTimeout(this.getScores, 0)
    }, 2000)
  },
  destroyed: function (){
    clearInterval(this.timer)
  }
}

</script>

<style scoped>

</style>
