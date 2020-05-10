<template>
  <div id="OverDiv">
    <van-empty class="custom-image" image="https://img.yzcdn.cn/vant/custom-empty-image.png" >
      <div style="width: 100%;text-align: center;" slot="description">
        <span>请点击下方按钮结束本次答辩</span>
      </div>
    </van-empty>
    <x-button type="primary" style="width: 60%; border-radius: 30px;" @click.native="over">结束答辩</x-button>
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
  props: ["replyInfoId"],
  computed: {
    ...mapGetters({active: 'replyStep', userInfo: 'userInfo'})
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
    },
    //结束答辩
    over: function (){
      if(this.userInfo.type == 0){
        this.$http.get(this.$apiPath.UPDATE_REPLYINFO_URL, {id: this.replyInfoId, status: 2}, response => {
          if(response.status == 200){
            if(response.data.code == 0){
              this.$vux.toast.show({text: '答辩已结束'})
              this.$router.go(-1)
              this.setReplyStep(0)
            }else{
              this.$vux.toast.show({text: response.data.msg, type: 'warn'})
            }
          }
        })
      }else{
        this.$router.go(-1)
        this.setReplyStep(0)
      }
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
