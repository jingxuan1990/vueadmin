<template>
<div>
   <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="套间编号">
    <el-input v-model="form.id" disabled placeholder="编号自动生成"></el-input>
  </el-form-item>
  
  <el-form-item label="套间别名">
    <el-input v-model="form.name" placeholder="给套间起个昵称吧"></el-input>
  </el-form-item>
  
  <el-form-item label="套间类型">
    <el-input v-model="form.type" placeholder="大小套间？如单人间"></el-input>
  </el-form-item>

  <el-form-item label="初始状态">
    <el-radio-group v-model="form.resource">
      <el-radio label="空闲" ></el-radio>
      <el-radio label="预定" disabled></el-radio>
      <el-radio label="占用" disabled></el-radio>
      <el-radio label="其他" disabled></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
</el-form>
</div>
</template>


<script>
  export default {
    data() {
      return {
        form: {
            id:'',
          name: '',
          type:'',
          resource: '',
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
    .el-form{
        margin:20px 0 0 20px;
        padding:20px;
        box-shadow:2px -1px 1px 1px rgb(155, 149, 149);
    }
    .el-input{
        width: 300px;
    }
</style>