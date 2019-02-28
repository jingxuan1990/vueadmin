<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="(c,i) in goodsList"> 
        <span slot="label">
          <el-badge :value="c.gList.length">{{c.cname}}</el-badge>
        </span>

        <!--内容-->
        <el-row>
          <el-clo v-for="(g,j) in c.gList" :xs="12" :md="6" :lg="4" :xl="3">
            {{g}}
            <img>
          </el-clo>
        </el-row>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>


<script>
export default {
  data(){
    return{
      goodsList:[
        {cid:1,cname:"水疗",gList:[1,2,3,4,5,6]},
        {cid:2,cname:"加疗",gList:[1,2,3,4,5,6,7,5]},
        {cid:3,cname:"剪辑",gList:[1,2,3,4,5,6]},
      ]
    }
  }
}
</script>

<style scoped>
.el-tabs {
  margin: 20px 0 0 20px;
  /* padding:20px; */
}
.el-badge{
  margin-top:10px;
}
.item {
  margin-top: 10px;
  margin-right: 100px;
  
}
sup{
  top: 8px;
    right: 2px;
    padding: 0 3px;
    font-size: 10px;
    height: 10px;
    line-height: 10px;

}
</style>