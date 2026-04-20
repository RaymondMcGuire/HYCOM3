<template>
  <el-scrollbar
    class="layout-sidebar"
    wrap-class="scrollbar-wrapper"
  >
    <el-menu
      class="sidebar-menu"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :collapse="collapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from '@/app/router/routes'
import SidebarItem from './SidebarItem.vue'
import { useLayoutState } from '@/app/state'

const layoutState = useLayoutState()

export default defineComponent({
  name: 'LayoutSidebar',
  components: {
    SidebarItem
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sidebar() {
      return layoutState.sidebar
    },
    routes() {
      return routes
    },
    isCollapse(): boolean {
      return !this.sidebar.opened
    }
  }
})
</script>

<style lang="scss" scoped>
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}

.layout-sidebar {
  height: 100%;
  background-color: var(--layout-sidebar-bg);

  :deep(.scrollbar-wrapper) {
    height: 100%;
    background-color: var(--layout-sidebar-bg);
    overflow-x: hidden !important;
  }

  :deep(.el-scrollbar__wrap) {
    background-color: var(--layout-sidebar-bg);
  }

  :deep(.el-scrollbar__view) {
    min-height: 100%;
    background-color: var(--layout-sidebar-bg);
  }

  :deep(.el-scrollbar__bar.is-vertical) {
    right: 0;
  }

  :deep(.el-scrollbar__bar.is-horizontal) {
    display: none;
  }
}

.sidebar-menu {
  --el-menu-bg-color: var(--layout-sidebar-bg);
  --el-menu-text-color: var(--layout-sidebar-text);
  --el-menu-hover-text-color: var(--layout-sidebar-text-hover);
  --el-menu-active-color: var(--layout-sidebar-text-active);
  --el-menu-hover-bg-color: var(--layout-sidebar-submenu-hover);
  border: none;
  min-height: 100%;
  width: 100% !important;
  background-color: var(--layout-sidebar-bg);

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    display: flex;
    align-items: center;
    min-width: 0;
    color: var(--layout-sidebar-text);
    transition: color 0.2s ease, background-color 0.2s ease;
  }

  :deep(.el-menu-item:hover),
  :deep(.el-sub-menu__title:hover) {
    color: var(--layout-sidebar-text-hover);
  }

  :deep(.el-menu-item.is-active),
  :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
    color: var(--layout-sidebar-text-active);
  }

  :deep(.el-menu-item > span),
  :deep(.el-sub-menu__title > span) {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :deep(.svg-icon) {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
  }
}
</style>
