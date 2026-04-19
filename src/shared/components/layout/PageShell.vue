<template>
  <panel-shell
    class="page-shell"
    :title="title"
    padding="none"
  >
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>

    <slot />
  </panel-shell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PanelShell from './PanelShell.vue'

export default defineComponent({
  name: 'PageShell',
  components: {
    PanelShell
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.page-shell {
  margin-bottom: var(--space-5);
}
</style>
