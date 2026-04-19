<template>
  <menu-card
    title="1.6 台阶式泄槽溢洪道水力学计算"
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
  name: 'Section16Layout',
  components: {
    MenuCard
  }
})
</script>
