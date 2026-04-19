<template>
  <div
    :class="[{'is-active': isActive}, 'hamburger-container']"
    @click="toggleClick"
  >
    <svg-icon
      name="hamburger"
      width="20"
      height="20"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'HamburgerButton',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function as PropType<() => void>,
      default: null
    }
  }
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  cursor: pointer;
}

.hamburger-container.is-active {
  transform: rotate(180deg);
}
</style>
