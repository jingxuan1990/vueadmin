<template>
  <div>
    <el-table :data="orderList" stripe border>
           <el-table-column label="订单编号" prop="cid"></el-table-column>
           <el-table-column label="开始时间" prop="startTime"></el-table-column>
           <el-table-column label="结束时间" prop="endTime"></el-table-column>
           <el-table-column label="消费人数" prop="customerCount"></el-table-column>
           <el-table-column label="套间编号" prop="sid"></el-table-column>
           <el-table-column label="商品详情" prop="detail"></el-table-column>
           
       </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      orderList:[
        {cid:1,startTime:"2018/9",endTime:"2018/9",customerCount:2,sid:3,detail:"水疗"},
        {cid:1,startTime:"2018/9",endTime:"2018/9",customerCount:2,sid:3,detail:"水疗"},
      ]
    }
  }
}
</script>


<style scoped>
  .el-table{
    margin-top:25px;
  }
</style>