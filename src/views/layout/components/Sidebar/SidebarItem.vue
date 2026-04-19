<template>
  <div
    v-if="!isRouteHidden(item)"
    :class="['menu-wrapper', collapse ? 'simple-mode' : 'full-mode', {'first-level': !isNest}]"
  >
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild?.children || onlyOneChild.meta?.noShowingChildren)">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="[
            'sidebar-link-item',
            { 'submenu-title-noDropdown': !isNest }
          ]"
        >
          <svg-icon
            v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
            :name="onlyOneChild.meta.icon"
          />
          <svg-icon
            v-else-if="item.meta && item.meta.icon"
            :name="item.meta.icon"
          />
          <span
            v-if="onlyOneChild.meta && onlyOneChild.meta.title"
          >{{ onlyOneChild.meta.title }}</span>
          <span
            v-else-if="item.meta && item.meta.title"
          >{{ item.meta.title }}</span>
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu
      v-else
      :index="resolvePath(item.path)"
      class="sidebar-submenu"
      popper-append-to-body
    >
      <template #title>
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        />
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        :collapse="collapse"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import { defineComponent, PropType } from 'vue'
import AppLink from './Link.vue'

function isRouteHidden(route: RouteRecordRaw | null | undefined) {
  if (!route) {
    return false
  }

  return Boolean(route.meta?.hidden || (route as RouteRecordRaw & { hidden?: boolean }).hidden)
}

function resolveRoutePath(basePath: string, routePath: string) {
  if (isExternal(routePath)) {
    return routePath
  }

  if (isExternal(basePath)) {
    return basePath
  }

  const pathSegments = routePath.startsWith('/') ? [] : basePath.split('/').filter(Boolean)

  routePath.split('/').forEach((segment) => {
    if (!segment || segment === '.') {
      return
    }

    if (segment === '..') {
      pathSegments.pop()
      return
    }

    pathSegments.push(segment)
  })

  return `/${pathSegments.join('/')}`
}

export default defineComponent({
  name: 'SidebarItem',
  components: {
    AppLink
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null as RouteRecordRaw | null
    }
  },
  methods: {
    isRouteHidden,
    hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw) {
      let showingChildren: RouteRecordRaw[] = []

      if (children) {
        showingChildren = children.filter((item: RouteRecordRaw) => {
          if (isRouteHidden(item)) {
            return false
          }

          this.onlyOneChild = item
          return true
        })
      }

      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: '',
          meta: { ...(parent.meta || {}), noShowingChildren: true }
        }
        return true
      }

      this.onlyOneChild = null
      return false
    },
    resolvePath(routePath: string) {
      return resolveRoutePath(this.basePath, routePath)
    }
  }
})
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.menu-wrapper {
  min-width: 0;

  :deep(.sidebar-submenu.is-active > .el-sub-menu__title) {
    color: $subMenuActiveText !important;
  }

  &.full-mode {
    .sidebar-link-item {
      background-color: $subMenuBg !important;

      &:hover {
        background-color: $subMenuHover !important;
      }
    }

    :deep(.nest-menu .sidebar-submenu > .el-sub-menu__title) {
      background-color: $subMenuBg !important;

      &:hover {
        background-color: $subMenuHover !important;
      }
    }
  }

  &.simple-mode.first-level {
    .submenu-title-noDropdown {
      padding-left: 10px !important;
      position: relative;

      :deep(.el-tooltip) {
        padding: 0 10px !important;
      }
    }

    :deep(.sidebar-submenu) {
      overflow: hidden;
    }

    :deep(.sidebar-submenu > .el-sub-menu__title) {
      padding-left: 10px !important;
    }

    :deep(.sidebar-submenu > .el-sub-menu__title .el-sub-menu__icon-arrow) {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  margin-right: 16px;
}
</style>
