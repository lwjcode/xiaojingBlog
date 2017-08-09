import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import login from '@/components/login'
import list from '@/components/bloglist'
import blog from '@/components/blog'
import writeblog from '@/components/writeblog'
import usercenter from '@/components/usercenter'
import myblog from '@/components/myblog'
import mymess from '@/components/mymess'
import messlist from '@/components/message'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/',
      name: 'login',
      component: login
    },{
    	path: '/list',
    	name: 'list',
    	component: list
    },{
      path: '/blog/:id',
      name: 'blog',
      component: blog
    },{
      path: '/writeblog',
      name: 'writeblog',
      component: writeblog
    },{
      path: '/usercenter',
      name: 'usercenter',
      component: usercenter
    },{
      path: '/myblog/:id',
      name: 'myblog',
      component: myblog
    },{
      path: '/mymess',
      name: 'mymess',
      component: mymess
    },{
      path: '/messlist',
      name: 'messlist',
      component: messlist
    }
  ]
})
