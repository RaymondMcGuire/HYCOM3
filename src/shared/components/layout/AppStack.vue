<template>
  <component
    :is="tag"
    class="app-stack"
    :style="stackStyle"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'AppStack',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    direction: {
      type: String,
      default: 'column'
    },
    gap: {
      type: String,
      default: '16px'
    },
    align: {
      type: String,
      default: 'stretch'
    },
    justify: {
      type: String,
      default: 'flex-start'
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const stackStyle = computed(() => ({
      gap: props.gap,
      alignItems: props.align,
      justifyContent: props.justify,
      flexDirection: props.direction,
      flexWrap: props.wrap ? 'wrap' : 'nowrap'
    }))

    return {
      stackStyle
    }
  }
})
</script>

<style scoped>
.app-stack {
  display: flex;
}
</style>
