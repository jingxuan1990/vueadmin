<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品促销"></el-step>
      <el-step title="填写商品属性"></el-step>
    </el-steps>

    <div v-if="active === 0">
      <el-form ref="addForm" :model="addForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品分类">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
          >
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt>
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品名称" prop="title">
          <el-input v-model="addForm.title" type="text"/>
        </el-form-item>
        <el-form-item label="副标题" prop="price">
          <el-input v-model="addForm.price" type="text"/>
        </el-form-item>
        <el-form-item label="商品描述" prop="detail">
          <el-input v-model="addForm.detail" style="width:500px" type="textarea"/>
        </el-form-item>
        <el-form-item label="商品货号" prop="detail">
          <el-input v-model="addForm.price" type="text"/>
        </el-form-item>
        <el-form-item label="商品售价" prop="detail">
          <el-input v-model="addForm.detail" style="width:500px" placeholder="单位：元(人民币)"/>
        </el-form-item>
        <el-form-item label="商品库存" prop="detail">
          <el-input v-model="addForm.detail" style="width:500px" placeholder="0~1000的整数数字"/>
        </el-form-item>
        <el-form-item label="排序" prop="detail">
          <el-input v-model="addForm.detail" style="width:500px" placeholder="0~100"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="active === 1">
      <el-form ref="addForm" :model="addForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="赠送积分" prop="title">
          <el-input v-model="addForm.title" type="text"/>
        </el-form-item>
        <el-form-item label="商品上架" prop="price">
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="服务保证" prop="detail">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"/>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="详细页标题" prop="detail" >
          <el-input v-model="addForm.title" style="width:500px" type="text"/>
        </el-form-item>
        <el-form-item label="详细页描述" prop="detail" >
          <el-input v-model="addForm.title" style="width:500px" type="textarea"/>
        </el-form-item>
        <el-form-item label="选择优惠方式" prop="detail" >
          <el-input v-model="addForm.title" style="width:500px" type="textarea"/>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="active === 2">
      显示3
    </div>

    <div v-if="active === 3">
      <el-button style="margin-top: 12px;" type="success" plain @click="next">恭喜您，完成添加商品</el-button>
    </div>

    <div class="stepNext">
      <div class="subNext">
        <el-button style="margin-top: 12px;" type="warning" plain @click="prev">上一步</el-button>
        <el-button style="margin-top: 12px;" type="primary" plain @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      value2: true,
      checkAll: false,
      checkedCities: [],
      cities: ['无忧退货', '快速退款', '免费包邮', '7天无理由退货'],
      isIndeterminate: true,
      addForm: {
        title: '',
        price: '',
        resource: '',
        detail: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value: ''
    }
  },
  methods: {
    submitForm(formName) {
      alert('将数据保存到数据库')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /* 上传图片*/
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    next() {
      if (this.active++ > 2) this.active = 0
    },
    prev() {
      if (--this.active < 0) this.active = 0
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>

<style scoped>
.el-input{
    width: 500px;
}
.el-form{
   margin-top: 30px;
}

.subNext{
  width: 200px;
  height:50px;
}

.stepNext .subNext{
  margin: 0 auto 50px;
}

</style>
