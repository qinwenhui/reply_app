import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
import Login from '@/pages/user/Login'
import Register from '@/pages/user/Register'
import Feedback from '@/pages/user/Feedback'
import UserInfo from '@/pages/user/UserInfo'
import ReplyInfo from '@/pages/reply/ReplyInfo'
import ReplyGroupInfo from '@/pages/reply/ReplyGroupInfo'
import Replying from '@/pages/reply/Replying'
import SendMessage from '@/pages/message/SendMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/reply/replyInfo',
      name: 'ReplyInfo',
      component: ReplyInfo
    },
    {
      path: '/reply/replyGroupInfo',
      name: 'ReplyGroupInfo',
      component: ReplyGroupInfo
    },
    {
      path: '/reply/replying/:id',
      name: 'Replying',
      component: Replying
    },
    {
      path: '/message/sendMessage/:receiverId',
      name: 'SendMessage',
      component: SendMessage
    },
    {
      path: '/user/userInfo',
      name: 'UserInfo',
      component: UserInfo
    }
  ]
})
