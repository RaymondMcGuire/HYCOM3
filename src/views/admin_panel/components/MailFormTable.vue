<template>
  <el-container>
    <el-header>
      <h2>{{ title }}</h2>
    </el-header>
    <el-main>
      <el-table
        :data="mailList"
        style="width: 100%;padding-top: 15px;"
      >
        <el-table-column
          label="姓名"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column
          label="邮箱地址"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>

        <el-table-column
          label="标题"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>

        <el-table-column
          label="内容"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.message }}
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
  private mailList: Array<Object> = []
  private title : string = '意见反馈列表'
  created() {
    this.fetchData()
  }

  private fetchData() {
    var cql = 'select * from MailForms'
    AV.Query.doCloudQuery(cql).then((results:any) => {
      results.results.forEach((ele:any) => {
        const attr = ele.attributes
        this.mailList.push(attr)
      })
    }, (error:any) => {
      console.log(error)
    })
  }
}
</script>
