<template>
    <div>
        <br>
       <el-button type="primary" class="add" @click="addCategory">添加商品类别</el-button>
       <br>
       <br>
       <el-table :data="categoryList" stripe border>
           <el-table-column label="编号" prop="cid"></el-table-column>
           <el-table-column label="名称" prop="cname"></el-table-column>
           <el-table-column label="操作" >
               <template slot-scope="{row,$index}">
                   <el-button @click="editCategory(row,$index)" type="success" size="mini">修改</el-button>
                    <el-button @click="deleteCategory(row,$index)"  type="danger" size="mini">删除</el-button>
               </template>
           </el-table-column>
       </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            categoryList:[
                {cid:"1",cname:"美容护理"},
                {cid:"2",cname:"身体SPA"},
                {cid:"3",cname:"中医理疗"},
                {cid:"4",cname:"食疗"}
            ]
        }
    },
    methods:{
        editCategory(row,index){
            console.log(row);
            console.log(index);
        },
        deleteCategory(row,index){
            
        },
        addCategory(){
            this.$prompt('请输入新商品类别名:','提示',{type:'info'}).then((value)=>{
               //获得用户输入，加到数据库
            }).catch(()=>{

            })
        }
    }
}
</script>

<style >
.add{
    margin: 10 0 10 0;
}
</style>

