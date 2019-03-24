<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写商品信息"/>
      <el-step title="填写商品促销"/>
      <el-step title="填写商品属性"/>
    </el-steps>

    <div v-if="active === 0">
      <el-form ref="addForm" :rules="rules" :model="addForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品分类" prop="goodType">
          <el-select v-model="addForm.goodType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
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
        <el-form-item label="副标题" prop="subtitle">
          <el-input v-model="addForm.subtitle" type="text"/>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input v-model="addForm.desc" style="width:500px" type="textarea"/>
        </el-form-item>
        <el-form-item label="商品编码" prop="noid">
          <el-input v-model="addForm.noid" type="text" disabled placeholder="商品编号会自动生成"/>
        </el-form-item>
        <el-form-item label="商品售价" prop="price">
          <el-input v-model="addForm.price" type="number" style="width:500px" placeholder="单位：元(人民币)"/>
        </el-form-item>
        <el-form-item label="商品库存" prop="count">
          <el-input v-model="addForm.count" type="number" style="width:500px" placeholder="0~1000的整数数字"/>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="active === 1">
      <el-form ref="addForm" :rules="rules" :model="addForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="赠送积分" prop="integral">
          <el-input v-model="addForm.integral" type="number"/>
        </el-form-item>
        <el-form-item label="商品上架" prop="status">
          <el-switch
            v-model="addForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>
        <el-form-item label="服务保证" prop="checkedServices">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"/>
          <el-checkbox-group v-model="addForm.checkedServices" @change="handleCheckedServicesChange">
            <el-checkbox v-for="service in services" :label="service" :key="service">{{ service }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="详细页标题" prop="detailTitle" >
          <el-input v-model="addForm.detailTitle" style="width:500px" type="text"/>
        </el-form-item>
        <el-form-item label="详细页描述" prop="detailDesc" >
          <el-input v-model="addForm.detailDesc" style="width:500px" type="textarea"/>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="active === 2">
      <el-form ref="addForm" :model="addForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品规格" prop="sepc" >
          <el-input v-model="addForm.sepc" style="width:500px;" type="textarea"/>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="active === 3" class="finish-step">
      <el-button style="margin-top: 12px;" type="success" plain @click="submitForm()">确定添加该新商品？</el-button>
      <el-button style="margin-top: 12px;" type="info" plain @click="addNewOneGoods()">继续添加？</el-button>
    </div>

    <div v-if="active !== 3">
      <div class="stepNext">
        <div class="subNext">
          <el-button style="margin-top: 12px;" type="warning" plain @click="prev">上一步</el-button>
          <el-button style="margin-top: 12px;" type="primary" plain @click="next">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/category'
import { addGoods } from '@/api/goods'

export default {
  data() {
    return {
      active: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      checkAll: false,
      services: ['无忧退货', '快速退款', '免费包邮', '7天无理由退货'],
      isIndeterminate: true,
      addForm: {
        goodType: '', // 商品分类
        title: '',
        subtitle: '',
        desc: '',
        noid: '', // 编号
        price: '', // 价格
        count: '', // 库存
        integral: 0, // 积分
        status: true, // 是否上架
        checkedServices: [], // 服务类型
        detailTitle: '', // 详细页标题
        detailDesc: '', // 详细页描述
        sepc: '' // 规格
      },
      options: [],
      rules: {
        goodType: [{ required: true, trigger: 'change', message: '商品类型是必须字段' }],
        title: [{ required: true, trigger: 'blur', message: '商品标题是必须字段' }],
        subtitle: [{ required: true, trigger: 'blur', message: '商品副标题是必须字段' }],
        price: [{ required: true, trigger: 'blur', message: '商品价格是必须字段' }],
        count: [{ required: true, trigger: 'blur', message: '商品库存是必须字段' }],
        checkedServices: [{ type: 'array', required: true, trigger: 'change', message: '服务类型必选' }],
        detailTitle: [{ required: true, trigger: 'blur', message: '商品详情页标题是必填字段' }],
        detailDesc: [{ required: true, trigger: 'blur', message: '商品详情页描述是必填字段' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /* 上传图片*/
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    next() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          if (this.active++ > 2) {
            this.active = 0
          }
        } else {
          this.$notify({
            title: '失败',
            message: '表单校验失败!',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    prev() {
      if (--this.active < 0) this.active = 0
    },
    handleCheckAllChange(val) {
      this.addForm.checkedServices = val ? this.services : []
      this.isIndeterminate = false
    },
    handleCheckedServicesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.services.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.services.length
    },
    getList() {
      getCategoryList().then(result => {
        const list = result.data
        this.options = []
        for (const l of list) {
          this.options.push({
            value: l['id'],
            label: l['cname']
          }
          )
        }
      })
    },
    submitForm() {
      addGoods(this.addForm).then(() => {
        this.$notify({
          title: '成功',
          message: '添加新商品成功!',
          type: 'success',
          duration: 2000
        })
        this.resetForm()
      })
    }, resetForm() {
      this.addForm = {
        goodType: '',
        title: '',
        subtitle: '',
        desc: '',
        noid: '',
        price: '',
        count: '',
        integral: 0,
        status: true,
        checkedServices: [],
        detailTitle: '',
        detailDesc: '',
        sepc: ''
      }
    }, addNewOneGoods() {
      this.$router.go(0)
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
