<template>
  <page-shell title="5 混凝土重力（拱）坝水力学计算">
    <router-view v-slot="{ Component }">
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </page-shell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageShell from '@/shared/components/layout/PageShell.vue'

export default defineComponent({
  name: 'Section5Layout',
  components: {
    PageShell
  }
})
</script>
