<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="套间编号">
        <el-input v-model="form.noid" disabled placeholder="编号自动生成"/>
      </el-form-item>

      <el-form-item label="套间别名">
        <el-input v-model="form.name" placeholder="给套间起个昵称吧"/>
      </el-form-item>

      <el-form-item label="套间类型">
        <el-select v-model="form.type" placeholder="大小套间？如单人间">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="初始状态">
        <el-radio-group label="初始状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1" >空闲</el-radio>
            <el-radio label="2" disabled>预定</el-radio>
            <el-radio label="3" disabled>占用</el-radio>
            <el-radio label="4" disabled>其它</el-radio>
          </el-radio-group>
      </el-radio-group></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addSuite } from '@/api/suite'

export default {
  data() {
    return {
      form: {
        noid: '',
        name: '',
        status: '1',
        type: 'single'
      },
      options: [{
        value: 'single',
        label: '单人间'
      }, {
        value: 'double',
        label: '双人间'
      }]
    }
  },
  methods: {
    onSubmit() {
      addSuite(this.form).then(result => {
        this.$notify({
          title: '成功',
          message: '创建成功!',
          type: 'success',
          duration: 2000
        })

        this.form = {
          noid: '',
          name: '',
          status: '1',
          type: 'single'
        }
      })
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
