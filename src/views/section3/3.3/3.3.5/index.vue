<template>
  <menu-card
    title="3.3.5 掺气水深计算"
    :level="3"
    icon-type="default"
  >
    <router-view />
  </menu-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuCard from '@/components/MenuCard/index.vue'

export default defineComponent({
  name: 'AerationDepthCalculation',
  components: {
    MenuCard
  }
})
</script>
