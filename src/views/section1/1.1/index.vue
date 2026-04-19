<template>
  <menu-card
    title="1.1 泄流能力计算"
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
  name: 'Section11Layout',
  components: {
    MenuCard
  }
})
</script>
