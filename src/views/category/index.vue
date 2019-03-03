<template>
	<div>
		<br>
		<el-button type="primary" class="add" @click="addCategory">添加商品类别</el-button>
		<br>
		<br>
		<el-table :data="categoryList" stripe border>
			<el-table-column label="编号" prop="cid"></el-table-column>
			<el-table-column label="名称" prop="cname"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="{row,$index}">
					<el-button @click="editCategory(row,$index)" type="success" size="mini">修改</el-button>
					<el-button @click="deleteCategory(row.cid,$index)" type="danger" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--
       	作者：HBuilder
       	时间：2019-03-02
       	描述：修改对话框
       -->
		<el-dialog title="修改商品分类" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="商品编号" :label-width="formLabelWidth">
					<el-input v-model="form.cid" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品类别" :label-width="formLabelWidth">
					<el-input v-model="form.cname" autocomplete="off"></el-input>
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
				categoryList: [{
						cid: "1",
						cname: "美容护理"
					},
					{
						cid: "2",
						cname: "身体SPA"
					},
					{
						cid: "3",
						cname: "中医理疗"
					},
					{
						cid: "4",
						cname: "食疗"
					}
				],
				//对话框数据属性
				dialogFormVisible: false,
				beform: {},
				form: {
					cid: '',
					cname: ''
				},
				formLabelWidth: '80px'
			}
		},
		methods: {
			editCategory(row, index) {
				this.index = index;
				this.dialogFormVisible = true;
				for(var key in row) {
					this.form[key] = row[key]
				}
				
			},
//			deleteCategory(row, index) {
//
//			},
			addCategory() {
				this.$prompt('请输入新商品类别名:', '提示', {
					type: 'info'
				}).then((value) => {
					//获得用户输入，加到数据库
				}).catch(() => {

				})
			},
			
			 deleteCategory(cid,index) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url="http://127.0.0.1:3000/deleteuser?uid="+uid;
            console.log(url)
          this.axios.get(url).then(()=>{
              this.$message({
                 type: 'success',
                 message: '删除成功!'
               });         
            })
            this.list2.splice(index,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        })
      },
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