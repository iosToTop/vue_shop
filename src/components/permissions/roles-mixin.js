export default {
  created() {
    this.getRolesList()
  },
  data() {
    return {
      allData: [],
      dialogControl: {
        add: false,
        addLoading: false,
        edit: false,
        editLoading: false,
        editUser: false
      },
      treeData: [],
      propBind: {
        label: 'authName'
      },
      expandedKeys: [],
      selectKeys: [],
      currentRoleUser: '',
      addUserData: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '角色名称为6-12位字符', trigger: 'change' }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      editUserData: {
        roleName: '',
        roleDesc: ''
      },
      editRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '角色名称为6-12位字符', trigger: 'change' }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    deleteUserClick(row) {
      this.$confirm({
        title: '警告⚠️',
        content: '是否删除此角色(不可恢复)?',
        okText: '删除',
        cancelText: '取消',
        onOk: () => {
          this.postDeleteUser(row)
        }
      })
    },
    async postDeleteUser(row) {
      const { data: res } = await this.$http.delete(`roles/${row.id}`)
      if (res.meta.status !== 200) return this.$message.error(`删除 ${row.roleName} 失败,请重试`)
      this.$message.success(`删除 ${row.roleName} 成功!`)
      this.getRolesList()
    },
    addRoleClick() {
      this.dialogControl.add = true
    },
    addRoleSure() {
      this.$refs.addUserData.validate(async valid => {
        if (!valid) return
        this.dialogControl.add = false
        const { data: res } = await this.$http.post('roles', this.addUserData)
        if (res.meta.status !== 201) return this.$message.error('添加角色失败,请重试')
        this.$message.success(`添加 ${this.addUserData.roleName} 成功!`)
        this.getRolesList()
      })
    },
    editUserClick(row) {
      this.dialogControl.editUser = true
      this.editUserData = row
    },
    editUserSure() {
      this.$refs.editUserData.validate(async valid => {
        if (!valid) return
        this.dialogControl.editUser = false
        const { data: res } = await this.$http.put(`roles/${this.editUserData.id}`, this.editUserData)
        if (res.meta.status !== 200) return this.$message.error('修改失败')
        this.getRolesList()
      })
    },
    editRoleClick(row) {
      this.dialogControl.edit = true
      this.currentRoleUser = row

      if (row.roleDesc === '全部权限') {
        this.selectKeys = this.expandedKeys
        return
      }

      // 遍历取出该用户所有权限
      let arr = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arr.push(item3.id)
          })
        })
      })

      this.selectKeys = arr
    },
    async getRoleTreeData() {
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('获取权限失败')
      this.treeData = res.data
      // 获取所有权限key(id)
      let idArr = []
      res.data.forEach(item1 => {
        idArr.push(item1.id)
        item1.children.forEach(item2 => {
          idArr.push(item2.id)
          item2.children.forEach(item3 => {
            idArr.push(item3.id)
          })
        })
      })
      console.log('TreeData:', res.data)
      this.expandedKeys = idArr
    },
    async editRoleSure() {
      this.dialogControl.edit = false

      let arr1 = this.$refs.tree.getCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      console.log('1:', arr1, '\n', '2:', arr2)
      const arr = [...arr1, ...arr2]
      const { data: res } = await this.$http.post(`roles/${this.currentRoleUser.id}/rights`, { rids: arr.join(',') })
      if (res.meta.status !== 200) return this.$message.error('修改权限失败,请重试')
      this.getRolesList()
    },
    editRoleCancel() {
      this.dialogControl.edit = false
    },
    async deleteRight(row, rightId) {
      const { data: res } = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败,请重试')
      this.$message.success('删除权限成功')
      row.children = res.data
    },
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败,请重试')
      this.allData = res.data

      // 先获取所有权限列表
      this.getRoleTreeData()
    }
  }
}
