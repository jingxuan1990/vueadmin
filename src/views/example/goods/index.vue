<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="美容护理"> <el-badge value="new" class="item">
        <el-button size="small">评论</el-button>
      </el-badge></el-tab-pane>
      <el-tab-pane label="皮肤保健">皮肤保健</el-tab-pane>
      <el-tab-pane label="水疗">水疗</el-tab-pane>
      <el-tab-pane label="养生服务">养生服务</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.el-tabs {
  margin: 20px 0 0 20px;
}
.item {
  margin-top: 10px;
  margin-right: 100px;
}

sup{
  top: 8px;
    right: 2px;
    padding: 0 3px;
    font-size: 10px;
    height: 10px;
    line-height: 10px;

}
</style>
