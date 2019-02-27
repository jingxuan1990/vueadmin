<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据商品编号删除商品</span>
      </div>
      商品编号：<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input> <br>
      <el-button type="danger"  icon="el-icon-delete">删除</el-button>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据商品名称删除商品</span>
      </div>
      商品名称：<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input> <br>
      <el-button type="danger"  icon="el-icon-delete">删除</el-button>
    </el-card>
  </div>
</template>


<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 600px;
  margin: 20px 0 0 20px;
}
span {
  font-family: Courier;
  font-weight: bold;
}
.el-input{
  width:200px;  
}
.el-button{
    margin:20px 0 10px 80px;
}
</style>