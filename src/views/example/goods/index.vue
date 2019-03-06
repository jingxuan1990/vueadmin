<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="(c, i) in goodsList">
        <span slot="label">
          <el-badge :value="c.gList.length">{{ c.cname }}</el-badge>
        </span>

        <!--内容-->
        <el-row>
          <el-col :span="6" v-for="(o, index) in c.gList"  :key="o" :offset="1">
            <!--{{ g }}-->
            <el-card :body-style="{ padding: '10px' }">
              <img src="@/assets/images/tu.jpg" class="image">
              <div style="padding: 14px;">
                <span>美丽的森林</span>
                <div class="bottom clearfix">
                  <time class="time">商品描述</time>
                </div>
              </div>
            </el-card>
          </el-col>
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
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}


</style>
