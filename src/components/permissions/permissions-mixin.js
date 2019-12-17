export default {
  created() {
    this.getPermissionsData()
  },
  data() {
    return {
      /**
       *  authName: "商品管理"
          id: 101
          level: "0"
          path: "goods"
          pid: 0
      */
      allData: []
    }
  },
  methods: {
    // 获取权限列表数据
    async getPermissionsData() {
      console.log('dwadwjankjn!')
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        this.$message.error('获取权限列表失败,请稍候重试')
      } else {
        this.allData = res.data
      }
    }
  }
}
