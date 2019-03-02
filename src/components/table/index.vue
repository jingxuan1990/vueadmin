<template>
	<div class="xfn-table-info">
		<el-card shadow="hover">
			<div class="xfn-table" :style="{background:getTableColor(data.status)}">{{data.tid}}号桌：{{data.status|tableStatus}}</div>
			<el-button type="success" plain size="mini" @click="showSuiteDetail">详情</el-button>
			<el-button type="danger" plain size="mini" @click="editSuiteDetail">修改</el-button>
		</el-card>

		<!--桌台详情对话框-->
		<el-dialog :title="data.tid+'号桌台详情'" :visible="dialogTableDetailVisible" :before-close="closeDialogTableDetail">
			<!--对话框主体-->
			<el-tabs type="border-card" @tab-click="">
				<el-tab-pane label="套间状态">
					状态加载中...

				</el-tab-pane>

			</el-tabs>
			<!--对话框尾部-->
			<div slot="footer">
				<el-button type="primary" @click="dialogTableDetailVisible=false">确定</el-button>
			</div>
		</el-dialog>

		<!--桌台修改对话框-->
		<el-dialog title="修改商品分类" :visible.sync="dialogFormVisible">

			<el-form label-width="80px" :model="formLabelAlign">
				<el-form-item label="套件状态">
					<el-radio-group v-model="radio1" style="margin-bottom: 30px;">
						<el-radio border @change="changetype()" :label="1">空闲</el-radio>
						<el-radio border @change="changetype()" :label="2">预约</el-radio>
						<el-radio border @change="changetype()" :label="3">占用</el-radio>
						<el-radio border @change="changetype()" :label="4">其他</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<!--空闲状态-->
			<el-form v-show="formVisible1" label-width="80px" :model="formLabelAlign"></el-form>

			<!--预约状态-->
			<el-form v-show="formVisible2" label-width="80px" :model="formLabelAlign">
				<el-form-item label="预约时间">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="预约人">
					<el-input v-model="formLabelAlign.region"></el-input>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="formLabelAlign.type"></el-input>
				</el-form-item>
			</el-form>
			<!--占用状态-->
			<el-form v-show="formVisible3" label-width="80px" :model="formLabelAlign">
				<el-form-item label="使用人数">
					<el-input v-model="formLabelAlign.number"></el-input>
				</el-form-item>
				<el-form-item label="使用时间">
					<el-input v-model="formLabelAlign.time"></el-input>
				</el-form-item>
			</el-form>
			<!--其他状态-->
			<el-form v-show="formVisible4" label-width="80px" :model="formLabelAlign">
				<el-form-item label="备注">
					<el-input  type="textarea" v-model="formLabelAlign.textarea"></el-input>
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
		data() {
			return {
				label: '',
				radio1: 1,
				formVisible1:false,
				formVisible2: false,
				formVisible3: false,
				formVisible4: false,
				formLabelAlign: {
					name: '',
					region: '',
					type: '',
					numbe:'',
					time:'',
					textarea:''
				},
				resource: "",
				dialogFormVisible: false,
				dialogTableDetailVisible: false,

			}
		},
		props: ['data'],
		methods: {
			getTableColor(status) {
				if(status == 1) return '#67C23A';
				else if(status == 2) return '#E6A23C';
				else if(status == 3) return '#F56C6C';
				else return '#909399';
			},
			showSuiteDetail() {
				//console.log(this.data); 当前桌子的数据
				this.dialogTableDetailVisible = true;
			},
			editSuiteDetail() {
				this.dialogFormVisible = true;
			},
			closeDialogTableDetail() {
				this.dialogTableDetailVisible = false;
			},
			changetype() {
		
				if(this.radio1 === 1) {
					this.formVisible1 = true;
					this.formVisible2 = false;
					this.formVisible3=false;
					this.formVisible4=false;
				} else if(this.radio1 === 2) {
					this.formVisible2 = true;
					this.formVisible1 = false;
					this.formVisible3=false;
					this.formVisible4=false;
					console.log('2222')
				}else if(this.radio1 === 3) {
					this.formVisible3 = true;
					this.formVisible2 = false;
					this.formVisible1=false;
					this.formVisible4=false;
				}else{
					this.formVisible4 = true;
					this.formVisible2 = false;
					this.formVisible3=false;
					this.formVisible1=false;
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