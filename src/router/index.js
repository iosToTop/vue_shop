import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Permissions from '@/components/permissions/permissions'
import Roles from '@/components/permissions/Roles'

Vue.use(Router)

export default new Router({
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
          name: 'permissions',
          path: 'permissions',
          component: Permissions
        },
        {
          name: 'roles',
          path: 'roles',
          component: Roles
        }
      ]
    }
  ]
})
