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
        <el-menu unique-opened router>
          <el-submenu
            v-for="submenus in leftItem"
            :index="''+submenus.order"
            :key="submenus.authName"
          >
            <template slot="title">
              <i :class="submenus.icon"></i>
              {{submenus.authName}}
            </template>
            <el-menu-item
              v-for="(item, subIndex) in submenus.children"
              :index="item.path"
              :key="subIndex"
            >
              <i :class="item.icon"></i>
              {{item.authName}}
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
  created() {
    this.getLeftMenus()
  },
  data() {
    return {
      leftItem: [
        {
          authName: '用户管理123',
          icon: 'el-icon-user-solid',
          children: [
            { authName: '用户列表', icon: 'el-icon-price-tag', path: 'users' }
          ]
        },
        {
          authName: '权限管理',
          icon: 'el-icon-s-flag',
          children: [
            { authName: '角色列表', icon: 'el-icon-price-tag', path: 'roles' },
            {
              authName: '权限列表',
              icon: 'el-icon-price-tag',
              path: 'permissions'
            }
          ]
        },
        {
          authName: '商品管理',
          icon: 'el-icon-goods',
          children: [
            { authName: '商品列表', icon: 'el-icon-price-tag', path: 'shop' },
            { authName: '分类参数', icon: 'el-icon-price-tag' },
            { authName: '商品分类', icon: 'el-icon-price-tag' }
          ]
        },
        {
          authName: '订单管理',
          icon: 'el-icon-data-board',
          children: [{ authName: '订单列表', icon: 'el-icon-price-tag' }]
        },
        {
          authName: '数据统计',
          icon: 'el-icon-orange',
          children: [{ authName: '数据报表', icon: 'el-icon-price-tag' }]
        }
      ]
    }
  },
  methods: {
    async getLeftMenus() {
      const { data: res } = await this.$http('menus')
      if (res.meta.status !== 200) {
        return this.$message.error('获取导航菜单数据失败')
      }

      let x = 0
      let navArr = []
      res.data.map(resItem => {
        let item = this.leftItem[x]
        let tempChildren = [...item.children]
        Object.assign(item, resItem)
        if (resItem.children.length > 0 && tempChildren.length > 0) {
          let y = 0
          let arr = []
          tempChildren.map(item1 => {
            Object.assign(item1, resItem.children[y])
            arr.push(item1)
            y++
          })
          item.children = arr
        }
        navArr.push(item)
        x++
      })
      this.leftItem = navArr
      console.log(`结构后:`, this.leftItem)
    },
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
