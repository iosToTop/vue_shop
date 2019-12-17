<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,i) in prefixPathName" :to="prefixToList(i)" :key="i">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'hh-bread',
  /**
   * param1:面包屑路径名数组 , 分割.
   * param2:路径name索引 , 分割
   */
  props: ['pathNameList', 'toList'],
  computed: {
    prefixPathName() {
      const nameList = this.pathNameList.split(',')
      return nameList
    }
  },
  methods: {
    prefixToList(index) {
      if (this.toList === '' || this.toList === undefined) {
        return null
      }
      const toList = this.toList.split(',')
      if (index <= toList.length - 1) {
        return { name: toList[index] }
      } else {
        return null
      }
    }
  }
}
</script>
