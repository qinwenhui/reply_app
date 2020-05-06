<template>
  <div id="QuestionDiv">
    <div class="" v-if="questions.length > 0">
      <m-audio :src="questions[0].contentFile"></m-audio>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Question',
  data: function(){
    return {
      timer: null,
      questions: [],
    }
  },
  props: ["replyInfoId"],
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
    getQuestions: function() {
      this.$http.get(this.$apiPath.GET_QUESTIONS_URL, {replyInfoId: this.replyInfoId}, response => {
        if(response.status == 200){
          this.questions = response.data.data
        }
      })
    }
  },
  components: {
    XButton
  },
  created: function(){
    //轮询问题
    this.timer = window.setInterval(() => {
      setTimeout(this.getQuestions, 0)
    }, 2000)
  },
  destroyed: function (){
    clearInterval(this.timer)
  }
}

</script>

<style scoped>

</style>
