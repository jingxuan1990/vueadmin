<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="success" plain icon="el-icon-edit" @click="handleCreate">增加管理员</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="用户名" align="center" width="102px">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="102px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nick_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="拥有的角色" width="180px" align="center" class="line">
        <template slot-scope="scope">
          <span>{{ scope.row.roles }}</span>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="temp.username" placeholder="数字+英文组成的至少9个字符"/>
        </el-form-item>
        <el-form-item label="头像" prop="photo">
          <el-upload class="avatar-uploader" action="">
            <img v-if="temp.photo" :src="temp.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="密码" prop="phone">
          <el-input v-model.number="temp.password" placeholder="数字+英文组成的至少12个字符"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="temp.nick_name" placeholder="周星星"/>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-select v-model="temp.roles" multiple placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
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

  .line{
    white-space: pre-line;
  }
</style>

<script>
import { getAdminRoles, getAdminUserList, createAdminUser, deleteAdminUser, updateAdminUser } from '@/api/adminuser'
import waves from '@/directive/waves' // Waves directive

export default {
  name: 'AdminUser',
  components: { },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      imageUrl: '',
      dialogStatus: '',
      roleOptions: [],
      temp: {
        username: '',
        password: '',
        photo: '',
        nick_name: '',
        roles: []
      },
      dialogFormVisible: false,
      textMap: {
        update: '修改管理员',
        create: '新增管理员'
      },
      rules: { }
    }
  },
  created() {
    this.getAdminRoles()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAdminUserList().then(data => {
        for (const result of data['data']) {
          const roles = JSON.parse(result['role'])
          let roleNameString = ''
          for (const role of roles) {
            for (const option of this.roleOptions) {
              if (role === option['value']) {
                roleNameString += option['label'] + ';'
              }
            }
            roleNameString = roleNameString.substring(0, roleNameString.length - 1)
          }
          result['roles'] = roleNameString
        }

        this.list = data['data']

        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    getAdminRoles() {
      getAdminRoles().then(data => {
        const result = data.data
        for (const r of result) {
          this.roleOptions.push({
            value: r['id'],
            label: r['role_name']
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        username: '',
        password: '',
        photo: '',
        nick_name: '',
        roles: []
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
          createAdminUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建管理员成功!',
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
      this.temp['roles'] = JSON.parse(this.temp['role'])
      this.temp['password'] = ''
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
          console.log('update =' + JSON.stringify(tempData))
          updateAdminUser(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)

                let roleNameString = ''
                for (const role of this.temp.roles) {
                  for (const option of this.roleOptions) {
                    if (role === option['value']) {
                      roleNameString += option['label'] + ';'
                    }
                  }
                  roleNameString = roleNameString.substring(0, roleNameString.length - 1)
                }
                this.temp['roles'] = roleNameString
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
      deleteAdminUser(row.id).then(() => {
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
    }
  }
}
</script>
