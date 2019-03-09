<template>
  <div>
    <!--循环桌台列表-->
    <el-row>
      <el-col v-for="(t,i) in tableList" :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
        <xfn-table :data="t"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Table from '@/components/table'
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
    'xfn-table': Table
  },
  data() {
    return {

      tableList: [{
        tid: 1,
        tname: 'jin',
        type: 2,
        status: 1
      },
      {
        tid: 2,
        tname: 'yin',
        type: 2,
        status: 2
      },
      {
        tid: 3,
        tname: 'fin',
        type: 2,
        status: 3
      },
      {
        tid: 4,
        tname: 'fon',
        type: 3,
        status: 4
      },
      {
        tid: 5,
        tname: 'fn',
        type: 1,
        status: 2
      }
      ]
    }
  }
}
</script>
