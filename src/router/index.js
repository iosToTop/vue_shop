import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Permissions from '@/components/permissions/permissions'
import Roles from '@/components/permissions/roles'
import Shoper from '@/components/shopManager/shop'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'rights',
          path: 'rights',
          component: Permissions
        },
        {
          name: 'roles',
          path: 'roles',
          component: Roles
        },
        {
          name: 'goods',
          path: 'goods',
          component: Shoper
        }
      ]
    }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    // 如果没有token,则让用户重新登录
    if (!token) {
      Message.warning('登录失效,请重新登录')
      router.push({ name: 'login' })
      return
    }
    next()
  }
})

export default router
