<template>
  <div>
    <br>
    <el-button type="primary" class="add" @click="addCategory">添加商品类别</el-button>
    <br>
    <br>
    <el-table :data="categoryList" stripe border>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="mini" @click="editCategory(row,$index)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteCategory(row.id,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--描述：修改对话框-->
    <el-dialog :visible.sync="dialogFormVisible" title="修改商品分类">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="商品编号">
          <el-input v-model="form.cid" :disabled="true" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品类别">
          <el-input v-model="form.cname" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryList, updateCategory, deleteCategory, addCategory } from '@/api/category'
export default {
  data() {
    return {
      categoryList: [],
      dialogFormVisible: false,
      form: {
        id: '',
        cid: '',
        cname: ''
      },
      formLabelWidth: '80px'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    updateData() {
      const formData = Object.assign({}, this.form)
      updateCategory(formData).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        for (const v of this.categoryList) {
          if (v.id === this.form.id) {
            const index = this.categoryList.indexOf(v)
            this.categoryList.splice(index, 1, this.form)
            break
          }
        }
      })
    },
    getList() {
      getCategoryList().then(result => {
        this.categoryList = result.data
      })
    },
    editCategory(row, index) {
      this.index = index
      this.dialogFormVisible = true
      for (const key in row) {
        this.form[key] = row[key]
      }
    },
    addCategory() {
      this.$prompt('请输入新商品类别名:', '提示', {
        type: 'info'
      }).then((data) => {
        // 获得用户输入，加到数据库
        this.form['cname'] = data.value
        addCategory(this.form).then(() => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$router.go(0)
        })
      }).catch(() => {

      })
    },
    deleteCategory(id, index) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        this.categoryList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
	.el-dialog {
		width: 35%;
	}
</style>
<style scoped>
	.add {
		margin: 10 0 10 0;
	}

	.el-table {
		margin: 20px;
	}
</style>
