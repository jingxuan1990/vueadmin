<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单编号" min-width="180">
      <template slot-scope="scope">
        {{ scope.row.order_sn }}
      </template>
    </el-table-column>
    <el-table-column label="订单总金额" width="90" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.total_amount }}
      </template>
    </el-table-column>
    <el-table-column label="实际支付金额" width="110" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.pay_amount }}
      </template>
    </el-table-column>
    <el-table-column label="物流单号" width="150" align="center">
      <template slot-scope="scope">
        {{ scope.row.delivery_sn }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{ scope.row.status | statusFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="查看详情" width="200" align="center">
      <template slot-scope="scope">
        <el-button>查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchListTop10 } from '@/api/order'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '待发货',
        2: '已发货',
        3: '已完成',
        4: '已关闭',
        5: '无效订单',
        6: '待付款'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchListTop10().then(response => {
        this.list = response.data
      })
    }
  }
}
</script>
