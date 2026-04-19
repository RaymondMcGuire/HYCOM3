<template>
  <menu-card
    title="7.3 水锤计算"
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
  name: 'Section73Layout',
  components: {
    MenuCard
  }
})
</script>
