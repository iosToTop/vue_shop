<template>
  <el-container class="container">
    <el-header height="60px" class="header">
      <el-row class="header-row" type="flex">
        <el-col>
          <img src="@/assets/image/logo.png" alt="无法显示" height="48px" />
        </el-col>
        <el-col>
          <h3>电商后台管理</h3>
        </el-col>
        <el-col>
          <el-button type="primary" @click="exitHome">退出</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="20%" class="leftNav">
        <el-menu :unique-opened="true" :router="true">
          <el-submenu
            v-for="(submenus, index) in leftItem"
            :index="String(index + 1)"
            :key="submenus.title"
          >
            <template slot="title">
              <i :class="submenus.icon"></i>
              {{submenus.title}}
            </template>
            <el-menu-item
              v-for="(item, subIndex) in submenus.sub"
              :index="item.name"
              :key="subIndex"
            >
              <i :class="item.icon"></i>
              {{item.title}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="show">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 渲染组件前,判断是否有保存的token
  beforeCreate() {
    const token = localStorage.getItem('token')
    // 如果没有token,则让用户重新登录
    if (!token) {
      this.$router.push({ name: 'login' })
    }
  },
  data() {
    return {
      leftItem: [
        {
          title: '用户管理',
          icon: 'el-icon-user-solid',
          sub: [{ title: '用户列表', icon: 'el-icon-price-tag', name: 'users' }]
        },
        {
          title: '权限管理',
          icon: 'el-icon-s-flag',
          sub: [
            { title: '用户列表', icon: 'el-icon-price-tag' },
            { title: '角色列表', icon: 'el-icon-price-tag' },
            {
              title: '权限列表',
              icon: 'el-icon-price-tag',
              name: 'permissions'
            }
          ]
        },
        {
          title: '商品管理',
          icon: 'el-icon-goods',
          sub: [
            { title: '商品列表', icon: 'el-icon-price-tag' },
            { title: '分类参数', icon: 'el-icon-price-tag' },
            { title: '商品分类', icon: 'el-icon-price-tag' }
          ]
        },
        {
          title: '订单管理',
          icon: 'el-icon-data-board',
          sub: [{ title: '订单列表', icon: 'el-icon-price-tag' }]
        },
        {
          title: '数据统计',
          icon: 'el-icon-orange',
          sub: [{ title: '数据报表', icon: 'el-icon-price-tag' }]
        }
      ]
    }
  },
  methods: {
    exitHome() {
      // clear token
      localStorage.clear()
      // noti msg
      this.$message.success('退出成功')
      // navi
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>
.container {
  height: 100vh;
  padding: 0;
  margin: 0;
}
.header {
  margin: 0;
  padding: 0;
  background-color: #655f98;
}
.header-row {
  height: 100%;
  align-items: center;
}
.el-col:nth-child(1) {
  margin-left: 10px;
}
.el-col:nth-child(1) img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-col:nth-child(2) {
  text-align: center;
  color: white;
  font-size: 16px;
}
.el-col:nth-child(3) {
  margin-right: 15px;
  text-align: right;
}
.show {
  background-color: #e0e0e0;
}
</style>
