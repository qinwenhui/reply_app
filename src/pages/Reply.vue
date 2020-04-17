<template>
  <div id="ReplyDiv">
    <component is="Header" title="答辩"></component>
    <group>
      <cell title="title" value="value"></cell>
    </group>
    {{token}}
    <input type="text" v-model:value="tokenStr">
    <button type="button" @click="setToken(tokenStr)">添加token</button>
    <br>
    {{userInfo}}
    <button type="button" @click="setUserInfo(user)">显示信息</button>
  </div>
</template>

<script>
//引入标题组件
import Header from '@/components/HomeHeader'
//引入VUX
import { Group, Cell } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Reply',
  data: function(){
    return {
      user: {id: 'P161713309', name: '覃文辉'},
      tokenStr: 'a'
    }
  },
  computed: {
    ...mapGetters(['userInfo','token'])
  },
  methods: {
    ...mapActions(['setUserInfo','setToken'])
  },
  components: {
    Header, Group, Cell
  },
  created: function(){
    this.$http.get('user',{'a':1,'b':2}, response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data)//请求成功，response为成功信息参数
       } else {
          console.log(response.message)//请求失败，response为失败信息
       }
    })
  }
}

</script>

<style>

</style>
