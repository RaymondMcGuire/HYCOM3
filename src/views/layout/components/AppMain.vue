<template>
  <section
    class="app-main"
    :class="{'fullscreen-page': isFullscreenRoute}"
  >
    <router-view />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppMain extends Vue {
  get isFullscreenRoute() {
    // 根据路由名称或路径来判断是否是全屏页面
    return this.$route.name === 'Dashboard' || this.$route.path === '/dashboard'
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 50px); // 假设顶部导航栏高度为50px，请根据实际情况调整
  width: 100%;
  overflow-y: auto;
  background: linear-gradient(to bottom, #e6f7ff, #ffffff);
  padding: 20px;
  box-sizing: border-box;

  &.fullscreen-page {
    padding: 0;
  }

  // 覆盖 Element UI 的默认样式
  ::v-deep .el-card {
    background: transparent;
    border: none;
    box-shadow: none;

    .el-card__body {
      padding: 0;
    }
  }
}
</style>
