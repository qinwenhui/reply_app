<template>
  <div id="ReplyDiv">
    <component is="Header" title="答辩"></component>
    <group>
      <cell title="title" value="value"></cell>
    </group>
    token：{{token}}<br>
    设置token：<input type="text" v-model:value="tokenStr">
    <br>
    <button type="button" @click="setToken(tokenStr)">设置token到store</button>
    <br><br>
    用户信息：{{user}}
    <br>
    <button type="button" @click="setUserInfo(user)">设置user到store</button>
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
      user: null,
      tokenStr: ''
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
    this.$http.get('user/test',{'a':1,'b':2}, response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data)
        this.user = response.data
      } else {
        console.log(response.message)//请求失败，response为失败信息
      }
    })
  }
}

</script>

<style>

</style>
