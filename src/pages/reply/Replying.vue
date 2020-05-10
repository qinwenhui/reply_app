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
    <component :is="showComponentName" :replyInfoId="replyInfoId"></component>
  </div>
</template>

<script>
  //引入标题组件
import Header from '@/components/HomeHeader'
import Ready from '@/pages/reply/components/Ready'
import Speech from '@/pages/reply/components/Speech'
import Question from '@/pages/reply/components/Question'
import Score from '@/pages/reply/components/Score'
import SpeechT from '@/pages/reply/components/SpeechT'
import QuestionT from '@/pages/reply/components/QuestionT'
import ScoreT from '@/pages/reply/components/ScoreT'
import Over from '@/pages/reply/components/Over'
import { Group, GroupTitle, XButton } from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Replying',
  data: function(){
    return {
      loading: false,
      showComponentName: 'Ready',
      replyInfoId: null,
    }
  },
  computed: {
    ...mapGetters({replyStep: 'replyStep', userInfo: 'userInfo'}),
    active: function (){
      switch (this.replyStep) {
        case 0:
          this.showComponentName = 'Ready'
          break;
        case 1:
          //判断是老师还是学生
          this.showComponentName = this.userInfo.type==0?'Speech':'SpeechT'
          break;
        case 2:
          this.showComponentName = this.userInfo.type==0?'Question':'QuestionT'
          break;
        case 3:
          this.showComponentName = this.userInfo.type==0?'Score':'ScoreT'
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
    Header, Ready, Speech, Question, Score, Over, XButton, Group, GroupTitle, SpeechT, QuestionT, ScoreT
  },
  created: function(){
    this.replyInfoId = this.$route.params.id
  }
}

</script>

<style scoped>

</style>
