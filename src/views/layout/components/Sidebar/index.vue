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
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
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

  :deep(.scrollbar-wrapper) {
    overflow-x: hidden !important;
  }

  :deep(.el-scrollbar__view) {
    height: 100%;
  }

  :deep(.el-scrollbar__bar.is-vertical) {
    right: 0;
  }

  :deep(.el-scrollbar__bar.is-horizontal) {
    display: none;
  }
}

.sidebar-menu {
  border: none;
  height: 100%;
  width: 100% !important;

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    display: flex;
    align-items: center;
    min-width: 0;
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
