<template>
  <menu-card
    title="5.3 溢流坝挑流消能"
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
  name: 'Section53Layout',
  components: {
    MenuCard
  }
})
</script>
