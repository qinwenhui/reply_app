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

    <x-button type="primary" style="width: 100%; background: #EE6A50;position: fixed;bottom:0px;;border-radius: 0px;" @click.native="nextStep">下一环节</x-button>
  </div>
</template>

<script>
import { XButton , Group} from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Score',
  data: function(){
    return {
      timer: null,
      scoreList: []
    }
  },
  computed: {
    ...mapGetters({active: 'replyStep'})
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
    }
  },
  components: {
    XButton, Group
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
