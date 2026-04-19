<template>
  <menu-card
    title="1.1.2 宽顶堰泄流能力"
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
  name: 'Section112Layout',
  components: {
    MenuCard
  }
})
</script>
