<template>
  <section
    class="app-main"
    :class="{'fullscreen-page': isFullscreenRoute}"
  >
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutAppMain',
  computed: {
    isFullscreenRoute(): boolean {
      return this.$route.name === 'Dashboard' || this.$route.path === '/dashboard'
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 50px);
  width: 100%;
  overflow-y: auto;
  background: var(--layout-shell-background);
  padding: var(--space-5);
  box-sizing: border-box;

  &.fullscreen-page {
    padding: 0;
  }
}
</style>
