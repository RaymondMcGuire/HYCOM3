<template>
  <page-shell title="2 侧槽溢洪道水力学计算">
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
  name: 'Section2Layout',
  components: {
    PageShell
  }
})
</script>
