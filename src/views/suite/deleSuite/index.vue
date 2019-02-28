<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="套间编号">
        <el-input v-model="form.id" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dele">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: "",
        
      }
    };
  },
  methods: {
    dele() {
      console.log("delete");
    }
  }
};
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