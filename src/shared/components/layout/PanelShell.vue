<template>
  <component
    :is="tag"
    class="panel-shell"
    :class="[`panel-shell--padding-${padding}`]"
  >
    <header
      v-if="$slots.header || title"
      class="panel-shell__header"
    >
      <slot name="header">
        <h2 class="panel-shell__title">
          {{ title }}
        </h2>
      </slot>
    </header>

    <div class="panel-shell__body">
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PanelShell',
  props: {
    tag: {
      type: String,
      default: 'section'
    },
    title: {
      type: String,
      default: ''
    },
    padding: {
      type: String,
      default: 'md'
    }
  }
})
</script>

<style lang="scss" scoped>
.panel-shell {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
}

.panel-shell__header {
  padding: var(--space-5) var(--space-6);
  background: var(--color-surface-subtle);
  border-bottom: 1px solid var(--color-border);
}

.panel-shell__title {
  margin: 0;
  color: var(--color-primary);
}

.panel-shell__body {
  padding: var(--space-5);
}

.panel-shell--padding-none .panel-shell__body {
  padding: 0;
}

.panel-shell--padding-compact .panel-shell__body {
  padding: var(--space-4);
}
</style>
