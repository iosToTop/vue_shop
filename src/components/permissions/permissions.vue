<template>
  <el-card class="cardContainer">
    <hh-bread pathNameList="首页,权限管理,权限列表" toList="home"></hh-bread>

    <el-table class="my-table" :data="allData" border stripe>
      <el-table-column type="index" label="#" width="60"></el-table-column>

      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>

      <el-table-column prop="path" label="路径" width="200"></el-table-column>

      <el-table-column label="权限等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level==='0'">一级</el-tag>
          <el-tag type="warning" v-else-if="scope.row.level==='1'">二级</el-tag>
          <el-tag type="danger" v-else>三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import mixin from './permissions-mixin.js'

export default {
  mixins: [mixin]
}
</script>

<style scoped lang="scss">
.cardContainer {
  height: 100vh;
  padding: 0;
  margin: 0;

  .my-table {
    margin-top: 20px;
    overflow: auto;
    max-height: 600px;
  }
}
</style>
