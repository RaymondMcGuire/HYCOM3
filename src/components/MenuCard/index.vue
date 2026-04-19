<template>
  <panel-shell
    class="menu-card"
    padding="compact"
  >
    <template #header>
      <div class="card-header">
        <h2 class="title">
          <menu-icon
            :level="level"
            :type="iconType"
          />
          {{ title }}
        </h2>
      </div>
    </template>
    <div class="menu-card__content">
      <slot />
    </div>
  </panel-shell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PanelShell from '@/shared/components/layout/PanelShell.vue'
import MenuIcon from './components/MenuIcon.vue'

export default defineComponent({
  name: 'MenuCard',
  components: {
    PanelShell,
    MenuIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      default: 2
    },
    iconType: {
      type: String,
      default: 'default'
    }
  }
})
</script>

<style lang="scss" scoped>
.menu-card {
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    background-color: #f0f7ff;
    border-bottom: 1px solid #e8e8e8;
    padding: 15px 20px;

    .title {
      margin: 0;
      font-size: 18px;
      color: var(--color-primary);
      display: flex;
      align-items: center;
    }
  }
}

.menu-card__content {
  min-width: 0;
}
</style>
