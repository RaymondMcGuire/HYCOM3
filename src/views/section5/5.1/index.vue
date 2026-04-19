<template>
  <menu-card
    title="5.1 泄流能力计算公式"
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
  name: 'Section51Layout',
  components: {
    MenuCard
  }
})
</script>
