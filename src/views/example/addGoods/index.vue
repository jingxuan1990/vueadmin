<template>
  <div>
    <el-form :model="addForm" status-icon  ref="addForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>

      <el-form-item label="主标题" prop="title">
        <el-input type="text" v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input type="text" v-model="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="所属类别" prop="resource">
        <el-radio-group v-model="addForm.resource">
          <el-radio border label="美容"></el-radio>
          <el-radio border label="养生"></el-radio>
          <el-radio border label="护理"></el-radio>
          <el-radio border label="美肤"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品描述" prop="detail">
        <el-input style="width:500px" type="textarea" v-model="addForm.detail"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
        dialogVisible: false,
      addForm: {
        title: "",
        price: "",
        resource: "",
        detail: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      alert("将数据保存到数据库")
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /*上传图片*/
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  }
};
</script>

<style scoped>
.el-input{
    width: 500px;
}
.el-form{
   margin-top: 30px; 
}

</style>
