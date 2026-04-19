<template>
  <menu-card
    title="5.4 拱坝跌流消能"
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
  name: 'Section54Layout',
  components: {
    MenuCard
  }
})
</script>
