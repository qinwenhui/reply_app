<template>
  <div id="MessageDiv">
    <component is="Header" title="消息"></component>
    消息
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
export default {
  name: 'Message',
  data: function(){
    return {

    }
  },
  methods: {

  },
  components: {
    Header
  },
  created: function(){

  }
}

</script>

<style>

</style>
