<template>
  <el-card class="cardContainer">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <div class="input-div">
      <el-input
        clearable
        class="input"
        placeholder="请输入内容"
        v-model="queryinfo.query"
        @clear="getUsersData()"
      >
        <el-button slot="append" icon="el-icon-search" @click="getUsersData()"></el-button>
      </el-input>

      <el-button type="success" @click="addUser()">添加用户</el-button>
    </div>

    <!-- 表格 -->
    <el-table max-height="420px" class="user-table" :data="userTableData" style="width: 100%;">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column label="姓名" prop="username" width="120"></el-table-column>
      <el-table-column label="邮箱" prop="email" width="120"></el-table-column>
      <el-table-column label="电话" prop="mobile" width="120"></el-table-column>
      <el-table-column label="创建日期">
        <!-- 需要使用数据,用template包裹 -->
        <!-- slot-scope设置后会自动找到最外层数据源 -->
        <!-- 此时scope就是userTableData,scope.row就是数组的每一个元素 -->
        <template slot-scope="scope">{{scope.row.create_time | formatDate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="100">
        <!-- 组件内容中使用其他组件用template包裹 -->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- plain朴素按钮 size大小 circle圆角 -->
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editClick(scope.row)"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteClick(scope.row)"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="success"
            icon="el-icon-check"
            circle
            @click="checkClick(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="page-v"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="queryinfo.pagenum"
      :page-sizes="[2, 4, 6, 10]"
      :page-size="queryinfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryinfo.totalnum"
      background
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogControl.addUserDia" width="40%">
      <el-form
        ref="addUserForm"
        :rules="addUserFormRule"
        :model="addUserDataForm"
        label-width="80px"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="addUserDataForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="addUserDataForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="addUserDataForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话">
          <el-input v-model="addUserDataForm.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="addUserDiaSure()">立即添加</el-button>
          <el-button size="medium" @click="addUserDiaCancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="修改资料" :visible.sync="dialogControl.editUserDia" width="40%">
      <el-form
        ref="editUserForm"
        :rules="editUserFormRule"
        :model="editUserDataForm"
        label-width="80px"
      >
        <el-form-item prop="username" label="用户名">
          <el-input disabled v-model="editUserDataForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="editUserDataForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话">
          <el-input v-model="editUserDataForm.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="editUserDiaSure()">立即修改</el-button>
          <el-button size="medium" @click="editUserDiaCancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import mixin from './users-mixin'

export default {
  mixins: [mixin]
}
</script>

<style scoped lang='scss'>
.cardContainer {
  height: 100vh;
  padding: 0;
  margin: 0;
  .input-div {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  .input {
    width: 200px;
    margin-right: 20px;
  }
  .search-row {
    margin-top: 20px;
  }
  .user-table {
    margin-top: 20px;
    text-align: center;
    height: 100%;

    :first-child {
      text-align: center;
    }
  }
  .page-v {
    margin-top: 20px;
  }
}
</style>
