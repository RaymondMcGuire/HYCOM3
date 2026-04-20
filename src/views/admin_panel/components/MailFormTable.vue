<template>
  <panel-shell :title="title">
    <div class="admin-table">
      <el-table
        :data="mailList"
        style="width: 100%;"
      >
        <el-table-column
          label="姓名"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.to_name }}
          </template>
        </el-table-column>

        <el-table-column
          label="邮箱地址"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.email_address }}
          </template>
        </el-table-column>

        <el-table-column
          label="标题"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>

        <el-table-column
          label="内容"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.message }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </panel-shell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { adminService, FeedbackRecord } from '@/services/adminService'
import PanelShell from '@/shared/components/layout/PanelShell.vue'

export default defineComponent({
  name: 'MailFormTable',
  components: {
    PanelShell
  },
  data() {
    return {
      mailList: [] as FeedbackRecord[],
      title: '意见反馈列表'
    }
  },
  created() {
    void this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.mailList = await adminService.fetchFeedbackForms()
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style scoped>
.admin-table {
  padding-top: 15px;
}
</style>
