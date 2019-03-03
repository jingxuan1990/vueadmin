<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchName" placeholder="输入会员姓名" style="width:180px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" plain icon="el-icon-search" @click="handleFilter">搜索会员</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" plain icon="el-icon-edit" @click="handleCreate">增加会员</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="用户ID" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员卡号" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_card }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nick_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="50px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex === 'M' ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.birth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员级别" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ levelOptions[scope.row.level-1]['label'] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="250px">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.gmt_modified }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.gmt_create }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="会员卡号" prop="user_card">
          <el-input v-model="temp.user_card" placeholder="输入11位的会员卡号" @blur="checkUniq(temp.user_card, 'userCard')"/>
        </el-form-item>
        <el-form-item label="上传头像" prop="photo">
          <el-upload
            class="avatar-uploader"
            action="">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" placeholder="11数字位手机号" @blur="checkUniq(temp.phone, 'phone')"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="temp.name" placeholder="史前风"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="temp.nick_name" placeholder="周星星"/>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="temp.address" placeholder="输入详细地址"/>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="temp.birth" type="date" placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="temp.sex" label="F">女</el-radio>
          <el-radio v-model="temp.sex" label="M">男</el-radio>
        </el-form-item>
        <el-form-item label="会员级别" prop="level">
          <el-select v-model="temp.level" placeholder="请选择">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .filter-container{
    margin-bottom: 20px;
  }
  .filter-item{
    margin-right: 10px;
  }

</style>

<script>
import { getUserList, createUser, updateUser, deleteUser, searchUserByName, checkParamUniq } from '@/api/user'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'UserAccount',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      imageUrl: '',
      searchName: '',
      listQuery: {
        page: 1,
        limit: 20
      },
      levelOptions: [{ 'label': '普通会员', value: '1' }, { 'label': '青铜会员', value: '2' }, { 'label': '黄金会员', value: '3' }, { 'label': '铂金会员', value: '4' }],
      temp: {
        id: '',
        phone: '',
        user_card: '',
        name: '',
        nick_name: '',
        birth: new Date(),
        address: '',
        sex: 'F',
        level: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改会员',
        create: '新增会员'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUserList(this.listQuery).then(data => {
        this.list = data.data
        this.total = data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listLoading = true
      searchUserByName({ page: this.listQuery.page, limit: this.listQuery.limit, name: this.searchName }).then(data => {
        this.list = data.data
        this.total = data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    resetTemp() {
      this.temp = {
        id: '',
        phone: '',
        user_card: '',
        name: '',
        nick_name: '',
        birth: new Date(),
        address: '',
        sex: 'F',
        level: '1'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建会员成功!',
              type: 'success',
              duration: 2000
            })

            this.$router.go(0)
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteUser(row.id).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })

        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.total = (this.total - 1)
      })
    },
    checkUniq(data, type) {
      checkParamUniq({ 'type': type, data: data })
    }
  }
}
</script>
