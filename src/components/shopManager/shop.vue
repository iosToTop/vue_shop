<template>
  <div>
    <a-row>
      <a-col :span="12">col-12</a-col>
      <a-col :span="12">col-12</a-col>
    </a-row>
    <a-row>
      <a-col :span="8">col-8</a-col>
      <a-col :span="8">col-8</a-col>
      <a-col :span="8">col-8</a-col>
    </a-row>
    <a-row>
      <a-col :span="6">col-6</a-col>
      <a-col :span="6">col-6</a-col>
      <a-col :span="6">col-6</a-col>
      <a-col :span="6">col-6</a-col>
    </a-row>

    <a-button type="primary" loading>Loading</a-button>
    <a-config-provider :autoInsertSpaceInButton="false">
      <a-button type="primary">按钮</a-button>
    </a-config-provider>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
