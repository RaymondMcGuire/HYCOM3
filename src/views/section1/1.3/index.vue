<template>
  <menu-card
    title="1.3 挑流消能"
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
  name: 'Section13Layout',
  components: {
    MenuCard
  }
})
</script>
