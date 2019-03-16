<template>
  <div>
    <!--循环套间列表-->
    <el-row>
      <el-col v-for="(t,i) in tableList" :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
        <spa-table :data="t"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Table from '@/components/table'
import { getSuiteList } from '@/api/suite'
export default {
  //   mounted(){
  //     //加载桌台列表
  //     var url = this.$store.state.globalSettings.apiUrl + '/admin/table';
  //     this.$axios.get(url).then(({data})=>{
  //       this.tableList = data;
  //     }).catch((err)=>{
  //       console.log(err);
  //     })
  //   },
  components: {
    'spa-table': Table
  },
  data() {
    return {
      tableList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getSuiteList().then(result => {
        const newList = []
        for (const l of result.data) {
          newList.push({
            tid: l.sid,
            status: l.status,
            name: l.name,
            type: l.type
          })
        }
        this.tableList = newList
      })
    }
  }
}
</script>
