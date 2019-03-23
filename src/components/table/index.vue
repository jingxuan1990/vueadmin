<template>
  <div class="xfn-table-info">
    <el-card shadow="hover">
      <div :style="{background:getTableColor(data.status)}" class="xfn-table">{{ data.tid }}号套间：{{ data.status|tableStatus }}</div>
      <el-button type="success" plain size="mini" @click="showSuiteDetail">详情</el-button>
      <el-button type="danger" plain size="mini" @click="editSuiteDetail">修改</el-button>
    </el-card>

    <!--套间详情对话框-->
    <el-dialog :title="data.tid+'号套间详情'" :visible="dialogTableDetailVisible" :before-close="closeDialogTableDetail">
      <!--对话框主体-->
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="套间状态" name="first" style="text-align: left">
          <!--套间空闲状态-->
          <el-form v-show="formVisible1" :model="formLabelAlign" label-width="80px">
            <el-form-item label="套间状态:">
              <el-button type="info" plain>空闲</el-button>
            </el-form-item>
          </el-form>
          <!--套间预约状态-->
          <el-form v-show="formVisible2" :model="formLabelAlign" label-width="80px">
            <el-form-item label="套间状态:">
              <el-button type="info" plain>预定</el-button>
            </el-form-item>
            <el-form-item label="预约人:">
              <el-button type="info" plain>{{ formLabelAlign.username }}</el-button>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input v-model="formLabelAlign.phone" disabled="true" style="width: 45%;"/>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-col :span="11">
                <el-input v-model="formLabelAlign.booking_time" disabled="true" style="width: 100%;"/>
              </el-col>
            </el-form-item>
          </el-form>
          <!--套间占用状态-->
          <el-form v-show="formVisible3" :model="formLabelAlign" label-width="80px" >
            <el-form-item label="套间状态:">
              <el-button type="info" plain>占用</el-button>
            </el-form-item>
            <el-form-item label="套间名称:">
              <el-button type="info" plain>{{ formLabelAlign.name }}</el-button>
            </el-form-item>
            <el-form-item label="占用时间">
              <el-col :span="11">
                <el-input v-model="formLabelAlign.zhan_start_time" disabled="true" style="width: 100%;"/>
              </el-col>
              <el-col :span="2" class="line">--</el-col>
              <el-col :span="11">
                <el-input v-model="formLabelAlign.zhan_start_time" disabled="true" style="width: 100%;"/>
              </el-col>
            </el-form-item>
          </el-form>
          <!--套间其他状态-->
          <el-form v-show="formVisible4" :model="formLabelAlign" label-width="80px">
            <el-form-item label="套间状态:">
              <el-button type="info" plain>其他</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!--对话框尾部-->
      <div slot="footer">
        <el-button type="primary" @click="dialogTableDetailVisible=false" >确定</el-button>
      </div>
    </el-dialog>

    <!--套间修改对话框-->
    <el-dialog :visible.sync="dialogFormVisible" title="修改套间状态">

      <el-form :model="formLabelAlign" label-width="80px">
        <el-form-item label="套间状态">
          <el-radio-group v-model="radio1" size="mini" style="margin-bottom: 30px;">
            <el-radio :label="1" border @change="changetype()">空闲</el-radio>
            <el-radio :label="2" border @change="changetype()">预约</el-radio>
            <el-radio :label="3" border @change="changetype()">占用</el-radio>
            <el-radio :label="4" border @change="changetype()">其他</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!--空闲状态-->
      <el-form v-show="formVisible1" :model="formLabelAlign" label-width="80px"/>

      <!--预约状态-->
      <el-form v-show="formVisible2" :model="formLabelAlign" label-width="80px">
        <el-form-item label="预约时间">
          <el-col :span="11">
            <el-date-picker v-model="formLabelAlign.booking_time" type="datetime" placeholder="选择日期" style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="预约人">
          <el-input v-model="formLabelAlign.username"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formLabelAlign.phone"/>
        </el-form-item>
      </el-form>
      <!--占用状态-->
      <el-form v-show="formVisible3" :model="formLabelAlign" label-width="80px">
        <el-form-item label="使用人数">
          <el-input v-model="formLabelAlign.use_num"/>
        </el-form-item>
        <el-form-item label="占用时间">
          <el-col :span="11">
            <el-time-picker v-model="formLabelAlign.zhan_start_time" placeholder="开始时间" style="width: 100%;"/>
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-time-picker v-model="formLabelAlign.zhan_end_time" placeholder="结束时间" style="width: 100%;"/>
          </el-col>
        </el-form-item>
      </el-form>
      <!--其他状态-->
      <el-form v-show="formVisible4" :model="formLabelAlign" label-width="80px">
        <el-form-item label="备注">
          <el-input v-model="formLabelAlign.remark" type="textarea"/>
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
import { editSuite, getSuiteById } from '@/api/suite'

export default {
  props: ['data'],
  data() {
    return {
      list: null,
      activeName: 'first',
      label: '',
      radio1: 1,
      formVisible1: false,
      formVisible2: false,
      formVisible3: false,
      formVisible4: false,
      formLabelAlign: {
        id: '',
        name: '',
        username: '',
        phone: '',
        use_num: '',
        remark: '',
        booking_time: '',
        zhan_start_time: '',
        zhan_end_time: '',
        status: 1
      },
      resource: '',
      dialogFormVisible: false,
      dialogTableDetailVisible: false

    }
  },

  methods: {

    getTableColor(status) {
      if (status === 1) return '#67C23A'
      else if (status === 2) return '#E6A23C'
      else if (status === 3) return '#F56C6C'
      else return '#909399'
    },
    resetData() {
      this.formLabelAlign = {
        username: '',
        phone: '',
        use_num: '',
        remark: '',
        booking_time: '',
        zhan_start_time: '',
        zhan_end_time: ''
      }
    },
    showSuiteDetail() {
      const status = this.data.status
      this.dialogTableDetailVisible = true
      if (status === 1) {
        this.formVisible1 = true
      } else if (status === 2) {
        this.formVisible2 = true
      } else if (status === 3) {
        this.formVisible3 = true
      } else {
        this.formVisible4 = true
      }
      this.fetchSuiteDetail()
    },
    editSuiteDetail() {
      const status = this.data.status
      this.formLabelAlign.status = status
      this.formLabelAlign.id = this.data.id
      this.dialogFormVisible = true
      if (status === 1) {
        this.radio1 = 1
        this.formVisible1 = true
      } else {
        if (status === 2) {
          this.radio1 = 2
          this.formVisible2 = true
        } else if (status === 3) {
          this.radio1 = 3
          this.formVisible3 = true
        } else {
          this.radio1 = 4
          this.formVisible4 = true
        }
      }

      this.fetchSuiteDetail()
    },
    fetchSuiteDetail() {
      getSuiteById(this.data.id).then(result => {
        const resultObj = result.data[0]
        this.formLabelAlign = {
          id: resultObj['id'],
          username: resultObj['booking_user_name'],
          phone: resultObj['booking_phone'],
          use_num: resultObj['use_num'],
          remark: resultObj['remark'],
          booking_time: resultObj['booking_time'],
          zhan_start_time: resultObj['zhan_starttime'],
          zhan_end_time: resultObj['zhan_endtime'],
          status: resultObj['status'],
          name: resultObj['name']
        }
      })
    },
    closeDialogTableDetail() {
      this.dialogTableDetailVisible = false
    },
    changetype() {
      // 清空临时数据
      this.resetData()
      this.formLabelAlign['id'] = this.data['id']

      if (this.radio1 === 1) {
        this.data.status = 1
        this.formLabelAlign.status = 1
        this.formVisible1 = true
        this.formVisible2 = false
        this.formVisible3 = false
        this.formVisible4 = false
      } else if (this.radio1 === 2) {
        this.data.status = 2
        this.formLabelAlign.status = 2
        this.formVisible2 = true
        this.formVisible1 = false
        this.formVisible3 = false
        this.formVisible4 = false
      } else if (this.radio1 === 3) {
        this.data.status = 3
        this.formLabelAlign.status = 3
        this.formVisible3 = true
        this.formVisible2 = false
        this.formVisible1 = false
        this.formVisible4 = false
      } else {
        this.data.status = 4
        this.formLabelAlign.status = 4
        this.formVisible4 = true
        this.formVisible2 = false
        this.formVisible3 = false
        this.formVisible1 = false
      }
    }, updateData() {
      this.dialogFormVisible = false
      editSuite(this.formLabelAlign).then(result => {
        this.$notify({
          title: '成功',
          message: '修改成功!',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style scoped>
	.xfn-table-info {
		padding: 30px 10px 10px 20px;
		text-align: center;
	}

	.xfn-table {
		width: 100%;
		height: 120px;
		line-height: 120px;
		border: 1px solid #aaa;
		border-radius: 50%;
		box-shadow: 3px -4px 5px #666;
		margin: 5px auto;
	}
  .el-radio{
    width: 62px;
  }
</style>
