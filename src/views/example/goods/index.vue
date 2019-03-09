<template>
  <div>
    <el-tabs type="border-card">
      <!--导航-->
      <el-tab-pane v-for="(c, i) in goodsList">
        <span slot="label">
          <el-badge :value="c.gList.length">{{ c.cname }}</el-badge>
        </span>

        <!--卡片内容-->
        <el-row>
          <el-col v-for="(item, index) in c.gList" :span="6" :key="item" :offset="1" >
            <!--{{ g }}-->
            <el-card :body-style="{ padding: '10px' }" >
              <img src="@/assets/images/tu.jpg" class="image" @mouseover="addClass" @mouseout="removeClass">
            </el-card>
            <div class="detail" >
              <span class="title">美丽的森林</span>
              <div v-show="classenable">
                <div class="bottom clearfix">
                  <time class="time">商品描述商品描述商品描述</time>
                </div>
                <div class="price">价格：￥25.00</div>
              </div>
            </div>

          </el-col>
        </el-row>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classenable: false,
      detail: false,
      goodsList: [
        { cid: 1, cname: '水疗', gList: [1, 2, 3, 4, 5, 6] },
        { cid: 2, cname: '加疗', gList: [1, 2, 3, 4, 5, 6, 7, 5] },
        { cid: 3, cname: '剪辑', gList: [1, 2, 3, 4, 5, 6] },
        { cid: 4, cname: '食疗', gList: [1, 2, 3, 4, 5] }
      ]
    }
  },
  methods: {
    addClass(){
      console.log(11)
      this.classenable = true
      // this.current=index
    },
    removeClass() {
      console.log(22)
      this.classenable = false
      // this.current=index
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
  color: #fff;
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
.detail{
  position: relative;
  top: -135px;
  left: 15px;

}
.title{
  font-size: 16px;
  color: #fff;
  font-family:"Helvetica Neue";
  font-weight: bold;
}
.titleclassred{
  color: orangered;
}
.price{
  position: relative;
  left: 100px;
  top:50px;
  color: orangered;
  font-size: small;
  font-weight: bold;
}
</style>
