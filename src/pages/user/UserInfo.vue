<template>
  <div id="UserInfoDiv">
    <component is="Header" title="个人资料" back="true"></component>
    <div v-if="userInfo">
      <group title="我的信息">
        <cell title="头像" is-link>
          <img :src="userInfo.icon" style="width: 50px; height: 50px;">
        </cell>
        <cell title="账号">{{userInfo.username}}</cell>
        <cell title="姓名" @click.native="showModifyDialog('姓名', 'name')" is-link>{{userInfo.name}}</cell>
        <cell title="手机" @click.native="showModifyDialog('手机', 'mobilePhone')" is-link>{{userInfo.mobilePhone}}</cell>
        <cell title="邮箱" @click.native="showModifyDialog('邮箱', 'email')" is-link>{{userInfo.email}}</cell>
        <cell title="类型">{{userInfo.type==0?'学生': '老师'}}</cell>
        <cell title="修改密码" @click.native="showModifyDialog('密码', 'password')" is-link></cell>
      </group>

    </div>

    <!-- 修改信息弹出框 -->
    <div class="modifyeDiv">
      <x-dialog v-model:show="dialog.show" :hide-on-blur="dialog.hideOnBlur">
        <div style="width: 100%; ">
          <group :title="dialog.option.title">
            <x-textarea v-model="dialog.option.content"></x-textarea>
            <x-button type="primary" style="width: 80%;border-radius: 10px;" @click.native="submitModifyInfo">修改</x-button>
          </group>
        </div>
        <div style="height: 20px;"></div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import Header from '@/components/HomeHeader'
import { Group, Cell , XButton, XDialog, XTextarea} from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'UserInfo',
  data: function(){
    return {
      userInfo: null,
      dialog: {
        show: false,
        hideOnBlur: true,
        option: {
          title: '',
          content: '',
          flag: '',
        }
      }
    }
  },
  computed: {
    ...mapGetters({replyStep: 'replyStep'}),

  },
  watch: {

  },
  methods: {
    getUserInfo: function (){
      this.$http.get(this.$apiPath.GET_USER_URL, {}, response => {
        if(response.status == 200){
          if(response.data.code == 0){
            //获取用户信息成功
            this.userInfo = response.data.data
          }
        }
      })
    },
    showModifyDialog: function (title, flag){
      this.dialog.option.title = title
      this.dialog.option.flag = flag
      this.dialog.option.content = ''
      this.dialog.show = true
    },
    //提交修改
    submitModifyInfo: function (){
      let flag = this.dialog.option.flag
      let content = this.dialog.option.content
      let param = {}
      switch (flag) {
        case 'name':
          param.name = content
          break;
        case 'mobilePhone':
          param.mobilePhone = content
          break;
        case 'email':
          param.email = content
          break;
        case 'password':
          param.password = content
          break;
      }

      this.$http.post(this.$apiPath.UPDATE_CURRENT_USER_URL, param, response => {
        if(response.status == 200){
          if(response.data.code == 0){
            //修改用户信息成功
            this.$vux.toast.show({text: response.data.msg})
            this.getUserInfo()
            this.dialog.show = false
          }else{
            this.$vux.toast.show({text: response.data.msg, type: 'warn'})
          }
        }
      })
    },

  },
  components: {
    Header, XButton, Group, Cell, XDialog, XTextarea
  },
  created: function(){
    this.getUserInfo()
  }
}

</script>

<style scoped>

</style>
