<template>
  <div id="ReplyDiv">
    <component is="Header" title="答辩"></component>
    <group>
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
//引入VUX
import { Group, Cell } from 'vux'
export default {
  name: 'Reply',
  data: function(){
    return {

    }
  },
  methods: {

  },
  components: {
    Header, Group, Cell
  },
  created: function(){

  }
}

</script>

<style>

</style>
