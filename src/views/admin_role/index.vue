<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="success" plain icon="el-icon-edit" @click="handleCreate">新增角色</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="编号" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名" prop="role_name" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据权限" width="344px" align="left" prop="permission_url">
        <template slot-scope="scope">
          <span>{{ scope.row.permission_url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="180px" prop="gmt_modified">
        <template slot-scope="scope">
          <span>{{ scope.row.gmt_modified }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180px" prop="gmt_create">
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色名称" prop="username">
          <el-input v-model.number="temp.role_name"/>
        </el-form-item>
        <el-form-item
          v-for="(permission_url, index) in temp.permission_urls"
          :label="'数据权限-' + (index+1)"
          :prop="'permission_urls[' + index + '].value'"
        >
          <el-input v-model="permission_url.key" placeholder="页面名称"/>
          <el-input v-model="permission_url.value" placeholder="页面链接"/>
          <el-button type="danger" round @click.prevent="removePermissionUrl(permission_url)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addPermissionUrl">新增数据权限</el-button>
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
  .filter-container{
    margin-bottom: 20px;
  }
  .filter-item{
    margin-right: 10px;
  }
  .el-table .cell {
    white-space: pre-line;
  }
</style>

<script>
import { createRole, getAllRoles, deleteRole, getRoleById, updateRole } from '@/api/roles'
import waves from '@/directive/waves' // Waves directive

export default {
  name: 'AdminRole',
  components: { },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      dialogStatus: '',
      listLoading: true,
      temp: {
        role_name: '',
        permission_urls: [
          {
            key: '',
            value: ''
          }
        ]
      },
      dialogFormVisible: false,
      textMap: {
        update: '修改角色',
        create: '新增角色'
      },
      rules: { }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAllRoles().then(data => {
        const result = data.data
        for (const r of result) {
          let permissionStr = '';
          const urls = r['permission_url']
          for (var url of JSON.parse(urls)) {
            permissionStr += (url['key'] + ':' + url['value']) + '\n'
          }
          r['permission_url'] = permissionStr
        }

        this.list = data.data
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    resetTemp() {
      this.temp = {
        role_name: '',
        permission_urls: [
          {
            key: '',
            value: ''
          }
        ]
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
          createRole(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建角色成功!',
              type: 'success',
              duration: 2000
            })

            this.$router.go(0)
          })
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true

      getRoleById(row.id).then(data => {
        const result = data.data[0]
        this.temp['id'] = result['id']
        this.temp['role_name'] = result['role_name']
        this.temp['permission_urls'] = JSON.parse(result['permission_url'])
      })

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateRole(tempData).then(() => {
            this.getList()
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
      deleteRole(row.id).then(() => {
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
    addPermissionUrl() {
      console.log('array=' + this.temp.permission_urls)
      this.temp.permission_urls.push({
        value: '',
        key: ''
      })
    },
    removePermissionUrl(item) {
      const index = this.temp.permission_urls.indexOf(item)
      if (index !== -1) {
        this.temp.permission_urls.splice(index, 1)
      }
    }
  }
}
</script>
