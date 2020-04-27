<template>
  <div id="ReadyDiv">
    <van-empty class="custom-image" image="https://img.yzcdn.cn/vant/custom-empty-image.png" >
      <div style="width: 100%;text-align: center;" slot="description">
        <span>请确认您已做好充分准备，点击下方按钮开始进入答辩演示环节</span>
      </div>
    </van-empty>
    <x-button type="primary" style="width: 60%; border-radius: 30px;" @click.native="nextStep">进入演示环节</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Ready',
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
