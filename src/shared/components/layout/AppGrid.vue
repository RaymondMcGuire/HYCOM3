<template>
  <component
    :is="tag"
    class="app-grid"
    :style="gridStyle"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'AppGrid',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gap: {
      type: String,
      default: '16px'
    },
    columns: {
      type: String,
      default: ''
    },
    minColumn: {
      type: String,
      default: '280px'
    },
    autoFit: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const gridStyle = computed(() => ({
      gap: props.gap,
      gridTemplateColumns: props.columns || `repeat(${props.autoFit ? 'auto-fit' : 'auto-fill'}, minmax(${props.minColumn}, 1fr))`
    }))

    return {
      gridStyle
    }
  }
})
</script>

<style scoped>
.app-grid {
  display: grid;
}
</style>
