<template>
  <div>
    <el-card>
      <hh-bread pathNameList="首页,权限管理,角色列表" toList="home"></hh-bread>
      <el-button class="add-btn" @click="addRoleClick()">添加角色</el-button>

      <el-table style="width:100%;" class="my-table" :data="allData" border stripe>
        <el-table-column type="expand" width="60">
          <template slot-scope="scope">
            <!-- 共3级权限,所以分为: 1行-2列 右边大列继续放1行2列 -->
            <a-row v-for="(item,i) in scope.row.children" :key="i" :class="i!==0?'sub-col':null">
              <a-col :span="4">
                <el-tag
                  @close="deleteRight(scope.row,item.id)"
                  type="primary"
                  closable
                >{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </a-col>
              <a-col :span="20">
                <a-row v-for="(item2,i) in item.children" :key="i" :class="i!==0?'sub-row':null">
                  <a-col :span="4">
                    <template>
                      <div>
                        <el-tag
                          @close="deleteRight(scope.row,item2.id)"
                          type="success"
                          closable
                        >{{item2.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </div>
                    </template>
                  </a-col>
                  <a-col :span="20">
                    <el-tag
                      v-for="(item3,i) in item2.children"
                      @close="deleteRight(scope.row,item3.id)"
                      type="info"
                      closable
                      :key="i"
                      :class="i!==0?'three-tag':null"
                    >{{item3.authName}}</el-tag>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>

            <!-- 无权限提示 -->
            <span v-if="scope.row.children.length===0">未分配权限</span>
          </template>
        </el-table-column>

        <el-table-column type="index" label="#" width="60"></el-table-column>

        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>

        <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="editUserClick(scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteUserClick(scope.row)"
              >删除</el-button>
              <el-button
                type="info"
                size="mini"
                icon="el-icon-setting"
                @click="editRoleClick(scope.row)"
              >分配权限</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加弹窗 -->
      <!-- 添加角色弹窗 -->
      <el-dialog title="添加角色" :visible.sync="dialogControl.add" width="50%">
        <el-form :model="addUserData" ref="addUserData" label-width="80px" :rules="addRules">
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="addUserData.roleName"></el-input>
          </el-form-item>
          <el-form-item prop="roleDesc" label="角色描述">
            <el-input v-model="addUserData.roleDesc"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="dialogControl.add = false">取 消</el-button>
          <el-button type="primary" @click="addRoleSure()">添 加</el-button>
        </span>
      </el-dialog>

      <!-- 编辑角色弹窗 -->
      <el-dialog title="修改角色" :visible.sync="dialogControl.editUser" width="50%">
        <el-form :model="editUserData" ref="editUserData" label-width="80px" :rules="editRules">
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="editUserData.roleName"></el-input>
          </el-form-item>
          <el-form-item prop="roleDesc" label="角色描述">
            <el-input v-model="editUserData.roleDesc"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="dialogControl.editUser = false">取 消</el-button>
          <el-button type="primary" @click="editUserSure()">添 加</el-button>
        </span>
      </el-dialog>

      <!-- 修改权限弹窗 -->
      <a-modal
        v-if="dialogControl.edit"
        title="添加角色"
        :visible="dialogControl.edit"
        @ok="editRoleSure()"
        cancelText="取消"
        okText="添加"
        :closable="false"
        :confirmLoading="dialogControl.editLoading"
        @cancel="editRoleCancel()"
        width="50%"
      >
        <el-tree
          ref="tree"
          show-checkbox
          node-key="id"
          :data="treeData"
          :props="propBind"
          :default-checked-keys="selectKeys"
          default-expand-all
        ></el-tree>
      </a-modal>
    </el-card>
  </div>
</template>

<script>
import mixin from './roles-mixin'
export default {
  mixins: [mixin]
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .add-btn {
    margin-top: 10px;
    font-size: 12px;
    background: #048bd4;
    border: 1px solid white;
    color: whitesmoke;
  }

  .my-table {
    margin-top: 20px;

    .sub-col {
      margin-top: 10px;
    }

    .sub-row {
      margin-top: 10px;
    }

    .three-tag {
      margin: 0px 3px 5px 2px;
    }
  }
}
</style>
