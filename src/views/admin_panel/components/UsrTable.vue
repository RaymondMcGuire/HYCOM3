<template>
  <el-container>
    <el-header>
      <h2>{{ title }}</h2>
    </el-header>
    <el-main>
      <el-table
        :data="usrList"
        style="width: 100%;padding-top: 15px;"
      >
        <el-table-column
          label="用户名"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>

        <el-table-column
          label="职业"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.job }}
          </template>
        </el-table-column>

        <el-table-column
          label="职称"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
const AV = require('leancloud-storage')

@Component({
  filters: {
    statusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter: (str: string) => str.substring(0, 30),
    // Input 10000 => Output "10,000"
    toThousandFilter: (num: number) => {
      return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
  }
})
export default class MailFormTable extends Vue {
  private usrList: Array<Object> = []
  private title : string = '用户列表'
  created() {
    this.fetchData()
  }

  private fetchData() {
    var cql = 'select * from UsrInfo'
    AV.Query.doCloudQuery(cql).then((results:any) => {
      results.results.forEach((ele:any) => {
        const attr = ele.attributes
        this.usrList.push(attr)
      })
    }, (error:any) => {
      console.log(error)
    })
  }
}
</script>
