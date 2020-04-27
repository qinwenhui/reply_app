<template>
  <div id="QuestionDiv">
    <span>提问</span>
  </div>
</template>

<script>
import { XButton } from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Question',
  data: function(){
    return {
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
    }
  },
  components: {
    XButton
  },
  created: function(){

  }
}

</script>

<style scoped>

</style>
