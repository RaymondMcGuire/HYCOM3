<template>
  <div class="app-container">
    <app-grid
      columns="repeat(auto-fit, minmax(320px, 1fr))"
      gap="24px"
    >
      <div>
        <mail-form-table />
      </div>

      <div>
        <usr-table />
      </div>
    </app-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppGrid from '@/shared/components/layout/AppGrid.vue'
import MailFormTable from './components/MailFormTable.vue'
import UsrTable from './components/UsrTable.vue'

export default defineComponent({
  name: 'DashboardAdminPanel',
  components: {
    AppGrid,
    MailFormTable,
    UsrTable
  }
})
</script>
