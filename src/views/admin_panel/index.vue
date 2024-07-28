<template>
  <div class="app-container">
    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <mail-form-table />
      </el-col>

      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <usr-table />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MailFormTable from './components/MailFormTable.vue'
import UsrTable from './components/UsrTable.vue'

@Component({
  components: {
    MailFormTable,
    UsrTable
  }
})
export default class DashboardAdminPanel extends Vue {

}
</script>
