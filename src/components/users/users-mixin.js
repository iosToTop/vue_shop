export default {
  created() {
    this.getUsersData()
  },
  computed: {
    isSetWidth(index, col) {
      if (index === this.userTableData.length - 1) {
        return null
      } else {
        return col.width
      }
    }
  },
  data() {
    // 在 data() 中，且 return 之前，自定义一些校验规则
    var checkEmail = (rule, value, callback) => {
      if (
        /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value) ===
        false
      ) {
        return callback(new Error('邮箱地址不正确'))
      }
      // 校验通过
      callback()
    }

    // 校验手机号
    var checkMobile = (rule, value, callback) => {
      if (/^1\d{10}$/.test(value) === false) {
        return callback(new Error('手机号不正确'))
      }
      callback()
    }

    return {
      // 查询用户列表时候，要携带的查询参数
      queryinfo: {
        query: '', // 用户输入的搜索条件
        pagenum: 1, // 当前请求的是第几页数据
        pagesize: 2, // 每页显示几条数据
        totalnum: 0 // 总条数
      },
      // 添加用户表单校检
      addUserFormRule: {
        username: [
          {
            required: true,
            message: '请输入正确的用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '请输入3到12位字符',
            trigger: 'change'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'change'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入正确的用户密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '请输入3到12位字符',
            trigger: 'change'
          }
        ]
      },
      editUserFormRule: {
        email: [
          {
            required: true,
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'change'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'change'
          }
        ]
      },
      userTableData: [],
      // 对话框控制
      dialogControl: {
        addUserDia: false,
        editUserDia: false,
        assignUserDia: false
      },
      addUserDataForm: {
        username: '',
        email: '',
        mobile: '',
        password: ''
      },
      editUserDataForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色数据
      assignUserDataForm: {
        userRoleList: [],
        username: '',
        email: '',
        id: '',
        role_name: '',
        role_id: ''
      }
    }
  },
  methods: {
    // 确定/取消分配角色对话框
    async assignUserDiaSure() {
      const { data: res } = await this.$http.put(`users/${this.assignUserDataForm.id}/role`, {
        rid: this.assignUserDataForm.role_name
      })
      console.log(res)
      let setRoleName = ''
      this.assignUserDataForm.userRoleList.map(item => {
        if (item.id === this.assignUserDataForm.role_name) {
          setRoleName = item.roleName
        }
      })
      if (res.meta.status === 200) {
        this.$message.success(`${this.assignUserDataForm.username} 已设置为 ${setRoleName}`)
        // 刷新用户数据
        this.getUsersData()
      } else {
        this.$message.error(`设置失败,请重试`)
      }
      this.dialogControl.assignUserDia = false
    },
    assignUserDiaCancel() {
      this.dialogControl.assignUserDia = false
    },
    // 修改用户状态
    async userStatusChange(user) {
      const { data: res } = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      const turnNoti = user.mg_state === true ? '打开' : '关闭'
      if (res.meta.status === 200) {
        this.$message.success(`${turnNoti} ${user.username} 成功`)
      } else {
        this.$message.error(`${turnNoti} ${user.username} 失败`)
      }
    },
    // 立即修改
    editUserDiaSure() {
      this.$refs.editUserForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editUserDataForm.id, { email: this.editUserDataForm.email, mobile: this.editUserDataForm.mobile })
        if (res.meta.status === 200) {
          this.getUsersData()
          this.$message.success(`修改 ${this.editUserDataForm.username} 资料成功`)
        } else {
          this.$message.error(`修改 ${this.editUserDataForm.username} 资料失败,请重试`)
        }
        this.dialogControl.editUserDia = false
      })
    },
    // 取消修改
    editUserDiaCancel() {
      this.dialogControl.editUserDia = false
    },
    // 删除按钮点击
    deleteClick(user) {
      if (user.username === 'admin') {
        this.$message.error('超级管理员账户不可删除')
        return
      }
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postDeleteUser(user.id, user.username)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async postDeleteUser(userID, userName) {
      const { data: res } = await this.$http.delete('users/' + userID)
      if (res.meta.status === 200) {
        this.$message.success(`删除 ${userName} 成功!`)
        this.getUsersData()
      } else {
        this.$message.error(`删除 ${userName} 失败,请重试!`)
      }
    },
    // 编辑按钮点击
    editClick(user) {
      this.editUserDataForm = {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile
      }
      this.dialogControl.editUserDia = true
    },
    // 检查按钮点击
    checkClick(user) {
      console.log(user)
      this.getUserRoleList(user)
      this.dialogControl.assignUserDia = true
      this.assignUserDataForm = {
        username: user.username,
        id: user.id,
        role_name: user.role_name
      }
    },
    async getUserRoleList(user) {
      const { data: res } = await this.$http.get('roles')

      const roleDataList = res.data
      let userRoleId
      let roleList = []
      roleDataList.map(item => {
        if (item.roleName === user.role_name) {
          userRoleId = item.id
        }
        const roleItem = {
          id: item.id,
          roleName: item.roleName
        }
        roleList.push(roleItem)
      })
      // 使用$set设置,否则监听不到数据变化,视图不会刷新
      this.$set(this.assignUserDataForm, 'userRoleList', roleList)
      this.$set(this.assignUserDataForm, 'role_id', userRoleId)
    },
    addUserDiaCancel() {
      this.dialogControl.addUserDia = false
    },
    async addUserDiaSure() {
      this.$refs.addUserForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          'users',
          this.addUserDataForm
        )
        const { meta } = res
        if (meta.status === 201) {
          this.dialogControl.addUserDia = false
          this.$message.success('添加用户成功')
          this.addUserDataForm = {}
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    async getUsersData() {
      const { data: usersData } = await this.$http.get('users', {
        params: this.queryinfo
      })

      if (usersData.meta.status !== 200) {
        this.$message.error('获取用户列表失败,请稍候重试!')
        return
      }

      const {
        meta: { msg, status },
        data: { total, pagenum, users }
      } = usersData

      if (status !== 200) {
        this.$message.warning(msg)
      }

      this.userTableData = users
      this.queryinfo.pagenum = pagenum
      this.queryinfo.totalnum = total
    },
    addUser() {
      this.dialogControl.addUserDia = true
    },
    // 每页显示条数改变,获取数据,并且跳转到第一页显示
    sizeChange(val) {
      this.queryinfo.pagesize = val
      this.queryinfo.pagenum = 1
      this.getUsersData()
    },
    // 当前页码改变
    currentChange(val) {
      this.queryinfo.pagenum = val
      this.getUsersData()
    }
  }
}
