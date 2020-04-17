<template>
  <div id="HomeHeaderDiv">
    <XHeader v-bind:left-options="options" :title="title"></XHeader>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  name: 'HomeHeader',
  props: [
    "title"
  ],
  data: function(){
    return {
      options: {
        showBack: false
      }
    }
  },
  methods: {

  },
  components: {
    XHeader
  },
  created: function(){

  }
}

</script>

<style>

</style>
