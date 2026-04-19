<template>
  <menu-card
    title="3.3 有压短管后接无压隧洞水力学计算"
    :level="2"
    icon-type="calculation"
  >
    <router-view />
  </menu-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuCard from '@/components/MenuCard/index.vue'

export default defineComponent({
  name: 'Section33Layout',
  components: {
    MenuCard
  }
})
</script>
