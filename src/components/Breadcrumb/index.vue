<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="item.path"
      >
        <span
          v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { RouteLocationMatched, RouteRecordRedirectOption } from 'vue-router'
import pathToRegexp from 'path-to-regexp'

type BreadcrumbRoute = RouteLocationMatched | {
  path: string;
  meta: {
    title: string;
    breadcrumb?: boolean;
  };
  redirect?: RouteRecordRedirectOption;
}

export default defineComponent({
  name: 'AppBreadcrumb',
  data() {
    return {
      breadcrumbs: [] as BreadcrumbRoute[]
    }
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{
          path: '/dashboard',
          meta: { title: 'hycom3.0' }
        } as BreadcrumbRoute].concat(matched)
      }
      this.breadcrumbs = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    pathCompile(path: string) {
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item: BreadcrumbRoute) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
})
</script>

<style lang="scss" scoped>
  .app-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
