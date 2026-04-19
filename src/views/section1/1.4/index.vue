
<template>
  <menu-card
    title="1.4 底流消能（等宽矩形断面)"
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
  name: 'Section14Layout',
  components: {
    MenuCard
  }
})
</script>
