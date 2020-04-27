<template>
  <div id="ReplyingDiv">
    <component is="Header" title="正在答辩" back="true"></component>
    <div>
      <van-steps :active="active" active-color="#9B30FF">
        <van-step>准备</van-step>
        <van-step>演示</van-step>
        <van-step>提问</van-step>
        <van-step>评分</van-step>
        <van-step>结束</van-step>
      </van-steps>
    </div>
    <!-- 每个环节显示的组件 -->
    <component :is="showComponentName"></component>
  </div>
</template>

<script>
  //引入标题组件
import Header from '@/components/HomeHeader'
import Ready from '@/pages/reply/components/Ready'
import Speech from '@/pages/reply/components/Speech'
import Question from '@/pages/reply/components/Question'
import Score from '@/pages/reply/components/Score'
import Over from '@/pages/reply/components/Over'
import { Group, GroupTitle, XButton } from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Replying',
  data: function(){
    return {
      loading: false,
      showComponentName: 'Ready'
    }
  },
  computed: {
    ...mapGetters({replyStep: 'replyStep'}),
    active: function (){
      switch (this.replyStep) {
        case 0:
          this.showComponentName = 'Ready'
          break;
        case 1:
          this.showComponentName = 'Speech'
          break;
        case 2:
          this.showComponentName = 'Question'
          break;
        case 3:
          this.showComponentName = 'Score'
          break;
        case 4:
          this.showComponentName = 'Over'
          break;
      }
      return this.replyStep
    }
  },
  watch: {
    loading: function(val, oldVal){
      console.log(val);
      if(val){
        this.$vux.loading.hide()
      }else{
        this.$vux.loading.show({
         text: '加载中'
        })
      }
    },
  },
  methods: {

  },
  components: {
    Header, Ready, Speech, Question, Score, Over, XButton, Group, GroupTitle
  },
  created: function(){

  }
}

</script>

<style scoped>

</style>
