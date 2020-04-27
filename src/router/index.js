import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
import Login from '@/pages/user/Login'
import Register from '@/pages/user/Register'
import Feedback from '@/pages/user/Feedback'
import ReplyInfo from '@/pages/reply/ReplyInfo'
import Replying from '@/pages/reply/Replying'

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
      path: '/reply/replying',
      name: 'Replying',
      component: Replying
    }
  ]
})
