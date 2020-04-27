<template>
  <div id="OverDiv">
    <span>结束</span>
  </div>
</template>

<script>
import { XButton } from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Over',
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
    replyOver: function (){
      console.log('答辩结束');
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
