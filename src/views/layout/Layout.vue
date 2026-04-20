<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar
      class="sidebar-container"
      :collapse="classObj.hideSidebar"
    />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navbar, AppMain, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { DeviceType, SidebarState } from '@/store/modules/app'
import { useLayoutState } from '@/app/state'

const layoutState = useLayoutState()

export default defineComponent({
  name: 'LayoutShell',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    classObj(): {
      hideSidebar: boolean;
      openSidebar: boolean;
      withoutAnimation: boolean;
      mobile: boolean;
    } {
      const sidebar = (this as typeof this & { sidebar: SidebarState }).sidebar
      const device = (this as typeof this & { device: DeviceType }).device

      return {
        hideSidebar: !sidebar.opened,
        openSidebar: sidebar.opened,
        withoutAnimation: sidebar.withoutAnimation,
        mobile: device === DeviceType.Mobile
      }
    }
  },
  methods: {
    handleClickOutside() {
      void layoutState.closeSideBar(false)
    }
  }
})
</script>

<style lang="scss" scoped>
  @use "@/styles/mixin.scss" as *;
  @use "@/styles/variables.scss" as *;

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: $sideBarWidth;
    width: calc(100% - #{$sideBarWidth});
    position: relative;
  }

  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    background-color: var(--layout-sidebar-bg);
    overflow: hidden;
  }

  .hideSidebar {
    .main-container {
      margin-left: $hideSidebarWidth;
      width: calc(100% - #{$hideSidebarWidth});
    }

    .sidebar-container {
      width: $hideSidebarWidth !important;
    }
  }

  /* for mobile response 适配移动端 */
  .mobile {
    .main-container {
      margin-left: 0px;
      width: 100%;
    }

    .sidebar-container {
      transition: transform .28s;
      width: $sideBarWidth !important;
    }

    &.openSidebar {
      position: fixed;
      top: 0;
      width: 100%;
    }

    &.hideSidebar {
      .sidebar-container {
        transition-duration: 0.3s;
        transform: translate3d(calc(-1 * #{$sideBarWidth}), 0, 0);
      }
    }
  }

  .withoutAnimation {
    .main-container,
    .sidebar-container {
      transition: none;
    }
  }
</style>
