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
              <el-button type="info" plain>叮当</el-button>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input v-model="formLabelAlign.type" placeholder="13207630752" style="width: 45%;"/>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-col :span="11">
                <el-input placeholder="2019-01-22 10:21:00" style="width: 100%;"/>
              </el-col>
            </el-form-item>
            <el-form-item label="消费时间">
              <el-col :span="11">
                <el-input placeholder="2019-01-22 17:30:00" style="width: 100%;"/>
              </el-col>
            </el-form-item>
          </el-form>
          <!--套间占用状态-->
          <el-form v-show="formVisible3" :model="formLabelAlign" label-width="80px" >
            <el-form-item label="套间状态:">
              <el-button type="info" plain>占用</el-button>
            </el-form-item>
            <el-form-item label="套间名称:">
              <el-button type="info" plain>水玲珑</el-button>
            </el-form-item>
            <el-form-item label="下单人:">
              <el-button type="warning" plain>丁丁</el-button>
            </el-form-item>
            <el-form-item label="占用时间">
              <el-col :span="11">
                <el-input placeholder="开始时间" style="width: 100%;"/>
              </el-col>
              <el-col :span="2" class="line">--</el-col>
              <el-col :span="11">
                <el-input placeholder="结束时间" style="width: 100%;"/>
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
    <el-dialog :visible.sync="dialogFormVisible" title="修改商品分类">

      <el-form :model="formLabelAlign" label-width="80px">
        <el-form-item label="套件状态">
          <el-radio-group v-model="radio1" style="margin-bottom: 30px;">
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
            <el-date-picker v-model="formLabelAlign.date1" type="date" placeholder="选择日期" style="width: 100%;"/>
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-time-picker v-model="formLabelAlign.date2" placeholder="选择时间" style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="预约人">
          <el-input v-model="formLabelAlign.region"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formLabelAlign.type"/>
        </el-form-item>
      </el-form>
      <!--占用状态-->
      <el-form v-show="formVisible3" :model="formLabelAlign" label-width="80px">
        <el-form-item label="使用人数">
          <el-input v-model="formLabelAlign.number"/>
        </el-form-item>
        <el-form-item label="占用时间">
          <el-col :span="11">
            <el-time-picker v-model="formLabelAlign.date1" placeholder="开始时间" style="width: 100%;"/>
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-time-picker v-model="formLabelAlign.date2" placeholder="结束时间" style="width: 100%;"/>
          </el-col>
        </el-form-item>
      </el-form>
      <!--其他状态-->
      <el-form v-show="formVisible4" :model="formLabelAlign" label-width="80px">
        <el-form-item label="备注">
          <el-input v-model="formLabelAlign.textarea" type="textarea"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      activeName: 'first',
      label: '',
      radio1: 1,
      formVisible1: false,
      formVisible2: false,
      formVisible3: false,
      formVisible4: false,
      // suiteStatus: false,
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        numbe: '',
        time: '',
        textarea: '',
        date1: '',
        date2: ''
      },
      resource: '',
      dialogFormVisible: false,
      dialogTableDetailVisible: false

    }
  },
  methods: {

    getTableColor(status) {
      if (status == 1) return '#67C23A'
      else if (status == 2) return '#E6A23C'
      else if (status == 3) return '#F56C6C'
      else return '#909399'
    },
    showSuiteDetail() {
      // console.log(this.data.status); //当前套间号
      var num = this.data.status
      this.dialogTableDetailVisible = true
      if (num == 1) {
        return this.formVisible1 = true
      } else if (num == 2) {
        return this.formVisible2 = true
      } else if (num == 3) {
        return this.formVisible3 = true
      } else {
        return this.formVisible4 = true
      }
    },
    editSuiteDetail() {
      var num = this.data.status
      this.dialogFormVisible = true
      if (num == 1) {
        this.radio1 = 1
        this.formVisible1 = true
      } else {
        if (num == 2) {
          this.radio1 = 2
          this.formVisible2 = true
        } else if (num == 3) {
          this.radio1 = 3
          this.formVisible3 = true
        } else {
          this.radio1 = 4
          this.formVisible4 = true
        }
      }
    },
    closeDialogTableDetail() {
      this.dialogTableDetailVisible = false
    },
    changetype() {
      if (this.radio1 === 1) {
        this.formVisible1 = true
        this.formVisible2 = false
        this.formVisible3 = false
        this.formVisible4 = false
      } else if (this.radio1 === 2) {
        this.formVisible2 = true
        this.formVisible1 = false
        this.formVisible3 = false
        this.formVisible4 = false
        console.log('2222')
      } else if (this.radio1 === 3) {
        this.formVisible3 = true
        this.formVisible2 = false
        this.formVisible1 = false
        this.formVisible4 = false
      } else {
        this.formVisible4 = true
        this.formVisible2 = false
        this.formVisible3 = false
        this.formVisible1 = false
      }
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

</style>
