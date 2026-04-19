<template>
  <panel-shell :title="title">
    <div class="admin-table">
      <el-table
        :data="usrList"
        style="width: 100%;"
      >
        <el-table-column
          label="用户名"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>

        <el-table-column
          label="职业"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.job }}
          </template>
        </el-table-column>

        <el-table-column
          label="职称"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </panel-shell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { adminService, UserInfoRecord } from '@/services/adminService'
import PanelShell from '@/shared/components/layout/PanelShell.vue'

export default defineComponent({
  name: 'UserInfoTable',
  components: {
    PanelShell
  },
  data() {
    return {
      usrList: [] as UserInfoRecord[],
      title: '用户列表'
    }
  },
  created() {
    void this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.usrList = await adminService.fetchUsers()
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
