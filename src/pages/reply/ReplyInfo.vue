<template>
  <div id="ReplyInfoDiv">
    <component is="Header" title="我的答辩" back="true"></component>
    <div class="replyInfoPanel" v-if="loading && loadGroupStatus">
      <div style="width: 100%;padding: 20px 0 20px 0;background: #1af31e;text-align: center;border-radius: 0 0 20px 20px;">
        <span style="color: #3faa4f;">{{replyInfo.title}}</span>
      </div>

      <group title="答辩信息">
        <div style="width: 90%;padding: 5px 0 10px 0;margin-left: 5%;text-align: center;border-radius: 5px;">
            <img :src="replyInfo.user.icon" width="80px" height="80px" style="box-shadow: 0 0 5px 0;">
            <nav>
              <ul>
                <li>{{replyInfo.user.name}}</li>
                <li>{{replyInfo.user.class.name}}</li>
                <li style="color: red;">答辩{{replyInfo.status}}</li>
              </ul>
            </nav>
        </div>

        <div>
          <van-collapse v-model="activeNames">
            <van-collapse-item title="更多答辩信息" name="1">
              <cell-form-preview :list="list"></cell-form-preview>
            </van-collapse-item>
          </van-collapse>
        </div>
      </group>
      <van-sticky :offset-top="35">
      <div style="background: #fff;">
      <!-- 答辩老师列表 -->
      <group-title>答辩组老师</group-title>
      <scroller lock-y>
        <div class="box1">
          <div class="box1-item" v-for="teacher in teacherList">
            <div class="imgDiv">
              <img :src="teacher.icon" width="70px" height="70px">
              <br>
              <span>{{teacher.name}}</span>
            </div>
          </div>
        </div>
      </scroller>
      <div style="width: 100%;height: 1px;background: #efefef;margin-top: 5px;"></div>

      <!-- 组内其他答辩 -->
      <group-title>其他学生答辩</group-title>
      </div>
      </van-sticky>
      <div>
        <panel :list="otherReplyList" :type="'2'" style="padding-top: 0px;padding-bottom: 0px;"></panel>
      </div><div style="width: 100%;height: 70px;text-align:center;">
        <span style="font-size: 10px;color: #abcabc;">-------------------------我是有底线的-------------------------</span>
      </div>
    </div>

    <!-- 底部开始答辩按钮 -->
    <div style="width: 100%;height: 45px;position: fixed;bottom: -1px;" @click="goReplying">
      <x-button type="primary" style="border-radius: 0px;" >开始答辩</x-button>
    </div>
  </div>
</template>

<script>
  //引入标题组件
import Header from '@/components/HomeHeader'
import { Group, GroupTitle, CellFormPreview, Scroller, XButton, Panel } from 'vux'

export default {
  name: 'ReplyInfo',
  data: function(){
    return {
      loading: false,
      loadGroupStatus: false,
      replyInfo: {},
      activeNames: [],
      list: [{
        label: '答辩时间',
        value: ''
      }, {
        label: '答辩地址',
        value: ''
      }, {
        label: '答辩分数',
        value: ''
      }, {
        label: '备注',
        value: ''
      }],
      teacherList: [
        {
          name: '李老师（组长）',
          icon: 'http://img2.imgtn.bdimg.com/it/u=1578150248,3598916668&fm=26&gp=0.jpg'
        },
        {
          name: '赵老师',
          icon: 'http://file02.16sucai.com/d/file/2014/1006/e94e4f70870be76a018dff428306c5a3.jpg'
        },
        {
          name: '张老师',
          icon: 'http://img2.imgtn.bdimg.com/it/u=1540607481,1840643171&fm=26&gp=0.jpg'
        },
        {
          name: '王老师',
          icon: 'http://b.hiphotos.baidu.com/zhidao/pic/item/a044ad345982b2b7c97958d033adcbef76099b3b.jpg'
        }
      ],
      otherReplyList: [{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '李晓',
        desc: '基于WEB的毕业设计选题系统开发',
        url: ''
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '王大锤',
        desc: '基于Android的二手书城的设计与实现',
        url: '/component/cell'
      },{
        title: '李晓',
        desc: '基于WEB的毕业设计选题系统开发',
        url: ''
      }]
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
    }
  },
  methods: {
    //获取当前用户答辩信息
    getCurrentUserReplyInfo: function (){
      this.$http.get(this.$apiPath.REPLY_INFO_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyInfo = response.data.data
            console.log('获取答辩信息成功');
            //执行获取用户班级h和答辩组信息的函数
            this.getUserClass()
            this.getUserReplyGroup()
            this.setReplyinfoStatus()
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //获取用户班级
    getUserClass: function (){
      this.$http.get(this.$apiPath.GET_USER_CLASS_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyInfo.user.class = response.data.data
            console.log('获取班级信息成功');
            this.loading = true
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //获取用户答辩组
    getUserReplyGroup: function (){
      this.$http.get(this.$apiPath.GET_USER_REPLYGROUP_URL, {}, (response) => {
        if(response.status == 200){
          if(response.data.code == 0){
            this.replyInfo.replyGroup = response.data.data
            console.log('获取答辩组成功');
            this.setReplyDetail()
          }else{
            this.$vux.toast.show({ text: response.data.msg, position: 'middle', type: 'warn', time: 1000 })
          }
        }else{
          this.$vux.toast.show({ text: '获取失败', position: 'middle', type: 'warn', time: 1000 })
        }
      })
    },
    //根据status设置状态名称
    setReplyinfoStatus: function (){
      switch (this.replyInfo.status) {
        case 0:
          this.replyInfo.status = '未开始'
          break;
        case 1:
          this.replyInfo.status = '正在进行'
          break;
        case 2:
          this.replyInfo.status = '已结束'
          break;

      }
      if(this.replyInfo.scoreStatus == 0){
        this.replyInfo.score = '未公布'
      }
      switch (this.replyInfo.speechStatus) {
        case 0:
          this.replyInfo.speechStatus = '未开始'
          break;
        case 1:
          this.replyInfo.speechStatus = '正在进行'
          break;
        case 2:
          this.replyInfo.speechStatus = '已结束'
          break;
      }
    },
    //设置答辩详情信息
    setReplyDetail: function (){
      this.list[0].value = this.$moment(this.replyInfo.replyTime).format('YYYY-MM-DD: HH:mm:ss')
      this.list[1].value = this.replyInfo.replyGroup.address
      this.list[2].value = this.replyInfo.score
      this.list[3].value = this.replyInfo.describe
      console.log(this.list);
      this.loadGroupStatus = true
      console.log('成绩详情'+this.loadGroupStatus)
    },
    //点击开始答辩
    goReplying: function (){
      console.log("点击开始答辩")
      //判断答辩的状态
      if(this.replyInfo.status == '未开始'){
        this.$vux.toast.show({
          type: 'warn',
          time: 2000,
          text: '您的答辩尚未开始'
        })
        return false
      }
      if(this.replyInfo.status == '已结束'){
        this.$vux.toast.show({
          type: 'warn',
          text: '您的答辩已结束'
        })
        return false
      }
      //可以进行答辩,跳转到答辩过程页面
      console.log(this.replyInfo.id);
      this.$router.push({path: '/reply/replying', name:'Replying', params: {id: this.replyInfo.id} })

    }
  },
  components: {
    Header, GroupTitle, Group, CellFormPreview, Scroller, XButton, Panel
  },
  created: function(){
    //提示用户正在加载数据
    this.$vux.loading.show({
     text: '加载中'
    })
    //执行获取用户答辩信息的函数
    this.getCurrentUserReplyInfo()
  }
}

</script>

<style scoped>
.replyInfoPanel{
  width: 100%;
  height: 300px;
}
ul{
margin:0px;
padding:0;
}
ul li{
list-style-type:none;
color: #00B2EE;
}
.box1 {
  height: 100px;
  position: relative;
  width: 500px;
}
.box1-item {
  width: 100px;
  height: 100px;
  margin-left: 15px;
  float: left;
  text-align: center;
}
.box1-item span {
  font-size: 10px;
  color: #666;
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.imgDiv{
  width: 100%;
  height: 70%;
  padding-top: 5px;
}
.imgDiv img{
  border-radius: 100%;
  box-shadow: 0px 0px 2px 0px;
}
</style>
