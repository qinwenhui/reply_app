<template>
  <div id="FeedbackDiv">
    <component is="Header" title="反馈" back="true"></component>
    <div class="fromDiv">
      <group title="您的问题或建议">
        <x-textarea v-model="feedback.content" :rows="8"></x-textarea>
      </group>
      <br><br><br><br>
      <x-button type="primary" @click.native="submit" style="width: 90%;">提交</x-button>
    </div>
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
import { XInput, Group, XButton, XTextarea } from 'vux'
export default {
  name: 'Feedback',
  data: function(){
    return {
      feedback: {
        content: ''
      },
    }
  },
  methods: {
    submit: function (){
      this.$http.post(this.$apiPath.SUBMIT_FEEDBACK_URL, {content: this.feedback.content}, response => {
        if(response.status == 200){
          if(response.data.code == 0){
            //反馈成功
            this.$vux.toast.show({text: response.data.msg})
          }else{
            this.$vux.toast.show({text: response.data.msg, type: 'warn'})
          }
        }
      })
    }
  },
  components: {
    Header, XInput, Group, XButton, XTextarea
  },
  created: function(){

  },
  destroyed: function(){

  }
}

</script>

<style scoped>
.buttonDiv{
  margin-top: 20px;
  padding-left:20px;
  padding-right:20px;
}
</style>
