<template>
  <div id="ReplyDiv">
    <component is="Header" title="答辩"></component>
    {{user}}
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
//引入VUX
import { Group, Cell } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'Reply',
  data: function(){
    return {

    }
  },
  computed: {
    ...mapGetters({user:'userInfo'})
  },
  methods: {

  },
  components: {
    Header, Group, Cell
  },
  created: function(){
    if(this.user == null){
      //暂未登录
      console.log('答辩页面提示：暂未登录')
    }
  }
}

</script>

<style>

</style>
