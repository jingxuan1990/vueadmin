<template>
  <div>
    <el-tabs type="border-card">
      <!--导航-->
      <el-tab-pane v-for="item in goodsItems">
        <span slot="label">
          <el-badge :value="item.goodsCount">{{ item.goodsTypeName }}</el-badge>
        </span>

        <!--卡片内容-->
        <el-row>
          <el-col v-for="goodItem in item.goods" :span="6" :key="goodItem.id" :offset="1" >
            <el-card :body-style="{ padding: '10px' }" >
              <img src="@/assets/images/tu.jpg" class="image" @mouseover.stop="addClass($event)" @mouseout.stop="removeClass($event)">
            </el-card>
            <div class="detail" @mouseover.stop="addClass($event)" @mouseout.stop="removeClass($event)">
              <span class="title">{{ goodItem.title }}</span>
              <div v-show="classEnable">
                <div class="bottom clearfix">
                  <time class="time">{{ goodItem.descr }}</time>
                </div>
                <div class="price">价格：￥{{ goodItem.price }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { getAllGoods } from '@/api/goods'

export default {
  data() {
    return {
      classEnable: false,
      detail: false,
      goodsItems: [
        {
          goodsTypeName: '111',
          goodsTypeId: 10,
          goodsCount: 10,
          goods: [
            { id: 1, title: '水疗标题1', descr: '这里是描述', price: 20 },
            { id: 2, title: '水疗标题2', descr: '这里是描述2', price: 21 }
          ]
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    addClass(event) {
      console.log(11)
      console.log(event)
      this.classEnable = true
    },
    removeClass(event) {
      console.log(22)
      console.log(event)
      this.classEnable = false
    },
    getList() {
      getAllGoods().then(result => {
        this.goodsItems = result.data
      })
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
