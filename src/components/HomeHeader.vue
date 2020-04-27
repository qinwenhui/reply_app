<template>
  <div id="HomeHeaderDiv">
    <XHeader v-bind:left-options="options" :title="title" class="header"></XHeader>
    <div class="br"></div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  name: 'HomeHeader',
  props: [
    "title", "back"
  ],
  data: function(){
    return {
      options: {
        showBack: this.back,
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

<style scoped>
.header{
  position: fixed;
  width: 100%;
  z-index:999;
}
.br{
  width: 100%;
  height: 46px;
}
</style>
